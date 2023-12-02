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
			{
				source: "/top-sitemap.xml",
				destination: "/top-sitemap",
			},
			{
				source: "/top-sitemap-:page.xml",
				destination: "/top-sitemap/:page",
			},
		];
	},
};

module.exports = nextConfig;
