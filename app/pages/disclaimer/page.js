import Link from "next/link";
import React from "react";

export const metadata = {
	title: `Disclaimer | ${process.env.NAME}`,
};

const contact = () => {
	return (
		<>
			<main>
				<section className="card">
					<h1 className="h2 text-center">Disclaimer</h1>
				</section>
				<section className="card ">
					<p>
						If you require any more information or have any questions about our
						site&apos;s disclaimer, please feel free to contact us by email at
						grampic@gmail.com. Our Disclaimer was generated with the help of the .
					</p>

					<h2 className="h3">Disclaimers for grampic</h2>

					<p>
						All the information on this website - https://grampic.com - is published
						in good faith and for general information purpose only. grampic does not
						make any warranties about the completeness, reliability and accuracy of
						this information. Any action you take upon the information you find on
						this website (grampic), is strictly at your own risk. grampic will not be
						liable for any losses and/or damages in connection with the use of our
						website.
					</p>

					<p>
						From our website, you can visit other websites by following hyperlinks to
						such external sites. While we strive to provide only quality links to
						useful and ethical websites, we have no control over the content and
						nature of these sites. These links to other websites do not imply a
						recommendation for all the content found on these sites. Site owners and
						content may change without notice and may occur before we have the
						opportunity to remove a link which may have gone &apos;bad&apos;.
					</p>

					<p>
						Please be also aware that when you leave our website, other sites may have
						different privacy policies and terms which are beyond our control. Please
						be sure to check the Privacy Policies of these sites as well as their
						&quot;Terms of Service&quot; before engaging in any business or uploading
						any information.
					</p>

					<h2 className="h3">Consent</h2>

					<p>
						By using our website, you hereby consent to our disclaimer and agree to
						its terms.
					</p>

					<h2 className="h3">Update</h2>

					<p>
						Should we update, amend or make any changes to this document, those
						changes will be prominently posted here.
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
