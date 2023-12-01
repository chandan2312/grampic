"use client";

import { BreadcrumbJsonLd, NextSeo } from "next-seo";
import Top100 from "../components/ui/top-list";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgSearch } from "react-icons/cg";

export default function Home() {
	const [input, setInput] = useState("");

	const router = useRouter();

	const submitHandler = (e) => {
		e.preventDefault();
		router.push(`/search/${input}`);
	};

	return (
		<main className="">
			{/* --------------------------------------------- SEO  ----------------------------------------------- */}
			{/* <NextSeo
				title={`GramPic - Instagram Annonymous Profile Viewer & Downloader`}
				description={`View & Download any public Instgram Profile, Photos, Stories, Videos anonymously`}
				canonical={`https://grampic.com`}
				openGraph={{
					url: `https://grampic.com`,
					title: `GramPic - Instagram Annonymous Profile Viewer & Downloader`,
					description: `View & Download any public Instgram Profile, Photos, Stories, Videos anonymously.`,
					type: "website",
					locale: "en_US",

					siteName: "GramPic",
				}}
			/>
			<BreadcrumbJsonLd
				itemListElements={[
					{
						position: 1,
						name: "Home",
						item: "/",
					},
				]}
			/> */}

			{/* --------------------------------  SEO  ----------------------------------------------- */}
			<section className="mx-auto my-6">
				<h1 className="text-center text-primary/70 text-3xl lg:text-4xl font-bold mx-auto my-6">
					Instagram Web Viewer
				</h1>
				<p className=" px-4 py-2 text-center">
					View & Download any{" "}
					<strong className="font-semibold text-secondaryDark">
						public Instagram Profile
					</strong>{" "}
					annonymously, without need of logging in
				</p>
			</section>
			<section
				id="search"
				className=" flex justify-center items-center min-h-[30%]"
			>
				<form onSubmit={submitHandler} action="" className=" ">
					<div className="flex justify-center gap-4">
						<input
							onChange={(e) => setInput(e.target.value)}
							type="text"
							name="query"
							id="query"
							placeholder="username"
							className="col-span-10 flex-grow bg-base-200/70 text-content-200 border-2 w-full p-2 rounded-md shadow-md"
						/>
						<button
							type="submit"
							className="col-span-2 bg-primary px-4 text-white hover:bg-secondary rounded-md shadow-md"
						>
							<CgSearch className="inline text-2xl font-bold " />
						</button>
					</div>
					<div className="flex-grow pt-[6px] text-xs">
						e.g -{" "}
						<Link className="link1 font-semibold" href={`/profile/lalalalisa_m`}>
							lalalalisa_m
						</Link>{" "}
					</div>
				</form>
			</section>

			<Top100 />
		</main>
	);
}
