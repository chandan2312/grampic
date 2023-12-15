require("dotenv").config();
const axios = require("axios");

const mainArray = [];
let superLoggedArray = [];
let loggedArray = [];
let tempArray = [];
let nextArray = [];
const limit = 1000;

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

async function fetchUserData(username, userid) {
	const response = await fetch(
		`${process.env.DOMAIN}/api/site1/sim?username=${username}&userid=${userid}`
	);
	const data = await response.json();
	return data;
}

async function fetchAndProcess(entries, depth = 50) {
	console.log(`DEPTH = ${depth}`);
	if (depth === 0 || entries.length === 0) {
		return;
	}

	if (loggedArray.length > limit) {
		console.log(`Logged Array Length - ${loggedArray.length}`);
		console.log("Logged limit reached ✅");
		return "Loop Ends";
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

			if (loggedArray.length > limit) {
				console.log("Logged limit reached ✅");
				return "Loop Ends";
			}

			if (!mainArray.includes(item.username)) {
				console.log(`${mainArray.length} - ${item.username}`);
				const dbrequest = await addDB(item.username, item.userid);
				mainArray.push(item.username);
			} else {
				console.log(`1️⃣ mainArray Duplicate`);
			}
		}

		if (loggedArray.length > limit) {
			console.log(`Logged Array Length - ${loggedArray.length}`);
			console.log("Logged limit reached ✅");
			return "Loop Ends";
		}
	}

	if (loggedArray.length > limit) {
		console.log(`Logged Array Length - ${loggedArray.length}`);
		console.log("Logged limit reached ✅");

		return "Loop Ends";
	}

	console.log(
		`Loop Ended ✅ - Status --- LoggedArray - ${loggedArray.length},   tempArray - ${tempArray.length},  mainArray - ${mainArray.length}`
	);

	console.log("Starting Next Loop ✅");

	if (tempArray.length == 0) {
		console.log("Next Array is empty");
		return "Next Array is empty";
	}
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
	try {
		notifyTelegram(`Grampic - Script START - `);

		const getAllRes = await axios.get(
			`${process.env.DOMAIN}/api/fetchlist/get-all`
		);
		const all = getAllRes.data;
		console.log(all.length);
		for (let i = 10; i < all.length; i++) {
			const currUser = all[i].user;

			const getId = await fetch(
				`${process.env.DOMAIN}/api/get/userid?user=${currUser}`
			);

			const currUserId = await getId.json();

			console.log(` ${currUserId}, Current User = ${currUser}`);

			const data = await fetchUserData(currUser, currUserId);

			console.log(`main user's related length = ${data.length}`);

			if (data.length == 0) {
				console.log(`❌  no related for mainuser ${currUser} `);
				continue;
			}

			for (const single of data) {
				if (!mainArray.includes(single.username)) {
					await addDB(single.username, single.userid);
					mainArray.push(single.username);
					console.log(mainArray.length);
				}
			}

			console.log(`main users related  - ${mainArray.length}`);
			console.log(data);

			const loop = await fetchAndProcess(data);
			console.log(loop);

			superLoggedArray.push(...loggedArray);
			loggedArray = [];

			const deleteCurrentUserRes = await fetch(
				`${process.env.DOMAIN}/api/fetchlist/delete?user=${currUser}`,
				{
					method: "DELETE",
				}
			);

			const deleteCurrentUser = await deleteCurrentUserRes.json();
			console.log(`🗑️   ${currUser} deleted from db FETCHLIST`);
			console.log(deleteCurrentUser);

			if (superLoggedArray.length > 50000) {
				console.log("Super Logged Array Limit Reached");
				console.log(superLoggedArray.length);

				notifyTelegram(`Grampic - Stopped - superLimit Reached`);
				exitScript();
				return;
			}
		}
	} catch (error) {
		console.error("Error:", error.message);

		notifyTelegram(`Grampic - similar users db script failed`);
		exitScript();
	} //catch block end
} //for loop end

POST();
