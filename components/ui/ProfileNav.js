import Link from "next/link";
import React from "react";

const ProfileNav = ({ data, currTab = "Posts", customStyle = "" }) => {
	const style = "font-semibold  badge !w-[30%] py-4 !px-auto !mx-auto";
	const styleActive =
		"badge-primary hover:bg-secondary text-white hover:text-content-100";
	const styleInactive =
		"badge-secondary hover:bg-primary text-content-100 hover:text-white";

	return (
		<>
			<section className={`card ${customStyle}`}>
				<ul className="flex bg- gap-6 justify-around lg:mx-[15%]">
					<Link
						href={`/profile/${data.username}`}
						className={`${style} ${
							currTab == "Posts" ? styleActive : styleInactive
						} `}
					>
						<li>Posts</li>
					</Link>

					<Link
						href={`/profile/${data.username}/stories`}
						className={`${style} ${
							currTab == "Stories" ? styleActive : styleInactive
						} `}
					>
						<li>Stories</li>
					</Link>
					<Link
						href={`/profile/${data.username}/tagged`}
						className={`${style} ${
							currTab == "Tagged" ? styleActive : styleInactive
						} `}
					>
						<li>Tagged</li>
					</Link>
				</ul>
			</section>
		</>
	);
};

export default ProfileNav;
