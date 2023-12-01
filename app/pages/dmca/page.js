import Link from "next/link";
import React from "react";

const contact = () => {
	return (
		<>
			<main>
				<section className="card">
					<h1 className="h2 text-center">Raise a DMCA / CopyRights</h1>
				</section>
				<section className="card ">
					<p>
						The Content Present on this site is not hosted on our servers. We are just
						fetching the content from Instagram and displaying it on our website. We
						are not responsible for any content present on our website. But,
						anyway....
					</p>
					<p>
						If you are the owner of some content present on Our website and want to
						remove it from our website, then feel free to reach out us at
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
