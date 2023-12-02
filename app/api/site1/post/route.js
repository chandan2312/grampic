import { NextResponse } from "next/server";
import cheerio from "cheerio";

export async function GET(req) {
	const id = await req.nextUrl.searchParams.get("id");

	try {
		const res = await fetch(
			`https://www-picnob-com.translate.goog/post/${id}/?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp`
		);
		const body = await res.text();
		const $ = cheerio.load(body);

		const data = {
			username: $("div.username h2").text()?.trim()?.replace("@", ""),
			name: $("h1.fullname").text()?.trim() || "",
			avatar: $("div.ava img")
				.attr("src")
				?.replace(/.*\?v\//g, "")
				?.replace(/.*\?v\\/g, ""),
			caption:
				$("div.meta div.sum_full")
					?.html()
					?.replace(/https:\/\/www-picnob-com\.translate\.goog/g, "")
					?.replace(
						/\/\?_x_tr_sl=auto&amp;_x_tr_tl=en&amp;_x_tr_hl=en&amp;_x_tr_pto=wapp/g,
						""
					)
					?.replace(/href=\\"/g, 'href="')
					?.replace(/<a /g, "<a class='link2' target='_blank' ") || "",
			captionText: $("div.meta div.sum_full").text()?.trim() || "",
			likes: $("div.count_item_like span.num").text()?.trim(),
			totalComments: $("div.count_item_comment span.num").text()?.trim(),
			time: $("div.time span.txt").text()?.trim(),
			media: [],
			comments: $("div.comments div.comment")
				.toArray()
				.map((el, index) => {
					const single = {
						ID: index + 1,
						username: $(el).find("div.username a").text()?.trim().replace("@", ""),
						text: $(el).find("div.txt div.sum").text()?.trim(),
						time: $(el).find("div.txt div.data").text()?.trim(),
						avatar: $(el)
							.find("div.ava a img")
							.attr("data-src")
							?.replace(/.*\/v\//, "")
							?.replace(/.*\?v\//, ""),
					};

					return single;
				}),
			similar: [],
		};

		// gallery push

		if ($("div.swiper-wrapper")?.attr("class")?.includes("swiper")) {
			const gallery = $("div.swiper-wrapper div.swiper-slide")
				.toArray()
				.map((el, index) => {
					const single = {
						ID: index + 1,
						img:
							$(el)
								.find("div.pic a img")
								.attr("data-src")
								?.replace(/.*\?v\//g, "") ||
							$(el)
								.find("div.view_w div.video_img")
								.find("img")
								.attr("data-src")
								?.replace(/.*\?v\//g, ""),
						download: $(`div.down_list div.down_item:eq(${index}) a.downbtn`)
							.attr("href")
							?.replace(/.*webapp\&u\=/, "")
							?.replace(/%3D/g, "=")
							?.replace(/%26/g, "&")
							?.replace(/%25/g, "%"),
						isVideo:
							$(el)
								.find("div.view_w div.video_img")
								?.attr("class")
								?.includes("video") || false,
					};
					return single;
				});

			data.media.push(...gallery);
		} else {
			//single push
			const single = {
				ID: 1,
				img:
					$("div.view_w div.pic a img")
						.attr("data-src")
						?.replace(/.*\?v\//g, "") ||
					$("div.view_w div.video_img")
						.find("img")
						.attr("data-src")
						?.replace(/.*\?v\//g, ""),
				download: $("div.down a.downbtn")
					.attr("href")
					?.replace(/.*webapp\&u\=/, "")
					?.replace(/%3D/g, "=")
					?.replace(/%26/g, "&")
					?.replace(/%25/g, "%"),
				isVideo:
					$("div.view_w div.video_img").attr("class")?.includes("video") || false,
			};
			data.media.push(single);
		}

		console.log(data);

		return NextResponse.json(data, {
			status: 200,
			message: `post data fetched`,
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.error(error.message);
	}
}
