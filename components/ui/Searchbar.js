"use client";

import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const Searchbar = ({ setSearchMode = "none" }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleEnter = (e) => {
		if (e.key) {
			if (e.key === "Enter") {
				const term = e.target.value.trim().toLowerCase().replace(/ /g, "-");

				window.location.href = `/search/${term}`;

				if (setSearchMode !== "none") {
					setSearchMode(false);
				}
			}
		}
	};

	const handleSearch = (e) => {
		e.preventDefault();

		const term = searchTerm.trim().toLowerCase().replace(/ /g, "-");
		window.location.href = `/search/${term}`;
	};
	return (
		<>
			<form action="" className="mx-auto">
				<div className="m-3  flex justify-center gap-3 w-[90%] md:w-[70%] lg:w-[568px]">
					<input
						type="text"
						className=" w-full text-sm bg-base-300/30 px-3 rounded-md h-9 border border-primary"
						placeholder="Search"
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyDown={handleEnter}
					/>
					<button
						type="submit"
						onClick={handleSearch}
						className="px-2 bg-primary/90 text-white rounded-md border border-primary"
					>
						<IoSearchSharp className="text-lg font-bold" />
					</button>
				</div>
			</form>
		</>
	);
};

export default Searchbar;
