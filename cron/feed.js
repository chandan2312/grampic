const fs = require("fs");
const RSS = require("rss");
const cheerio = require("cheerio");
require("dotenv").config();

async function main() {
	const mainUrl = "https://grampic.com/sitemap/top.xml";

	const fetcher = await fetch(mainUrl);
	const xml = await fetcher.text();
	const $ = cheerio.load(xml, { xmlMode: true });
	const subSitemaps = $("sitemapindex sitemap")
		.map((i, el) => $(el).find("loc").text())
		.get();

	// Function to create directory (if it doesn't exist)
	

	async function processBatch(users, i) {
		const rssFilePath = `../public/feed/xfeed-${i}.xml`;
		if (fs.existsSync(rssFilePath)) {
			console.log(`RSS feed ${rssFilePath} already exists. Skipping.`);
			return;
		} else {
			console.log(`No Such Feed`);
		}

		const feed = new RSS({
			title: `xfeed ${i}`,
			description: `Grampic RSS Feed ${i}`,
			feed_url: `https://grampic.com/xfeed-${i}.xml`,
			site_url: "http://grampic.com",
		});

		for (let i = 1; i < 20; i++) {
			const username = users[i];

			console.log(`${i} - ${username}`);

			try {
				const fetcher = await fetch(
					`${process.env.DOMAIN}/api/site1/user?user=${username}`
				);
				const data = await fetcher.json();

				data.posts.forEach((post, index) => {
					const single = feed.item({
						title: `${data.postCount}+ Photos & Videos Of ${data.name} (${
							data.username
						}) - ${index + 1}. View ${data.name} Instagram Profile & Update`,
						description: `${data.name} (${data.username}) Instagram Update - ${post.captionText}`,
						url: `https://grampic.com/profile/${data.username}`,
						custom_elements: [
							{
								"content:encoded": `<img src="https://scontent--atl3--1-cdninstagram-com.translate.goog/v/${
									post.img
								}" alt="${
									post.captionText
										? `${data.name} (${data.username}) Instagram Post - ${post.captionText}`
										: `${data.name} (${data.username}) Instagram Post ${index + 1}`
								}"/>`,
							},
						],
					});
					feed.item(single);
				});
			} catch (error) {
				console.error(`Error processing user - ${username}: ${error.message}`);
				continue;
			}
		}

		// Write the RSS feed only if it doesn't already exist
		fs.writeFileSync(rssFilePath, feed.xml({ indent: true }));
		console.log(`RSS feed ${rssFilePath} created successfully.`);
	}

	async function processAllBatches() {
		let i = 1;

		for (const subSitemap of subSitemaps) {
			const fetcher = await fetch(subSitemap);
			const xml = await fetcher.text();
			const $ = cheerio.load(xml, { xmlMode: true });
			const users = $("url")
				.map(
					(index, el) =>
						`${$(el).find("loc").text().replace("https://grampic.com/profile/", "")}`
				)
				.get();

			await processBatch(users, i);
			i++;
		}
	}

	processAllBatches();
}

main();
