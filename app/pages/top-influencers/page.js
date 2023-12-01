import Top100 from "@/components/ui/top-list";
import React from "react";

const TopInfluencers = () => {
	return (
		<>
			{/* <NextSeo
				title={`Top 100 Trending & Famous Instagram Celebrities List - Updated`}
				description={`Here, we have listed the top 100 most famous and trending Instagram celebrities. This list is updated every 24 hours.`}
			/> */}
			<h1 className="h2 text-center text-primary/70">
				Top 100 Trending & Famous Instagram Celebrities List - Updated
			</h1>
			<Top100 />
		</>
	);
};

export default TopInfluencers;
