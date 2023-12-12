import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
	const valueString = req.nextUrl.searchParams.get("value");
	const value = parseInt(valueString);

	try {
		const update = await prisma.index.update({
			where: {
				id: 1,
			},
			data: {
				value,
			},
		});

		const result = await update.value;
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
