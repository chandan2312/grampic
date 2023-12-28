import { NextResponse } from "next/server";
import cheerio from "cheerio";

export async function GET(req) {
	const user = await req.nextUrl.searchParams.get("user");
	console.log(user);
	try {
		const res = await fetch(
			`https://www-picnob-com.translate.goog/profile/${user}/tagged/?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp`,
			{
				next: {
					revalidate: 60 * 60 * 24 * 7, // 7 days
				},
			}
		);
		const body = await res.text();
		const $ = cheerio.load(body);

		const data = {
			username: $("div.username h2").text()?.trim().replace("@", ""),
			name: $("div.info h1.fullname").text()?.trim() || "",
			bio:
				$("div.info div.sum")
					?.html()
					?.replace(/https:\/\/www-picnob-com\.translate\.goog/g, "")
					?.replace(
						/\/\?_x_tr_sl=auto&amp;_x_tr_tl=en&amp;_x_tr_hl=en&amp;_x_tr_pto=wapp/g,
						""
					)
					?.replace(/href=\\"/g, 'href="')
					?.replace(/<a /g, "<a class='link2' target='_blank' ")
					?.trim() || "",
			avatar: $("div.ava div.pic a img")
				.attr("src")
				?.replace(/.*\?v\//, "")
				?.replace(/.*\?v\\/, ""),
			avatarDownload: $("div.ava_down a.downbtn")
				.attr("href")
				.replace(/.*webapp\&u\=/, "")
				.replace(/%3D/g, "=")
				.replace(/%26/g, "&")
				.replace(/%25/g, "%"),
			isVerified: $("span.verified")?.attr("class")?.includes("verified") || false,
			isPrivate:
				$("div.notice div.txt").text()?.trim() ==
					"This account is a private account" || false,
			postCount: $("div.count div.item_posts div.num").text()?.trim(),
			followers: $("div.count div.item_followers div.num").text()?.trim() || 0,
			following: $("div.count div.item_following div.num").text()?.trim() || 0,
			followersCount:
				$("div.count div.item_followers div.num").attr("title")?.trim() || 0,
			posts: $("div.tagged div.items div.item")
				.toArray()
				.map((el, index) => {
					const single = {
						ID: index + 1,
						user: $(el)
							.find("div.meta")
							.find("div.username a")
							.text()
							?.trim()
							?.replace("@", ""),
						linkID: $(el)
							.find("div.cover_w a.cover_link")
							.attr("href")
							?.trim()
							?.replace(/.*post\//, "")
							?.replace(/\/\?_x.*/, ""),
						img:
							$(el)
								.find("div.preview_w img")
								.attr("data-src")
								?.replace(/.*\?v\//g, "/v/") || "",
						imgDomain: $(el)
							.find("div.down a.downbtn")
							.attr("href")
							.replace(/.*webapp\&u\=/, "")
							.replace(/\.com.*/, ".com")
							.replace(/-/g, "--")
							.replace(/\./g, "-")
							.replace("com", "com.translate.goog"),
						imgDownload:
							$(el)
								.find("div.down a.downbtn")
								.attr("href")
								.replace(/.*\.com\/v\//, "/v/")
								.replace(/%3D/g, "=")
								.replace(/%26/g, "&")
								.replace(/%25/g, "%")
								.replace("&dl=1", "") || "",
						likes: $(el).find("span.count_item_like span.num").text()?.trim() || 0,
						comments:
							$(el).find("span.count_item_comment span.num").text()?.trim() || 0,
						time: $(el).find("div.meta div.time div.txt").text().trim() || "",
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
		return NextResponse.json(data, {
			status: 200,
			message: `tagged data fetched`,
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(error.message, {
			status: 500,
			message: error.message,
		});
	}
}
