"use client";

import { top100 } from "@/data/top-100";
import Image from "next/image";
import Link from "next/link";

const Top100 = () => {
	const list = top100;
	// console.log(list);

	if (list.length == 0) {
		return (
			<div className="w-full h-[90vh] flex justify-center items-center text-center mx-auto my-auto">
				<h1 className="text-2xl font-bold">No Data Found</h1>
			</div>
		);
	}

	return (
		<>
			<section className="">
				<h2 className="h2 text-center text-accent mt-6">
					Popular Influencers World-wide
				</h2>
				<div className="overflow-x-auto">
					<table className="table">
						<thead>
							<tr className="text-base">
								<th>Rank & Details</th>
								<th>Category</th>
								<th>Followers</th>
								<th>Country</th>
								<th>Engagement</th>
							</tr>
						</thead>

						<tbody>
							{list.map((el, index) => (
								<tr key={index}>
									<td>
										<div className="flex items-center gap-3">
											<div className="avatar">
												<div className="mask mask-squircle w-12 h-12">
													<Link href={`/profile/${el.username}`}>
														<img src={el.avatar} alt="Avatar Tailwind CSS Component" />
													</Link>
												</div>
											</div>
											<div>
												<div className="font-bold">
													{" "}
													<Link href={`/profile/${el.username}`}>{el.username}</Link>
												</div>
												<div className="text-sm opacity-80">{el.name}</div>
											</div>
										</div>
									</td>
									<td>
										<span className="badge !h-auto badge-outline badge-primary badge-sm">
											{el.category.replace("Sports with a ball", "Sports")}
										</span>
									</td>
									<td>{el.followers}</td>
									<td>{el.country}</td>
									<td>{el.engagement}</td>
									<th>
										<Link href={`/profile/${el.username}`}>
											<button className="btn btn-secondary text-white  btn-xs">
												View
											</button>
										</Link>
									</th>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</>
	);
};

export default Top100;
