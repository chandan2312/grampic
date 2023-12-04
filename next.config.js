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
				source: "/:sitemap/profile.xml",
				destination: "/:sitemap/profile",
			},
			{
				source: "/:sitemap/profile-:page.xml",
				destination: "/:sitemap/profile/:page",
			},
			{
				source: "/:sitemap/top.xml",
				destination: "/:sitemap/top",
			},
			{
				source: "/:sitemap/top-:page.xml",
				destination: "/:sitemap/top/:page",
			},
		];
	},

	async headers() {
		return [
			{
				source: "/:path*.xml",
				locale: false,
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=10000, must-revalidate",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
