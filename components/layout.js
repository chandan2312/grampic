import "@/app/globals.css";
import { Inter } from "next/font/google";
import Header from "./main/Header";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
	return (
		<>
			{/* <body
			data-theme="mytheme"
			className="bg-base-200 text-content-100 mx-auto max-w-full lg:max-w-[968px] xl:max-w-[1080px] 2xl:max-w-[1280px]"
		> */}
			<Header />
			{children}
			{/* </body> */}
		</>
	);
}
