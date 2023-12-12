import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		const result = await prisma.index.findUnique({
			where: {
				id: 1,
			},
		});

		const index = await result.value;

		return NextResponse.json(index, { status: 200, message: "success" });
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(error.message, {
			status: 500,
			message: "Error",
		});
	}
}
