require("dotenv").config();
const cheerio = require("cheerio");

async function notifyTelegram(message) {
	const notifier = await axios.post(
		`${process.env.DOMAIN}/api/notification/telegram`,
		{
			body: { message },
		}
	);
	console.log(notifier.data);
}

function exitScript() {
	console.log("Exiting script");
	process.exit(0);
}

async function POST() {
	// const excludedWords =
	// 	/(The Past|No Working|at eBay|at Amazon|at Walmart|at Ebay|at amazon|At Amazon|at Macy|At Macy)/;
	try {
		for (let i = 1; i < 500; i++) {
			const mainPage = await fetch(
				`https://wikifamouspeople-com.translate.goog/category/instagram-star/page/${i}/?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp`
			);
			const mainPageText = await mainPage.text();
			const $$ = cheerio.load(mainPageText);

			const urls = $$("div#content_box article").map((i, el) => {
				const url = $$(el).find("a").attr("href");
				return url;
			});

			// -------------- sitemap urls loop ----------------

			// -------------- main loop ----------------

			for (let j = 0; j < urls.length; j++) {
				const fetcher = await fetch(urls[j]);

				const html = await fetcher.text();
				const $ = cheerio.load(html);

				const username =
					$("blockquote.instagram-media div")
						.find("p")
						.last()
						.find("a")
						?.text()
						.replace(/.*\(@/g, "")
						.replace(/.*@/g, "")
						.replace("A post shared by @", "")
						.replace(/\).*/g, "")
						?.trim() || null;

				console.log(`P${i} U${j + 1}  -  ${username}`);

				if (username) {
					const checkReq = await fetch(
						`${process.env.DOMAIN}/api/top/get?user=${username}`
					);
					const check = await checkReq.json();
					if (check) {
						console.log(`1️⃣ - ${username} already exists in db TOP    `);
					} else {
						const addReq = await fetch(
							`${process.env.DOMAIN}/api/top/add?user=${username}`,
							{
								method: "POST",
							}
						);

						const add = await addReq.json();
						console.log(`✅ - ${username} added to db TOP`);
					}
				} else {
					console.log(`❌ - no username found  in post     `);
				}

				//fetchlist

				if (username) {
					const checkReq = await fetch(
						`${process.env.DOMAIN}/api/fetchlist/get?user=${username}`
					);
					const checkfetch = await checkReq.json();
					if (checkfetch) {
						console.log(`1️⃣ - ${username} already exists in db FETCHLIST    `);
					} else {
						const addReq = await fetch(
							`${process.env.DOMAIN}/api/fetchlist/add?user=${username}`,
							{
								method: "POST",
							}
						);

						const add = await addReq.json();
						console.log(`✅ - ${username} added to db FETCHLIST`);
					}
				}
			}
		}

		exitScript();
	} catch (error) {
		console.log(error);
		return NextResponse.json(error.message, {
			status: 500,
		});
	}
}

POST();
