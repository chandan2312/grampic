require("dotenv").config();
const axios = require("axios");

async function fetchUserData(username, userid) {
	const response = await fetch(
		`${process.env.DOMAIN}/api/site1/sim?username=${username}&userid=${userid}`
	);
	const data = await response.json();
	return data;
}

async function fetchAndProcess(mainArray, entries, depth = 2) {
	if (depth === 0 || entries.length === 0) {
		return;
	}

	const nextUsernames = [];

	console.log(`entries length = ${entries.length}`);

	for (let i = 0; i < entries.length; i++) {
		const single = entries[i];
		const data = await fetchUserData(single.username, single.userid);

		console.log(`data length = ${data.length}`);

		for (let j = 0; j < data.length; j++) {
			const item = data[j];

			if (!mainArray.includes(item.username)) {
				console.log(`${mainArray.length} - ${item.username}`);
				const dbrequest = await addDB(item.username);
				mainArray.push(item.username);
			} else {
				console.log(mainArray.length);
				console.log(`1️⃣  ${item.username} duplicate in main array`);
			}
		}

		const limit = 5000;

		if (loggedArray.length > limit) {
			console.log("main array limit reached ✅");
			console.log(loggedArray[limit]);

			const notifier = await axios.post(
				`${process.env.DOMAIN}/api/notification/telegram`,

				{
					body: {
						message: `${limit} users added to db TOP from total ${mainArray?.length} users`,
					},
				}
			);
			console.log(notifier.data);
			return;
		}

		nextUsernames.push(...data);
	}

	console.log("first Loop Ended ✅");

	console.log(mainArray.length);

	console.log("Starting Next Loop ✅");
	console.log(nextUsernames);

	await fetchAndProcess(mainArray, nextUsernames, depth - 1);
}

//logged users list
const loggedArray = [];

async function addDB(username) {
	console.log(`username - ${username}`);
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
			console.log(`🗑️   ${username} deleted from db PROFILE`);
		}

		const topCheckReq = await fetch(
			`${process.env.DOMAIN}/api/top/get?user=${username}`
		);
		const topCheck = await topCheckReq.json();

		if (topCheck) {
			console.log(`1️⃣   ${username} already exists in db TOP    `);
		} else {
			const addReq = await fetch(
				`${process.env.DOMAIN}/api/top/add?user=${username}`,
				{
					method: "POST",
				}
			);

			const add = await addReq.json();
			console.log(`✅  ${username} added to db TOP`);
			//here
			loggedArray.push(username);
			console.log(`Logged Users Count - ${loggedArray.length}`);
		}
	} else {
		console.log(`❌  no username found  in post     `);

		return "DB Operation Failed ";
	}
}

async function POST() {
	const notifier = await axios.post(
		`${process.env.DOMAIN}/api/notification/telegram`,

		{
			body: {
				message: `Grampic - similar users db script started`,
			},
		}
	);
	console.log(notifier.data);
	try {
		const mainArray = [];
		const mainUserName = "maria_iliukhina";
		const mainUserId = "4607990924";

		const data = await fetchUserData(mainUserName, mainUserId);

		console.log(`main data length = ${data.length}`);

		for (const single of data) {
			if (!mainArray.includes(single.username)) {
				const dbrequest = await addDB(single.username);
				mainArray.push(single.username);

				console.log(mainArray.length);
			}
		}

		console.log("main array");

		console.log(mainArray.length);

		await fetchAndProcess(mainArray, data);

		console.log("All Urls Fetched ✅");
		console.log(mainArray.length);

		// At this point, mainArray contains the unique data
	} catch (error) {
		console.error("Error:", error);
	}
}

POST();
