import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";
import GoogleAnalytics from "@/components/other/GoogleAnalytics";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "GramPic - Instagram Photo & Video Downloader",
	description:
		"Download Instagram Photos & Videos in HD Quality. View Instagram Profile Picture in Full Size. Simple, Fast & Free.",
	verification: {
		google: "google",
		yandex: "yandex",
		yahoo: "yahoo",
	},
	other: { "p:domain_verify": "d443ed03a59e671fd72aab0392f46b18" },
	openGraph: {
		title: "GramPic - Instagram Photo & Video Downloader",
		description:
			"Download Instagram Photos & Videos in HD Quality. View Instagram Profile Picture in Full Size. Simple, Fast & Free.",
		url: `${process.env.DOMAIN}`,
		locale: "en_US",
		type: "website",
		site_name: "GramPic",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" data-theme="mytheme" className="bg-base-200">
			<GoogleAnalytics ID="G-R0TNJDJH4V" />
			<Script
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9282274410219812"
				crossOrigin="anonymous"
				strategy="lazyOnload"
			/>

			<body className={`mx-auto max-w-[1360px] ${inter.className}`}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
