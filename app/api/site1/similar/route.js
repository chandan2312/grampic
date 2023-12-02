import { NextResponse } from "next/server";
import cheerio from "cheerio";
import prisma from "@/utils/db";

export async function GET(req) {
	const user = req.nextUrl.searchParams.get("user");
	console.log(user);
	// const userId = req.nextUrl.searchParams.get("userId");
	try {
		// const fetcher = await fetch(
		// 	`https://www-picnob-com.translate.goog/api/similar?userid=${userId}7&username=${user}&_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp`
		// );

		// const body = await fetcher.text();
		// const $ = cheerio.load(body);

		// const rawJson = $("body").clone().find("script").remove().end().text() || "";

		// const raw = JSON.parse(rawJson);
		// https://www.instagram.com/api/v1/feed/user/1431724849/?count=12&max_id=3248238654313212752_1431724849

		const fetcher = await fetch(
			`https://www.instagram.com/api/v1/users/web_profile_info/?username=${user}`,
			{
				cache: "no-store",
				headers: {
					accept: "*/*",
					"accept-language": "en-US,en;q=0.9",
					"content-type": "application/x-www-form-urlencoded",
					"sec-fetch-dest": "empty",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "same-origin",
					"sec-gpc": "1",
					"x-ig-app-id": "936619743392459",
					// "x-ig-www-claim": "hmac.AR1_e0TdMoRli5TOIKZmFba601-QvxLnSmfYJgtP2YEbK_Qs",
					"x-instagram-ajax": "a5bea6ae5e5d",
					"x-requested-with": "XMLHttpRequest",
					cookie: "ig_did=3DA0C0CC-55B3-4866-BEF9-E5E8CF329A87",
				},
			}
		);
		const body = await fetcher.json();
		console.log(body);

		const rawData = body.data.user.edge_related_profiles.edges;
		const data = rawData.map((el, index) => el.node.username);

		console.log(data);
		return NextResponse.json(data, { status: 200, message: "success" });
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(error.message, {
			status: 500,
			message: "failed",
		});
	}
}
