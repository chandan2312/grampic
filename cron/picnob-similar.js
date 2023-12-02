require("dotenv").config();
const cheerio = require("cheerio");
const { NextResponse } = require("next/server");

async function POST() {
	try {
		const mainArray = [];
		const mainUser = "chhahima___";

		// ------------------- first fetch ------------------- //
		const fetcher = await fetch(
			`${process.env.DOMAIN}/api/site1/similar?username=${mainUser}`
		);
		const data = await fetcher.json();
		console.log(data);
		mainArray.push(...data);

		// ------------------- loop fetch ------------------- //
		for (let i = 0; i < data.posts.length; i++) {
			const fetcher = await fetch(
				`${process.env.DOMAIN}/api/site1/similar?username=${data.posts[i].username}`
			);
			const data2 = await fetcher.json();
			console.log(data2);
			mainArray.push(...data2);

			for (let j = 0; j < data2.posts.length; j++) {
				const fetcher = await fetch(
					`${process.env.DOMAIN}/api/site1/similar?username=${data2.posts[j].username}`
				);
				const data3 = await fetcher.json();
				console.log(data3);
				mainArray.push(...data3);
			}
		}
	} catch (error) {}
}
