import React from "react";
import cheerio from "cheerio";
import Link from "next/link";
import Image from "next/image";
import Searchbar from "@/components/ui/Searchbar";

const page = async ({ params }) => {
	const term = params.term;

	const res = await fetch(
		`${process.env.DOMAIN}/api/picnob/search?term=${term}`,
		{
			next: {
				revalidate: 60 * 60 * 24 * 30, // 30 days
			},
		}
	);
	const data = await res.json();
	return (
		<>
			{/* <NextSeo
				title={`Users Matched With Search - ${data.term} | GramPic`}
				description={`View Top ${data.list.length} Users Matched With Search - ${data.term} | GramPic`}
				canonical={`https://grampic.com/search/${data.term}`}
			/> */}
			<section id="search_results" className="card ">
				<Searchbar setSearchMode={true} />
				<h1 className="pt-4 font-bold text-2xl text-center my-6 mx-auto">
					Users Matching <span className="text-primary">{data.term}</span>
				</h1>
				<hr className="my-4" />
				{data.list.length != 0 && (
					<ul className="p-4 grid-cols-12">
						{data.list.map((el, index) => (
							<li
								key={index}
								className="col-span-12 md:col-span-6 lg:col-span-3 flex justify-center gap-6"
							>
								<figure className="flex flex-col justify-center">
									<img
										className="rounded-full shadow-md"
										src={`https://scontent-cdninstagram-com.translate.goog/v/${el.avatar
											?.trim()
											?.replace(/.*\/v\//gm, "")}`}
										height={120}
										width={120}
										alt={el.username}
									/>
								</figure>

								<div className="flex-grow flex flex-col justify-center ml-4">
									<Link href={`/profile/${el.username.replace("@", "")}`}>
										<h2 className="font-bold text-2xl">{el.username}</h2>
									</Link>
									<h3 className="font-semibold text-lg">{el.name}</h3>
									{el.bio && <p className="mt-4">{el.bio}</p>}
								</div>
							</li>
						))}
					</ul>
				)}

				{data.list.length == 0 && (
					<h3 className="text-center mx-auto my-8">No Results Found</h3>
				)}
			</section>
		</>
	);
};

export default page;
