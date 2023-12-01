import Link from "next/link";
import React from "react";

const contact = () => {
	return (
		<>
			<main>
				<section className="card">
					<h1 className="h2 text-center">About Us</h1>
				</section>
				<section className="card ">
					<p>
						Grampic is a free to use website, which allows you to view and download
						any public Instagram profile, photos, stories, videos anonymously. We are
						not affiliated with Instagram in any way. We are just fetching the content
						from Instagram and displaying it on our website. We are not responsible
						for any content present on our website.
					</p>

					<Link href="/" className="p-4 text-center link2">
						Go Back
					</Link>
				</section>
			</main>
		</>
	);
};

export default contact;
