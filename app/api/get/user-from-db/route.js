import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
	const user = req.nextUrl.searchParams.get("user");
	console.log(user);

	try {
		const result = await prisma.profile.findUnique({
			where: {
				user,
			},
		});

		console.log(result);

		return NextResponse.json(result, { status: 200, message: "success" });
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(error.message, {
			status: 500,
			message: "Error",
		});
	}
}
