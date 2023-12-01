"use client";

import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { CgCloseO } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import MainMenu from "./MainMenu";
import { useRouter } from "next/navigation";
import Searchbar from "../ui/Searchbar";

const Header = () => {
	const router = useRouter();
	const [searchMode, setSearchMode] = useState(false);
	const [mobMenu, setMobMenu] = useState(false);

	const handleEnter = (e) => {
		if (e.key) {
			if (e.key === "Enter") {
				const term = e.target.value.trim().toLowerCase().replace(/ /g, "-");
				window.location.href = `/search/${term}`;
			}
		}
	};

	const handleSearch = (e) => {
		e.preventDefault();

		const term = searchTerm.trim().toLowerCase().replace(/ /g, "-");
		router.push(`/search?term=${term}&page=1`);
	};

	return (
		<>
			<nav className="card !my-0 !py-1 !bg-primary/3 !mx-0 lg:!mx-2 max-lg:!mt-0 max-lg:!rounded-none sticky top-0 z-50">
				{/* ------------------------- Top Row ------------------------- */}

				<div className="flex items-center gap-2 ">
					<h1 className="h1 max-md:!text-2xl">
						<Link href="/">
							<img
								src={`/images/grampic.webp`}
								className={`max-lg:w-[100px] lg:w-[140px] h-auto pl-2 flex items-center`}
								priority={true}
								alt="grampic"
								title="grampic"
							/>
						</Link>
					</h1>
					<div className="flex-grow ">
						<ul className="f-jc gap-4 max-lg:hidden lg:gap-6 px-4 lg:px-6 ">
							<MainMenu />
						</ul>
					</div>
					<div className="flex justify-end items-center gap-4">
						<input
							type="text"
							placeholder="Search "
							className="bg-base-300/20 max-md:w-[80%] border border-base-300 text-slate-600 focus-visible:border focus-visible:border-primary px-2 py-[2px] rounded-md "
							onKeyDown={handleEnter}
						/>
						{/* <div>
							{!searchMode && (
								<IoSearchSharp
									onClick={() => setSearchMode(true)}
									className="click text-lg text-primary lg:hidden"
								/>
							)}
						</div> */}

						{/* <LanguageIcon className="click text-primary" /> */}
						{mobMenu ? (
							<CgCloseO
								onClick={() => {
									setMobMenu(false);
									setSearchMode(false);
								}}
								className=" font-bold text-lg text-primary click"
							/>
						) : (
							<GiHamburgerMenu
								onClick={() => {
									setMobMenu(true);
									setSearchMode(true);
								}}
								className="click text-lg text-primary lg:hidden"
							/>
						)}
					</div>
				</div>
				{/* ------------------------- Bottom Row ------------------------- */}

				{/* ------------------------- Search Expand ------------------------- */}

				{searchMode && (
					<div className="flex flex-grow mx-auto justify-center items-center">
						<Searchbar setSearchMode={setSearchMode} />

						<button className="px-2 my-3 h-9 bg-secondary/80 rounded-md border border-secondary">
							<CgCloseO
								onClick={() => setSearchMode(false)}
								className="text-lg text-white"
							/>
						</button>
					</div>
				)}
				{/* ------------------------- Mobile Menu Expand ------------------------- */}
				{mobMenu && (
					<ul className="p-3">
						<MainMenu />
					</ul>
				)}
			</nav>
		</>
	);
};

export default Header;
