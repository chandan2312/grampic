"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaComment, FaHeart, FaRegCirclePlay } from "react-icons/fa6";
import { HiArrowsExpand } from "react-icons/hi";
import { ImDownload3 } from "react-icons/im";
import { IoMdPhotos } from "react-icons/io";
import { MdAccessTimeFilled, MdVideoLibrary } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSkeleton from "./LoadingSkeleton";
import { ProgressBar } from "react-loader-spinner";

const LoadMore = ({ maxId, userId, data }) => {
	const [items, setItems] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [currentMaxId, setCurrentMaxId] = useState(maxId);
	const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(
				`/api/picnob/load-more?maxId=${currentMaxId}&userId=${userId}`
			);
			const data = await response.json();

			if (data.posts.length > 0) {
				setItems([...items, ...data.posts]);
				setCurrentMaxId(data.maxId);
				setHasMore(data.has_next);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleLoadMoreClick = () => {
		setShowLoadMoreButton(false);
		fetchData();
	};

	return (
		<>
			{/* Render your items here */}

			{items.map((post, index) => (
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
								<Link href={`/p/${post.linkID}`}>
									<FaRegCirclePlay className=" text-6xl  cursor-pointer bg-primary/80 text-white rounded-full" />
								</Link>
							</div>
						)}
						<Link href={`/p/${post.linkID}`}>
							<figure className="rounded-t-md shadow-md cursor-pointer">
								<Image
									src={`https://scontent--atl3--1-cdninstagram-com.translate.goog/v/${post.img}`}
									height={324}
									width={324}
									className="w-full transition-opacity   duration-[2s] ease-in-out hover:opacity-80"
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
			))}

			{/* Conditional rendering for "Load More" button or Infinite Scroll */}
			<div className="col-span-12 w-full mx-auto">
				{showLoadMoreButton && (
					<div className="w-full flex justify-center items-center text-center">
						{!isLoading && (
							<button
								className="m-4 p-2 font-semibold rounded-md bg-primary text-white "
								onClick={handleLoadMoreClick}
								disabled={isLoading}
							>
								Load More
							</button>
						)}
					</div>
				)}
			</div>

			<div className="col-span-12 w-full mx-auto">
				{!showLoadMoreButton && (
					<InfiniteScroll
						className=" w-full mx-auto  text-center"
						dataLength={items.length}
						next={fetchData}
						scrollThreshold={0.98}
						hasMore={hasMore}
						loader={
							<div className=" w-full mx-auto text-center">
								<ProgressBar
									className="mx-auto  text-center"
									height="80"
									width="150"
									ariaLabel="progress-bar-loading"
									wrapperStyle={{}}
									wrapperClass="progress-bar-wrapper"
									borderColor="#ffbf00"
									barColor="#f73725"
								/>
								;
							</div>
						}
						endMessage={
							<p className="w-full text-center">
								<b>Yay! You have seen it all</b>
							</p>
						}
					/>
				)}
			</div>
		</>
	);
};

export default LoadMore;
