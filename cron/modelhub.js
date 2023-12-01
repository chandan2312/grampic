require("dotenv").config();
const cheerio = require("cheerio");
const { NextResponse } = require("next/server");

async function POST() {
	// const excludedWords =
	// 	/(The Past|No Working|at eBay|at Amazon|at Walmart|at Ebay|at amazon|At Amazon|at Macy|At Macy)/;
	try {
		const sitemapUrls = [
			"https://www.modelhub.com/sitemap_models1.xml",
			"https://www.modelhub.com/sitemap_models2.xml",
			"https://www.modelhub.com/sitemap_models3.xml",
			"https://www.modelhub.com/sitemap_models4.xml",
		];

		// -------------- sitemap urls loop ----------------

		for (let i = 0; i < sitemapUrls.length; i++) {
			const sitemapRes = await fetch(sitemapUrls[i]);
			const sitemap = await sitemapRes.text();
			const $ = cheerio.load(sitemap, { xmlMode: true });

			const urls = $("urlset url")
				.toArray()
				.map((el) => {
					const url = $(el).find("loc").text()?.trim();

					return url;
				});

			// -------------- main loop ----------------

			for (let j = 0; j < urls.length; j++) {
				const fetcher = await fetch(urls[j]);

				const html = await fetcher.text();
				const $ = cheerio.load(html);

				const username =
					$('ul.socMedia li:has(a[href*="instagram"]) a')
						.attr("href")
						?.trim()
						?.replace(/.*\.com\//, "")
						.replace("/", "") || null;

				console.log(`${j}  -  ${username}`);

				if (username) {
					const checkReq = await fetch(
						`${process.env.DOMAIN}/api/profile/get?user=${username}`
					);
					const check = await checkReq.json();

					if (check) {
						console.log(
							`1️⃣  -   ${i}  -  ${username} already exists in db PROFILE   `
						);
					} else {
						const addReq = await fetch(
							`${process.env.DOMAIN}/api/profile/add?user=${username}`,
							{
								method: "POST",
							}
						);

						const add = await addReq.json();
						console.log(`✅  -   ${i}  -  ${username} added to db TOP}`);
					}
				}
			}
		}

		return NextResponse.json("Operation Completed", {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(error.message, {
			status: 500,
		});
	}
}

POST();
