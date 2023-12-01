import { getServerSideSitemapIndex } from "next-sitemap";
import axios from "axios";
import prisma from "@/utils/db";

export async function GET() {
	const count = await prisma.profile.count({});
	console.log(count);
	const pageCount = Math.ceil(count / 10000);

	const pageArray = [];
	for (let i = 1; i <= pageCount; i++) {
		pageArray.push(`${process.env.DOMAIN}/profile-sitemap-${i}.xml`);
	}

	return getServerSideSitemapIndex(pageArray);
}
