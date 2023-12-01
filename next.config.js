/** @type {import('next').NextConfig} */

const generateRemotePatterns = () => {
	const mainDomain = "translate.goog";

	return [
		{
			protocol: "https",
			hostname: `*.${mainDomain}`,
			port: "",
		},
	];
};

const nextConfig = {
	images: {
		remotePatterns: [...generateRemotePatterns()],
	},

	async rewrites() {
		return [
			{
				source: "/profile-sitemap.xml",
				destination: "/profile-sitemap",
			},
			{
				source: "/profile-sitemap-:page.xml",
				destination: "/profile-sitemap/:page",
			},
		];
	},
};

module.exports = nextConfig;
