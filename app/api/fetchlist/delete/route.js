import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req) {
	const user = req.nextUrl.searchParams.get("user");

	try {
		const result = await prisma.fetchlist.delete({
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
