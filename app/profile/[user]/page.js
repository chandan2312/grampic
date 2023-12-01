import React from "react";
import Image from "next/image";
import ProfileInfo from "@/components/ui/ProfileInfo";
import Link from "next/link";
import { ImDownload3 } from "react-icons/im";
import { HiArrowsExpand } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { MdAccessTimeFilled, MdVideoLibrary } from "react-icons/md";
import { FaComment, FaHeart, FaRegCirclePlay } from "react-icons/fa6";
import ProfileNav from "@/components/ui/ProfileNav";
import LoadMore from "@/components/ui/LoadMore";

const page = async ({ params }) => {
	const user = params.user;
	console.log(user);

	const res = await fetch(`${process.env.DOMAIN}/api/picnob/user?user=${user}`, {
		next: {
			revalidate: 60 * 60 * 24 * 2, // 2 days
		},
	});
	const data = await res.json();

	if (!data?.username) {
		return <p>No User Found</p>;
	}

	const currTime = new Date();

	return (
		<main>
			{/* --------------------------------------------- SEO  ----------------------------------------------- */}
			{/* <NextSeo
				title={`${data.username} (${data.name}) Instagram Photos, Videos, Stories & Profile | GramPic`}
				description={`View & Download ${data.name} (${data.username}) Profile, Instagram Photos, Stories, Videos annonymously. ${data.username} has over ${data.followers} followers and ${data.postCount} posts.`}
				canonical={`https://grampic.com/profile/${data.username}`}
				customMeta={[{ property: "modifiedTime", content: currTime.toISOString() }]}
				openGraph={{
					article: {
						modifiedTime: currTime.toISOString(),
					},
					url: `https://grampic.com/profile/${user}`,
					title: `${data.username} (${data.name}) Instagram Photos, Videos, Stories & Profile | GramPic`,
					description: `View & Download ${data.name} (${data.username}) Profile, Instagram Photos, Stories, Videos anonymously. ${data.username} has over ${data.followers} followers and ${data.postCount} posts.`,
					type: "website",
					locale: "en_US",
					images: data.posts
						.filter((post, index) => index < 3)
						.map((post) => ({
							url: `https://scontent--atl3--1-cdninstagram-com.translate.goog/v/${post.img}`,
							width: 600,
							height: 600,
							alt: `${data.username} (${data.name}) Instagram - ${post.captionText}`,
						})),
					profile: {
						name: data.name,
						username: data.username,
						followers: data.followers,
						following: data.following,
						posts: data.postCount,
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
						item: `/profile/${user}`,
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
				url={`https://grampic.com/profile/${user}`}
				sameAs={[`http://instagram.com/${data.username}`]}
			/> */}

			{/* --------------------------------------------- SEO  ----------------------------------------------- */}

			<ProfileInfo data={data} />

			{!data.isPrivate && data.posts.length && (
				<ProfileNav data={data} currTab="Posts" />
			)}

			<section className="grid grid-cols-12 gap-4  card">
				{/* Account has Zero Post but public */}
				{data.posts.length == 0 && !data.isPrivate && (
					<h3 className="col-span-12 my-8 mx-auto">User dont have any post</h3>
				)}
				{/* Account is private */}
				{data.isPrivate && (
					<h3 className="col-span-12 my-8 mx-auto">This account is private</h3>
				)}

				{/* Account is public and have posts */}
				{data.posts.length > 0 && !data.isPrivate ? (
					data.posts.map((post, index) => (
						<article
							className="card !m-0 !p-0 col-span-12 sm:col-span-6 lg:col-span-4 hover:shadow-xl transition duration-300 ease-in-out"
							key={index}
						>
							{/* Media type - top right corner */}

							<div className="relative">
								<div className="relative">
									<div className="absolute right-1 top-[6px] flex gap-2 ">
										{post.isVideo && (
											<MdVideoLibrary className="text-2xl text-white font-bold shadow-lg" />
										)}

										{post.isMultiple && (
											<IoMdPhotos className="text-2xl text-white font-bold shadow-lg" />
										)}
									</div>
								</div>

								{post.isVideo && (
									<div className="absolute top-[45%]  right-[45%]  flex justify-center items-center">
										<Link
											href={
												post.isVideo
													? post.imgDownload.replace("&dl=1", "")
													: `/p/${post.linkID}`
											}
											target={post.isVideo ? "_blank" : "_self"}
										>
											<FaRegCirclePlay className=" text-6xl  cursor-pointer bg-primary/80 text-white rounded-full" />
										</Link>
									</div>
								)}

								<Link
									href={
										post.isVideo
											? post.imgDownload.replace("&dl=1", "")
											: `/p/${post.linkID}`
									}
									target={post.isVideo ? "_blank" : "_self"}
								>
									<figure className="rounded-t-md shadow-md cursor-pointer">
										<Image
											src={`https://scontent--atl3--1-cdninstagram-com.translate.goog/v/${post.img}`}
											height={324}
											width={324}
											className={`w-full h-full transition-opacity opacity-100  duration-[2s] ease-in-out ${
												!post.isVideo && "hover:opacity-80"
											} `}
											layout="responsive"
											objectFit="cover"
											objectPosition="center center"
											loading="lazy"
											alt={
												post.captionText
													? `${data.username} Instagram Post - ${post.captionText}`
													: `${data.username} Instagram Post ${index + 1}`
											}
										/>
									</figure>
								</Link>
							</div>

							<div className="relative">
								<ul className="absolute right-1 top-[-32px] flex gap-2 ">
									<Link href={`/p/${post.linkID}`}>
										<li className=" bg-base-300/40 hover:bg-base-200 text-content-100/40 p-[6px] max-w-[max-content] rounded-full shadow-md cursor-pointer">
											<HiArrowsExpand className="font-bold" />
										</li>
									</Link>
									<Link href={`${post.imgDownload}`} rel="noreferrer">
										<li className=" bg-base-300/40 hover:bg-base-200 text-content-100/40 p-[6px] max-w-[max-content] rounded-full shadow-md cursor-pointer">
											<ImDownload3 className="font-bold " />
										</li>
									</Link>
								</ul>
								<div className="m-2">
									<ul className="flex items-center gap-4">
										<li className="text-primary font-bold">
											<FaHeart className="inline" />
											<span> {post.likes}</span>
										</li>
										<li className="text-cyan-400 font-bold">
											<FaComment className="inline" />
											<span> {post.comments}</span>
										</li>
										<li className="text-amber-500/80 font-bold">
											<MdAccessTimeFilled className="inline" />
											<span> {post.time}</span>
										</li>
									</ul>
									<div
										className="pt-3"
										dangerouslySetInnerHTML={{ __html: post.caption }}
									></div>
								</div>
							</div>
						</article>
					))
				) : (
					<h3 className="nx-auto h3 text-center text-primary">No Posts</h3>
				)}

				{!data.isPrivate && data.posts.length && (
					<LoadMore maxId={data.maxId} userId={data.userId} data={data} />
				)}
			</section>

			{/* <RelatedPosts body={body2} /> */}
		</main>
	);
};

export default page;
