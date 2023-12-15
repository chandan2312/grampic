import axios from "axios";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
	const all = await prisma.fetchlist.findMany();
	console.log(all);

	return NextResponse.json(all, {
		status: 200,
		message: "success",
	});
}
