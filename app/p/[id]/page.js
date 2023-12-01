import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileInfo from "@/components/ui/ProfileInfo";
import ProfileNav from "@/components/ui/ProfileNav";
import { FaDownload, FaRegCirclePlay } from "react-icons/fa6";

const page = async ({ params }) => {
	const currTime = new Date();
	const id = params.id;

	const res = await fetch(`${process.env.DOMAIN}/api/picnob/post?id=${id}`, {
		next: {
			revalidate: 60 * 60 * 24 * 30, // 30 days
		},
	});
	const data = await res.json();

	if (!data?.username) {
		return (
			<p className="text-center flex justify-center items-center">
				Error Loadin Posts
			</p>
		);
	}

	return (
		<>
			{/* --------------------------------------------- SEO  ----------------------------------------------- */}
			{/* <NextSeo
				title={`${data.username} Update - ${data.captionText
					.split(" ")
					.slice(0, 10)
					.join(" ")}${
					data.captionText.split(" ").length > 10 ? "..." : ""
				} | GramPic`}
				description={`${data.captionText} - ${data.username} Instagram Photos`}
				canonical={`https://grampic.com/profile/${data.username}/${data.linkID}`}
				customMeta={[
					{ property: "modifiedTime", content: currTime.toISOString() },
					{ property: "dateModified", content: currTime.toISOString() },
				]}
				openGraph={{
					article: {
						modifiedTime: currTime.toISOString(),
					},
					url: `https://grampic.com/profile/${data.username}/${data.linkID}`,
					title: `${data.username} Update - ${data.captionText
						.split(" ")
						.slice(0, 10)
						.join(" ")}${
						data.captionText.split(" ").length > 10 ? "..." : ""
					} | GramPic`,
					description: `${data.captionText} - ${data.username} Instagram Photos`,
					type: "website",
					locale: "en_US",
					images: data.media.map((post) => ({
						url: `https://scontent--atl3--1-cdninstagram-com.translate.goog/v/${post.img}`,
						width: 600,
						height: 600,
						alt: `${data.username} (${data.name}) Instagram - ${post.captionText}`,
					})),
					profile: {
						name: data.name,
						username: data.username,
						avatar: `${
							data.avatar.includes("translate.goog")
								? data.avatar
								: `https://instagram-fnag6--1-fna-fbcdn-net.translate.goog/v/${data.avatar}`
						}`,
					},
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
					{
						position: 2,
						name: data.username,
						item: `/profile/${data.username}`,
					},
					{
						position: 3,
						name: `Post - ${data.linkID}`,
						item: `/profile/${data.username}/${data.linkID}`,
					},
				]}
			/>
			<ArticleJsonLd
				dateModified={currTime.toISOString()}
				isAccessibleForFree={true}
			/>
			<SocialProfileJsonLd
				type="Person"
				name={`${data.name} (${data.username})`}
				url={`https://grampic.com/profile/${data.username}`}
				sameAs={[`http://instagram.com/${data.username}`]}
			/> */}

			{/* --------------------------------------------- SEO End ----------------------------------------------- */}

			<ProfileInfo data={data} />

			<main className="card">
				<ProfileNav data={data} currTab="Posts" customStyle="!border-none" />

				<h1 className="text-2xl text-center font-bold mx-auto my-6">{`${data.username} (${data.name}) Instagram Update - `}</h1>

				{data.media.length && (
					<>
						<div id="caption">
							<div
								className=" my-5 m-2 px-2"
								dangerouslySetInnerHTML={{ __html: data.caption }}
							></div>
							<p className="font-bold my-3 text-end mx-4 px-2">{data.time}</p>
						</div>
					</>
				)}

				<section className="mx-auto my-4">
					{/* -------------------------------------  multiple photos  ------------------------------------- */}

					{data.media.length && (
						<>
							<div id="gallery" className="grid grid-cols-12">
								{data.media.map((item, index) => {
									return (
										<figure
											key={index}
											className="card relative max-lg:!mx-0 max-lg:!px-0 max-lg:!pt-0 col-span-12 lg:col-span-6 gap-4 "
										>
											<Image
												src={`https://instagram-fnag1--4-fna-fbcdn-net.translate.goog/v/${item.img}`}
												width={600}
												height={600}
												layout="responsive"
												className="w-full transition-opacity  duration-[2s] ease-in-out hover:opacity-80 rounded-t-md shadow-md"
												objectPosition="center center"
												// placeholder="blur"
												quality={100}
												loading="lazy"
												alt={
													item.captionText
														? `${data.username} Instagram Post - ${item.captionText}`
														: `${data.username} Instagram Post ${index}`
												}
											/>

											{item.isVideo && (
												<span className="absolute  top-[45%]  right-[45%]  flex justify-center items-center">
													<Link href={item.download.replace("&dl=1", "")} target="_blank">
														<FaRegCirclePlay className=" text-6xl  cursor-pointer bg-primary/80 text-white rounded-full" />
													</Link>
												</span>
											)}

											<button className="px-6 py-1 text-center text-white bg-success hover:bg-primary rounded-md ">
												<Link href={item.download}>
													Download <FaDownload className="inline" />
												</Link>
											</button>
										</figure>
									);
								})}
							</div>
						</>
					)}

					<div id="caption">
						<div
							className="my-5 m-2  px-2"
							dangerouslySetInnerHTML={{ __html: data.caption }}
						></div>
						<p className="font-bold my-3 text-end mx-4 px-2">{data.time}</p>
					</div>
				</section>

				{/* -------------------------------------  Comments ------------------------------------- */}

				<section id="comments" className="mx-2 my-4">
					<h2 className="text-2xl font-semibold my-4 px-2 mx-auto">Comments</h2>

					<ul>
						{data.comments.length &&
							data.comments.map((comment, index) => {
								return (
									<li key={index} className="card  mx-auto ">
										<div className="flex items-center gap-4">
											<figure className="relative w-10 h-10 rounded-full overflow-hidden">
												<Image
													src={`https://instagram-fnag6--3-fna-fbcdn-net.translate.goog/v/${comment?.avatar?.replace(
														"sp1.picnob.com",
														"sp1-picnob-com.translate.goog"
													)}`}
													width={100}
													height={100}
													layout="responsive"
													objectFit="cover"
													objectPosition="center center"
													alt={comment.username}
												/>
											</figure>
											<div className="flex flex-col">
												<Link href={`/profile/${comment.username}`}>
													<h3 className="text-lg font-semibold">{comment.username}</h3>
												</Link>
												<p className="text-sm">{comment.time}</p>
											</div>
										</div>
										<p className="text-lg mt-3">{comment.text}</p>
									</li>
								);
							})}
					</ul>
				</section>

				{/* {data.similar.length && (
					<section id="more_posts" className="mx-2 my-4">
						<h2 className="text-2xl font-semibold my-8 px-2 mx-auto">
							More Photos & Videos from {data.username}
						</h2>

						<ul className="grid grid-cols-12 gap-4">
							{data.similar.map((item, index) => {
								return (
									<li key={index} className="col-span-6 lg:col-span-4">
										<Link href={`/profile/${data.username}/${item.postId}`}>
											<img
												src={item.img}
												width={300}
												height={300}
												layout="responsive"
												objectFit="cover"
												objectPosition="center center"
											/>
										</Link>
									</li>
								);
							})}
						</ul>
					</section>
				)} */}
			</main>
		</>
	);
};

export default page;
