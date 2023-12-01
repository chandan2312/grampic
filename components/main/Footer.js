import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<>
			<footer className="m-3">
				<div class="footer__content lg:flex lg:justify-between">
					<Link className="block" href="/">
						GramPic © 2023 - all rights reserved.
					</Link>
					<div className="flex flex-wrap gap-x-5 gap-y-0 !text-sm">
						<Link className="link2" href="/pages/terms-and-conditions">
							Terms & Conditions
						</Link>
						<Link className="link2" href="/pages/privacy-policy">
							Privacy Policy
						</Link>
						<Link className="link2" href="/pages/dmca">
							Remove / DMCA
						</Link>
						<Link className="link2" href="/pages/disclaimer">
							Disclaimer
						</Link>
						<Link className="link2" href="/pages/contact-us">
							Contact
						</Link>
						<Link className="link2" href="/pages/about-us">
							About Us
						</Link>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
