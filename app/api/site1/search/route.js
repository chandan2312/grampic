import { NextResponse } from "next/server";
import cheerio from "cheerio";

export async function GET(req) {
	try {
		const term = await req.nextUrl.searchParams.get("term");
		console.log(term);

		const res = await fetch(
			`https://www-picnob-com.translate.goog/search/?q=${term}&_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp`,
			{
				next: {
					revalidate: 60 * 60 * 24 * 2, // 2 days
				},
			}
		);
		const body = await res.text();
		const $ = cheerio.load(body);

		const data = {
			term: $("div.count h1")?.text()?.trim().replace(" search results", "") || "",
			list: $("div.users div.items_normal div.item")
				.toArray()
				.map((el, index) => {
					const single = {
						ID: index + 1,
						username:
							$(el).find("div.username span.name").text()?.trim().replace("@", "") ||
							"",
						name: $(el).find("div.fullname").text()?.trim().replace("@", "") || "",
						avatar:
							$(el)
								.find("div.ava img")
								.attr("data-src")
								?.replace(/.*\?v\//g, "") || "",
					};

					return single;
				}),
		};

		// console.log(data);

		return NextResponse.json(data, { status: 200, message: "success" });
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(error.message, { status: 500 });
	}
}
