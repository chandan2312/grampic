import { NextResponse } from "next/server";
import cheerio from "cheerio";
import prisma from "@/utils/db";

export async function GET(req) {
	const user = await req.nextUrl.searchParams.get("user");
	try {
		const res = await fetch(
			`https://www-picnob-com.translate.goog/profile/${user}/?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp`,
			{
				next: {
					revalidate: 60 * 60 * 24 * 365, // 2 days
				},
			}
		);
		const body = await res.text();
		const $ = cheerio.load(body);

		const userId = $("input[name='userid']")?.attr("value");
		console.log(userId);

		return NextResponse.json(userId, { status: 200, message: "success" });
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(error.message, {
			status: 500,
			message: "Error",
		});
	}
}
