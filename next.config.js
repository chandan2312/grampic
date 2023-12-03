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

	async headers() {
		return [
			{
				source: "/:path*.xml",
				locale: false,
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=3600, must-revalidate",
					},
				],
			},
			{
				path: "/top-sitemap",
				locale: false,
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=3600, must-revalidate",
					},
				],
			},
			{
				path: "/top-sitemap/:page",
				locale: false,
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=3600, must-revalidate",
					},
				],
			},
			{
				path: "/profile-sitemap/",
				locale: false,
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=3600, must-revalidate",
					},
				],
			},
			{
				path: "/profile-sitemap/:page",
				locale: false,
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=3600, must-revalidate",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
