import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdPhotos } from "react-icons/io";
import { MdAccessTimeFilled, MdVideoLibrary } from "react-icons/md";
import { FaComment, FaHeart, FaRegCirclePlay } from "react-icons/fa6";

const page = async ({ params }) => {
	const tag = params.name;
	console.log(tag);

	const res = await fetch(`${process.env.DOMAIN}/api/picnob/tag?tag=${tag}`, {
		next: {
			revalidate: 60 * 60 * 24 * 2, // 2 days
		},
	});
	const data = await res.json();
	if (!data?.tag) {
		return <p>No Post Found Related To Tag</p>;
	}

	const currTime = new Date();

	return (
		<main>
			{/* --------------------------------------------- SEO  ----------------------------------------------- */}
			{/* <NextSeo
				title={`${data.tagCount} Posts Tagged With ${data.tag} - Instagram Photos, Videos | GramPic`}
				description={`All Posts Related To ${data.tag} Tag. There are total ${data.tagCount} posts of ${data.tag} tag. View alll top and recent posts of ${data.tag} tag.`}
				canonical={`https://grampic.com/tag/${data.tag}`}
				openGraph={{
					article: {
						modifiedTime: currTime.toISOString(),
					},
					url: `https://grampic.com/tag/${data.tag}`,
					title: `${data.tagCount} Posts Tagged With ${data.tag} - Instagram Photos, Videos | GramPic`,
					description: `All Posts Related To ${data.tag} Tag. There are total ${data.tagCount} posts of ${data.tag} tag. View alll top and recent posts of ${data.tag} tag.`,
					type: "website",
					locale: "en_US",
					images: data.topPosts
						.filter((post, index) => index < 3)
						.map((post) => ({
							url: `https://scontent--atl3--1-cdninstagram-com.translate.goog/v/${post.img}`,
							width: 600,
							height: 600,
							alt: `Post tagged with (${data.tag}) - ${post.captionText}`,
						})),

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
						name: data.tag,
						item: `/tag/${data.tag}`,
					},
				]}
			/>
			<ArticleJsonLd
				dateModified={currTime.toISOString()}
				isAccessibleForFree={true}
			/> */}

			{/* --------------------------------------------- SEO  ----------------------------------------------- */}
			<h1 className="card h1 text-center text-primary/80">
				Total {data.tagCount} Posts Tagged With {data.tag}
			</h1>
			<section className="grid grid-cols-12 gap-4  card">
				{/* -------------------------------- top posts ----------------------------------- */}
				<h2 className="h2 col-span-12 text-center">
					Top Posts tagged with - {data.tag}
				</h2>
				{data.topPosts.length > 0 ? (
					data.topPosts.map((post, index) => (
						<article
							className="card !m-0 !p-0 col-span-12 lg:col-span-4 hover:shadow-xl transition duration-300 ease-in-out"
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
										<Link href={`/p/${post.linkID}`}>
											<FaRegCirclePlay className=" text-6xl  cursor-pointer bg-primary/80 text-white rounded-full" />
										</Link>
									</div>
								)}
								<Link href={`/p/${post.linkID}`}>
									<figure className="rounded-t-md shadow-md cursor-pointer">
										<Image
											src={`https://scontent--atl3--1-cdninstagram-com.translate.goog/v/${post.img}`}
											height={600}
											width={600}
											layout="responsive"
											objectFit="cover"
											objectPosition="center center"
											alt={
												post.captionText
													? `Top Post Tagged ${data.tag} - ${post.captionText}`
													: `Top Post Tagged ${data.tag} - ${index + 1}`
											}
										/>
									</figure>
								</Link>
							</div>

							<div className="relative">
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

				{/* -------------------------------- recent posts ----------------------------------- */}
				<h2 className="h2 col-span-12 text-center !mt-6">
					Recent Posts tagged with - {data.tag}
				</h2>
				{data.recentPosts.length > 0 ? (
					data.recentPosts.map((post, index) => (
						<article
							className="card !m-0 !p-0 col-span-12 lg:col-span-4 hover:shadow-xl transition duration-300 ease-in-out"
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
										<Link href={`/p/${post.linkID}`}>
											<FaRegCirclePlay className=" text-6xl  cursor-pointer bg-primary/80 text-white rounded-full" />
										</Link>
									</div>
								)}
								<Link href={`/p/${post.linkID}`}>
									<figure className="rounded-t-md shadow-md cursor-pointer">
										<Image
											src={`https://scontent--atl3--1-cdninstagram-com.translate.goog/v/${post.img}`}
											height={600}
											width={600}
											layout="responsive"
											objectFit="cover"
											objectPosition="center center"
											alt={
												post.captionText
													? `Top Post Tagged ${data.tag} - ${post.captionText}`
													: `Top Post Tagged ${data.tag} - ${index + 1}`
											}
											className="w-full transition-opacity   duration-[2s] ease-in-out hover:opacity-80"
											loading="lazy"
										/>
									</figure>
								</Link>
							</div>

							<div className="relative">
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
			</section>

			{/* <RelatedPosts body={body2} /> */}
		</main>
	);
};

export default page;
