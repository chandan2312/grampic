import Link from "next/link";
import React from "react";

const contact = () => {
	return (
		<>
			<main>
				<section className="card">
					<h1 className="h2 text-center">Contact Us</h1>
				</section>
				<section className="card ">
					<p>
						If You have any doubts or question about our website or content on our
						website. Please, feel free to reach out to us on
						<strong>grampic@gmail.com</strong>. We typically reponse within 48 hours
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
