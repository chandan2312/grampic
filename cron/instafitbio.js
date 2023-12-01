require("dotenv").config();
const cheerio = require("cheerio");
const { NextResponse } = require("next/server");

async function POST() {
	// const excludedWords =
	// 	/(The Past|No Working|at eBay|at Amazon|at Walmart|at Ebay|at amazon|At Amazon|at Macy|At Macy)/;
	try {
		const mainSitemapRes = await fetch("https://instafitbio.com/sitemap.xml");
		const mainSitemap = await mainSitemapRes.text();
		const $$ = cheerio.load(mainSitemap, { xmlMode: true });

		const sitemapUrls = $$("sitemap")
			.toArray()
			.map((el) => {
				const url = $$(el).find("loc:contains('post')").text();
				if (url) {
					return url;
				}
			});

		console.log(sitemapUrls);

		// -------------- sitemap urls loop ----------------

		for (let i = 0; i < sitemapUrls.length; i++) {
			const sitemapRes = await fetch(sitemapUrls[i]);
			const sitemap = await sitemapRes.text();
			const $ = cheerio.load(sitemap, { xmlMode: true });

			const urls = $("urlset url")
				.toArray()
				.map((el) => {
					const url = `${$(el)
						.find("loc")
						.text()
						?.trim()
						.replace(
							"instafitbio.com",
							"instafitbio-com.translate.goog"
						)}?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp`;
					return url;
				});

			// -------------- main loop ----------------

			for (let j = 0; j < urls.length; j++) {
				const fetcher = await fetch(urls[j]);

				const html = await fetcher.text();
				const $ = cheerio.load(html);

				const username =
					$("h3:contains('Instagram'):contains('@')")
						?.text()
						?.trim()
						?.replace(/.*\@/, "") || null;

				console.log(`${j}  -  ${username}`);

				if (username) {
					const checkReq = await fetch(
						`${process.env.DOMAIN}/api/profile/get?user=${username}`
					);
					const check = await checkReq.json();

					if (check) {
						const deleteReq = await fetch(
							`${process.env.DOMAIN}/api/profile/delete?user=${username}`,
							{
								method: "DELETE",
							}
						);
						const deleted = await deleteReq.json();
						console.log(`🗑️  -   ${i}  -  ${username} deleted from db PROFILE`);
					}

					const topCheckReq = await fetch(
						`${process.env.DOMAIN}/api/top/get?user=${username}`
					);
					const topCheck = await topCheckReq.json();

					if (topCheck) {
						console.log(`1️⃣  -   ${i}  -  ${username} already exists in db TOP    `);
					} else {
						const addReq = await fetch(
							`${process.env.DOMAIN}/api/top/add?user=${username}`,
							{
								method: "POST",
							}
						);

						const add = await addReq.json();
						console.log(`✅  -   ${i}  -  ${username} added to db TOP}`);
					}
				} else {
					console.log(`❌  -   ${i}  -  no username found  in post     `);
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
