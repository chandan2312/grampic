"use client";

import React from "react";
import { ProgressBar } from "react-loader-spinner";

const LoadingSkeleton = () => {
	return (
		<div className="w-full h-[90vh] flex justify-center items-center text-center mx-auto my-auto">
			<ProgressBar
				height="80"
				width="150"
				ariaLabel="progress-bar-loading"
				wrapperStyle={{}}
				wrapperClass="progress-bar-wrapper"
				borderColor="#ffbf00"
				barColor="#f73725"
			/>
		</div>
	);
};

export default LoadingSkeleton;
