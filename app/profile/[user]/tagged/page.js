import React from "react";
import cheerio from "cheerio";
import Image from "next/image";
import ProfileInfo from "@/components/ui/ProfileInfo";
import Link from "next/link";
import { ImDownload3 } from "react-icons/im";
import { HiArrowsExpand } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { MdAccessTimeFilled, MdVideoLibrary } from "react-icons/md";
import { FaComment, FaHeart, FaRegCirclePlay } from "react-icons/fa6";
import ProfileNav from "@/components/ui/ProfileNav";

const page = async ({ params }) => {
	const user = params.user;

	const res = await fetch(
		`${process.env.DOMAIN}/api/picnob/tagged?user=${user}`,
		{
			next: {
				revalidate: 60 * 60 * 24 * 7, // 7 days
			},
		}
	);

	const data = await res.json();

	if (!data?.username) {
		return <p>No Tagged Posts Found</p>;
	}

	return (
		<>
			<ProfileInfo data={data} />

			{!data.isPrivate && data.posts.length && (
				<ProfileNav data={data} currTab="Tagged" />
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
						<div
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
										<Link href={`/profile/${post.user}/${post.linkID}`}>
											<FaRegCirclePlay className=" text-6xl  cursor-pointer bg-primary/80 text-white rounded-full" />
										</Link>
									</div>
								)}
								<Link href={`/profile/p/${post.linkID}`}>
									<figure className="rounded-t-md shadow-md cursor-pointer">
										<Image
											src={`https://scontent--atl3--1-cdninstagram-com.translate.goog/v/${post.img}`}
											height={600}
											width={600}
											layout="responsive"
											objectFit="cover"
											objectPosition="center center"
											alt={post.caption}
											className="w-full transition-opacity   duration-[2s] ease-in-out hover:opacity-80"
											loading="lazy"
										/>
									</figure>
								</Link>
							</div>

							<div className="relative">
								<ul className="absolute right-1 top-[-32px] flex gap-2 ">
									<Link href={`/profile/${post.user}/${post.linkID}`}>
										<li className=" bg-secondary/40 hover:bg-primary text-primary p-[6px] max-w-[max-content] rounded-full shadow-md cursor-pointer">
											<HiArrowsExpand className="font-bold" />
										</li>
									</Link>
									<Link href={`${post.imgDownload}`} rel="noreferrer">
										<li className=" bg-secondary/40 hover:bg-primary text-primary p-[6px] max-w-[max-content] rounded-full shadow-md cursor-pointer">
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
						</div>
					))
				) : (
					<h3 className="nx-auto h3 text-center text-primary">No Posts</h3>
				)}

				{!data.isPrivate && data.posts.length && (
					<Link
						href="#"
						className="bg-primary flex-grow w-full col-span-12 text-white p-3 mx-auto max-w-[max-content] rounded-md my-6"
					>
						Load More <span className="text-xs">(coming soon)</span>
					</Link>
				)}
			</section>

			{/* <RelatedPosts body={body2} /> */}
		</>
	);
};

export default page;
