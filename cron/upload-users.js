require("dotenv").config();
const csv = require("csv-parser");
const fs = require("fs");

function upload() {
	const list = [];

	//csv parsing

	fs
		.createReadStream("../data/viralpitch-400k.csv")
		.pipe(csv())
		.on("data", (data) => list.push(data))
		.on("end", async () => {
			for (let i = 0; i < list.length; i++) {
				const currUser = list[i].user;

				console.log(currUser);

				const checkReq = await fetch(
					`${process.env.DOMAIN}/api/profile/get?user=${currUser}`
				);
				const check = await checkReq.json();

				if (!check) {
					const addReq = await fetch(
						`${process.env.DOMAIN}/api/profile/add?user=${currUser}`,
						{
							method: "POST",
						}
					);

					const add = await addReq.json();
					console.log(`✅  -   ${i}  -  ${currUser} added to db}`);
				} else {
					console.log(`1️⃣  -   ${i}  -  user already exists      `);
				}
			}
		});
}

upload();
