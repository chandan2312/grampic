"use client";

import Link from "next/link";
import React from "react";
import { IoHome } from "react-icons/io5";
import { IoIosMan } from "react-icons/io";
import { IoIosWoman } from "react-icons/io";

const MainMenu = () => {
	return (
		<>
			<li>
				<Link
					className="text-secondaryDark font-semibold flex items-center"
					href="/"
				>
					<IoHome className="inline" /> Home
				</Link>
			</li>
			<li>
				<Link
					className="text-secondaryDark font-semibold flex items-center"
					href="/pages/top-influencers"
				>
					<IoIosMan /> Top Influencers
				</Link>
			</li>
			<li>
				<Link
					className="text-secondaryDark font-semibold flex items-center"
					href="/pages/contact-us"
				>
					Contact Us
				</Link>
			</li>
		</>
	);
};

export default MainMenu;
