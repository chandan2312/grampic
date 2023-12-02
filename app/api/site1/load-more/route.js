import { NextResponse } from "next/server";
import cheerio from "cheerio";

export async function GET(req) {
	try {
		const maxId = req.nextUrl.searchParams.get("maxId");
		const userId = req.nextUrl.searchParams.get("userId");

		console.log(maxId, userId);

		const fetcher = await fetch(
			`https://www-picnob-com.translate.goog/api/posts?userid=${userId}&next&maxid=${maxId}&hl&_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp`
		);

		const body = await fetcher.text();
		const $ = cheerio.load(body);

		const rawJson = $("body").clone().find("script").remove().end().text() || "";

		const raw = JSON.parse(rawJson);

		const data = {
			userId: raw.profile.userid,
			username: raw.profile.username,
			has_next: raw.posts.has_next,
			maxId: raw.posts.maxid,

			posts: raw.posts.items.map((el, index) => {
				const single = {
					ID: index + 1,
					linkID: el.shortcode,
					img: `${el.pic_p?.replace(/.*\?v\//g, "")}`,
					imgDownload: el.down_pic,
					likes: el.count_like_pure,
					comments: el.count_comment_pure,
					time: el.ftime,
					caption: el.sum,
					captionText: el.sum_pure,
					isMultiple: el.type == "img_multi" || el.type == "video_multi" || false,
					isVideo: el.is_video,
				};

				return single;
			}),
		};

		return NextResponse.json(data, { status: 200, message: "success" });
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(error.message, { status: 500 });
	}
}
