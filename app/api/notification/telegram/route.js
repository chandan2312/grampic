import TelegramBot from "node-telegram-bot-api";
import { NextResponse } from "next/server";

export async function POST(req) {
	const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
		polling: false,
	});

	const chatId = process.env.TELEGRAM_CHAT_ID;

	try {
		const json = await req.json();
		const { message } = await json.body;

		const sendMessage = await bot.sendMessage(chatId, message);

		return NextResponse.json("Notification Sent to Telegram", {
			status: 200,
			message: "success",
		});
	} catch (error) {
		console.error("Error sending message:", error);
		return NextResponse.json(error.message, { status: 200, message: "failed" });
	}
}
