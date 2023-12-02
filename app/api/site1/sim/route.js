import { NextResponse } from "next/server";
import cheerio from "cheerio";
import prisma from "@/utils/db";

export async function GET(req) {
	const username = req.nextUrl.searchParams.get("username");
	const userid = req.nextUrl.searchParams.get("userid");
	try {
		const fetcher = await fetch(
			`https://www-picnob-com.translate.goog/api/similar?userid=${userid}&username=${username}&_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp`
		);

		const body = await fetcher.text();
		const $ = cheerio.load(body);

		const rawJson =
			$("body").clone().find("script").remove().end().text()?.trim() || "";

		const raw = JSON.parse(rawJson);

		// console.log(raw);

		if (raw.similar.items.length == 0) {
			return NextResponse.json([], { status: 200, message: "success" });
		}

		const data = raw.similar.items.map((el, index) => ({
			username: el.username,
			userid: el.userid,
		}));

		return NextResponse.json(data, { status: 200, message: "success" });
	} catch (error) {
		console.log(error.message);
		return NextResponse.json([], {
			status: 200,
			message: "failed",
		});
	}
}
