import { NextResponse } from "next/server";
import cheerio from "cheerio";

export async function GET(req) {
	try {
		const tag = await req.nextUrl.searchParams.get("tag");
		console.log(tag);

		const res = await fetch(
			`https://www-picnob-com.translate.goog/tag/${tag}/?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp`,
			{
				next: {
					revalidate: 60 * 60 * 24 * 2, // 2 days
				},
			}
		);
		const body = await res.text();
		const $ = cheerio.load(body);

		const data = {
			tag: $("h1.tagname")?.text()?.trim().replace("Hashtag: ", "") || "",
			tagCount:
				$("div.bd div.posts_count")
					?.text()
					?.trim()
					.replace(" Posts", "")
					.replace(" Post", "") || "",
			topPosts: $("div.top div.items div.item")
				.toArray()
				.map((el, index) => {
					const single = {
						ID: index + 1,
						linkID: $(el)
							.find("div.cover_w a.cover_link")
							.attr("href")
							?.trim()
							.replace(/.*post\//, "")
							.replace(/\/\?_x.*/, ""),
						img:
							$(el)
								.find("div.preview_w img")
								.attr("data-src")
								?.replace(/.*\?v\//g, "") || "",

						likes: $(el).find("span.count_item_like span.num").text()?.trim() || 0,
						comments:
							$(el).find("span.count_item_comment span.num").text()?.trim() || 0,
						time: $(el).find("div.meta div.time span.txt").text().trim() || "",
						caption:
							$(el)
								.find("div.meta div.sum")
								?.html()
								?.replace(/https:\/\/www-picnob-com\.translate\.goog/g, "")
								?.replace(
									/\/\?_x_tr_sl=auto&amp;_x_tr_tl=en&amp;_x_tr_hl=en&amp;_x_tr_pto=wapp/g,
									""
								)
								?.replace(/href=\\"/g, 'href="')
								?.replace(/<a /g, "<a class='link2' target='_blank' ")
								?.trim() || "",
						captionText: $(el).find("div.meta div.sum").text()?.trim() || "",
						isMultiple:
							$(el)
								?.find("div.corner span.icon_multi")
								?.attr("class")
								?.includes("multi") || false,

						isVideo:
							$(el)
								?.find("div.corner span.icon_video")
								?.attr("class")
								?.includes("video") || false,
					};
					return single;
				}),
			recentPosts: $("div.recent div.items div.item")
				.toArray()
				.map((el, index) => {
					const single = {
						ID: index + 1,
						linkID: $(el)
							.find("div.cover_w a.cover_link")
							.attr("href")
							?.trim()
							.replace(/.*post\//, "")
							.replace(/\/\?_x.*/, ""),
						img:
							$(el)
								.find("div.preview_w img")
								.attr("data-src")
								?.replace(/.*\?v\//g, "") || "",

						likes: $(el).find("span.count_item_like span.num").text()?.trim() || 0,
						comments:
							$(el).find("span.count_item_comment span.num").text()?.trim() || 0,
						time: $(el).find("div.meta div.time span.txt").text().trim() || "",
						caption:
							$(el)
								.find("div.meta div.sum")
								?.html()
								?.replace(/https:\/\/www-picnob-com\.translate\.goog/g, "")
								?.replace(
									/\/\?_x_tr_sl=auto&amp;_x_tr_tl=en&amp;_x_tr_hl=en&amp;_x_tr_pto=wapp/g,
									""
								)
								?.replace(/href=\\"/g, 'href="')
								?.replace(/<a /g, "<a class='link2' target='_blank' ")
								?.trim() || "",
						captionText: $(el).find("div.meta div.sum").text()?.trim() || "",
						isMultiple:
							$(el)
								?.find("div.corner span.icon_multi")
								?.attr("class")
								?.includes("multi") || false,

						isVideo:
							$(el)
								?.find("div.corner span.icon_video")
								?.attr("class")
								?.includes("video") || false,
					};
					return single;
				}),
		};

		console.log(data);

		return NextResponse.json(data, { status: 200, message: "success" });
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(error.message, { status: 500 });
	}
}
