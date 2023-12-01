import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileInfo = ({ data }) => {
	return (
		<>
			<section className="bg-base-100 flex card">
				<figure className="flex flex-col justify-center">
					<Image
						src={`${
							data.avatar.includes("translate.goog")
								? data.avatar
								: `https://instagram-fnag6--1-fna-fbcdn-net.translate.goog/v/${data.avatar}`
						}`}
						height={150}
						width={150}
						alt={`${data.username} (${data.name}) Instagram Profile Picture`}
						className="rounded-full shadow-md transition-opacity   duration-[2s] ease-in-out hover:opacity-80"
					/>
				</figure>

				<div className="flex-grow flex flex-col justify-center px-3">
					<h1 className="text-primary text-lg mt-3 font-bold  text-center">
						<Link href={`/profile/${data.username}`}>{`@${data.username}`}</Link>
					</h1>

					<h2 className="font-semibold text-blue-500 text-center">{data.name}</h2>

					{data.followers && (
						<ul className="flex justify-around mt-3 lg:justify-center gap-4 lg:gap-7">
							<li className="text-center">
								<span className="block">Posts</span>
								<span className="font-bold">{data.postCount}</span>
							</li>
							<li className="text-center">
								<span className="block">Followers</span>
								<span className="font-bold">{data.followers}</span>
							</li>
							<li className="text-center">
								<span className="block">Following</span>
								<span className="font-bold">{data.following}</span>
							</li>
						</ul>
					)}

					{data.bio && (
						<div
							className="text-center mt-4"
							dangerouslySetInnerHTML={{ __html: data.bio }}
						></div>
					)}
				</div>
			</section>
		</>
	);
};

export default ProfileInfo;
