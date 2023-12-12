require("dotenv").config();
const axios = require("axios");
const { default: next } = require("next");

const mainArray = [];
const loggedArray = [];
let tempArray = [];
let nextArray = [];
const limit = 10;

const users = [
	{ id: 0, username: "" },
	{ id: 1, username: "avnizp" },
	{ id: 2, username: "mimi" },
	{ id: 3, username: "mimi" },
	{ id: 4, username: "mimi" },
	{ id: 5, username: "mimi" },
	{ id: 6, username: "mimi" },
	{ id: 7, username: "mimi" },
	{ id: 8, username: "mimi" },
	{ id: 9, username: "mimi" },
	{ id: 10, username: "mimi" },
];

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

async function fetchAndProcess(entries, depth = 1) {
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
				console.log(`1️⃣  ${item.username} duplicate in main array`);
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
	try {
		const currIndexFetch = await fetch(`${process.env.DOMAIN}/api/get/index`);
		const currIndex = await currIndexFetch.json();
		console.log(currIndex);
		notifyTelegram(
			`Grampic - START - Loop ${currIndex} from ${users.length - 1} `
		);

		const currUser = users[currIndex].username;

		const getId = await fetch(
			`${process.env.DOMAIN}/api/get/userid?user=${currUser}`
		);

		const currUserId = await getId.json();

		console.log(`${currIndex}) - ${currUserId}, Current User = ${currUser}`);

		const data = await fetchUserData(currUser, currUserId);

		console.log(`main user's related length = ${data.length}`);

		for (const single of data) {
			if (!mainArray.includes(single.username)) {
				const dbrequest = await addDB(single.username, single.userid);
				mainArray.push(single.username);

				console.log(mainArray.length);
			}
		}

		console.log("main users related  - ");

		console.log(mainArray.length);

		console.log(data);

		const loop = await fetchAndProcess(data);
		console.log(loop);

		console.log(
			`All Urls Fetched  from ${users[currIndex].id} - ${
				users[currIndex].username
			} from total ${users.length - 1} users✅`
		);

		const indexUpdateReq = await axios.put(
			`${process.env.DOMAIN}/api/update/index?value=${currIndex + 1}`
		);

		const indexUpdate = await indexUpdateReq.data;

		console.log(`Index Updated from ${currIndex} to ${indexUpdate} ✅`);
		notifyTelegram(`Grampic script ended - Next ${indexUpdate}`);

		exitScript();
	} catch (error) {
		console.error("Error:", error.message);

		notifyTelegram(`Grampic - similar users db script failed`);
		exitScript();
	} //catch block end
} //for loop end

POST();
