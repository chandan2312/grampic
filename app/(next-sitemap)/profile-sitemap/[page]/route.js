import { getServerSideSitemap } from "next-sitemap";
import prisma from "@/utils/db";

export async function GET(req, { params }) {
	const pg = await params.page;
	const page = parseInt(pg);
	console.log(page);

	const take = 10000;
	const skip = (page - 1) * take;
	console.log(skip, take);

	const res = await prisma.profile.findMany({
		skip,
		take,
	});

	const profilesArray = res.map((item) => {
		const each = {
			loc: `${process.env.DOMAIN}/profile/${item.user}`,
			lastmod: new Date().toISOString(),
			changefreq: "daily",
			priority: 0.7,
		};

		return each;
	});

	return getServerSideSitemap(profilesArray);
}
