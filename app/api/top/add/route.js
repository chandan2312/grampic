import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
	const user = req.nextUrl.searchParams.get("user");

	try {
		const result = await prisma.top.create({
			data: {
				user,
			},
		});

		return NextResponse.json("User Added To DB     ✅", {
			status: 200,
			message: "success",
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(error.message, {
			status: 500,
			message: "Error",
		});
	}
}
