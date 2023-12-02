require("dotenv").config();
const axios = require("axios");
const { default: next } = require("next");

const mainArray = [];
const loggedArray = [];
let tempArray = [];
let nextArray = [];
const limit = 5000;

async function fetchUserData(username, userid) {
	const response = await fetch(
		`${process.env.DOMAIN}/api/site1/sim?username=${username}&userid=${userid}`
	);
	const data = await response.json();
	return data;
}

async function fetchAndProcess(entries, depth = 6) {
	console.log(`DEPTH = ${depth}`);
	if (depth === 0 || entries.length === 0) {
		return;
	}

	console.log(`entries length = ${entries.length}`);

	const filtered = entries.filter((entry) => entry.username != 0);

	for (let i = 0; i < entries.length; i++) {
		const single = filtered[i];
		const data = await fetchUserData(single.username, single.userid);

		console.log(`data length = ${data.length}`);

		if (data.length == 0) {
			console.log(
				`❌  no related data found for ${single.username}  (${single.userid})   `
			);
			continue;
		}

		for (let j = 0; j < data.length; j++) {
			const item = data[j];

			if (!mainArray.includes(item.username)) {
				console.log(`${mainArray.length} - ${item.username}`);
				const dbrequest = await addDB(item.username, item.userid);
				mainArray.push(item.username);
			} else {
				console.log(mainArray.length);
				console.log(`1️⃣  ${item.username} duplicate in main array`);
			}
		}

		if (loggedArray.length > limit) {
			console.log("Logged limit reached ✅");
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
	}

	console.log(
		`Loop Ended ✅ - Status --- LoggedArray - ${loggedArray.length},   tempArray - ${tempArray.length},  mainArray - ${mainArray.length}`
	);

	console.log("Starting Next Loop ✅");

	nextArray = [...tempArray];

	console.log(`Next Array length is ${nextArray.length}`);
	console.log(nextArray);

	tempArray = [];
	console.log(`Temp Array length is ${tempArray.length}`);

	await fetchAndProcess(nextArray, depth - 1);
}

//logged users list

async function addDB(username, userid) {
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
			tempArray.push({ username, userid });
			loggedArray.push({ username, userid });
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
		// const mainArray = [];
		const mainUserName = "jocelynbinder";
		const mainUserId = "267332466";

		const data = await fetchUserData(mainUserName, mainUserId);

		console.log(`main data length = ${data.length}`);

		for (const single of data) {
			if (!mainArray.includes(single.username)) {
				const dbrequest = await addDB(single.username, single.userid);
				mainArray.push(single.username);

				console.log(mainArray.length);
			}
		}

		console.log("main array");

		console.log(mainArray.length);

		console.log(data);

		await fetchAndProcess(data);

		console.log("All Urls Fetched ✅");
		console.log(mainArray.length);

		// At this point, mainArray contains the unique data
	} catch (error) {
		console.error("Error:", error.message);
		const notifier = await axios.post(
			`${process.env.DOMAIN}/api/notification/telegram`,

			{
				body: {
					message: `Grampic - similar users db script error - ${error.message}`,
				},
			}
		);
		console.log(notifier.data);
	}
}

POST();
