import React from "react";
import cheerio from "cheerio";
import ProfileInfo from "./ProfileInfo";
import ProfileNav from "./ProfileNav";
import { MdVideoLibrary } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { FaRegCirclePlay } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { HiArrowsExpand } from "react-icons/hi";
import { ImDownload3 } from "react-icons/im";

const RelatedPosts = ({ body }) => {
	// console.log(body);
	const $$ = cheerio.load(body);

	const user = $$("h1 div.username").text()?.trim().replace("@", "");
	console.log(user);

	const data = {
		username: $$("h1 div.username").text()?.trim().replace("@", ""),
		name: $$("div.name a").text()?.trim(),
		bio: $$("div.bio").text()?.trim(),
		imgUrl: `https://instagram-fnag1--4-fna-fbcdn-net.translate.goog/v/${$$(
			"div.userinfo div.img a img"
		)
			.attr("src")
			?.replace(/.*\/v\//gm, "")}`,
		userId: $$("div.userinfo").attr("data-id"),
		isPrivate: $$("div.error").text()?.trim() === "You visit a private account",
		haveZeroPosts: $$("div.error").text()?.trim() === "No Posts",
		postsLength: $$("div.items div.item").length,
		posts: $$("div.page-user.container div.items div.item")
			.map((i, el) => {
				const post = {
					imgId: $$(el)
						.find("div.img a")
						.attr("href")
						?.replace(/.*\/p\//, "")
						.replace("/?_x_tr_sl=ja&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp", ""),
					imgUrl:
						$$(el)
							.find("div.img a img")
							.attr("data-src")
							?.replace(/.*\/v\//gm, "") ||
						$$(el)
							.find("div.img a img")
							.attr("src")
							?.replace(/.*\/v\//gm, ""),
					from: $$(el).find("div.hd div.username a").text()?.trim().replace("@", ""),
					caption: $$(el).find("div.img a img").attr("alt")?.trim(),
					isVideo: $$(el).find("div.img i").attr("class") === "video",
					isCarousel: $$(el).find("div.img svg").attr("fill") === "#ffffff",
					date: $$(el).find("div.action div.time").text()?.trim(),
					download: $$(el)
						.find("div.action a.download")
						.attr("href")
						?.replace(
							"https://translate.google.com/website?sl=ja&tl=en&hl=en&client=webapp&u=",
							""
						),
				};

				return post;
			})
			.get(),
	};

	if (data.posts.length) {
		return (
			<>
				<section className="grid grid-cols-12 gap-[6px] lg:gap-4  card">
					<h2 className="col-span-12 h2 text-primary text-center">Related Posts</h2>
					{/* Account has Zero Post but public */}

					{!data.haveZeroPosts && !data.isPrivate && data.posts.length ? (
						data.posts.map((post) => (
							<article
								className="card !m-0 !p-0 col-span-6 lg:col-span-3 hover:shadow-xl transition duration-300 ease-in-out"
								key={post.imgId}
							>
								<div className="hover:shadow-xl transition duration-300 ease-in-out">
									{/* Media type - top right corner */}

									<div className="relative">
										<div className="relative">
											<div className="absolute right-1 top-[6px] flex gap-2 ">
												{post.isVideo && (
													<MdVideoLibrary className="text-2xl text-white font-bold shadow-lg" />
												)}

												{post.isCarousel && (
													<IoMdPhotos className="text-2xl text-white font-bold shadow-lg" />
												)}
											</div>
										</div>

										{post.isVideo && (
											<div className="absolute top-[45%]  right-[45%]  flex justify-center items-center">
												<Link href={`/profile/${post.from}/${post.imgId}`}>
													<FaRegCirclePlay className=" text-6xl  cursor-pointer bg-primary/80 text-white rounded-full" />
												</Link>
											</div>
										)}
										<Link href={`/profile/${post.from}/${post.imgId}`}>
											<figure className="rounded-t-md shadow-md cursor-pointer">
												<Image
													src={`https://instagram-fnag6--1-fna-fbcdn-net.translate.goog/v/${post.imgUrl}`}
													height={600}
													width={600}
													layout="responsive"
													objectFit="cover"
													objectPosition="center center"
													alt={post.caption}
												/>
											</figure>
										</Link>
									</div>

									<div className="relative">
										<ul className="absolute right-1 top-[-32px] flex gap-2 ">
											<Link href={`/profile/${post.from}/${post.imgId}`}>
												<li className=" bg-base-300/20 hover:bg-primary text-primary p-[6px] max-w-[max-content] rounded-full shadow-md cursor-pointer">
													<HiArrowsExpand className="font-bold" />
												</li>
											</Link>
											<Link href={`/profile/${post.from}/${post.imgId}`}>
												<li className=" bg-base-300/20 hover:bg-primary text-primary p-[6px] max-w-[max-content] rounded-full shadow-md cursor-pointer">
													<ImDownload3 className="font-bold" />
												</li>
											</Link>
										</ul>
										<div className="m-2">
											<p>
												Posted by -{" "}
												<Link
													className="link1"
													href={`/profile/${post.from}/${post.imgId}`}
												>
													@{post.from}
												</Link>
											</p>
											<Link href={`/profile/${post.from}/${post.imgId}`}>
												<p className=" h4 !px-0 text-content-300 overflow-hidden line-clamp-4">
													{post.caption}
												</p>
											</Link>
										</div>
									</div>
								</div>
							</article>
						))
					) : (
						<h3 className="nx-auto h3 text-center text-primary">No Related Posts</h3>
					)}
				</section>
			</>
		);
	} else {
		return <></>;
	}
};

export default RelatedPosts;
