"use client";
import React from "react";
var FileSaver = require("file-saver");
import { FaDownload } from "react-icons/fa6";

const DownloadButton = ({ link = "", filename }) => {
	// console.log(link);
	// console.log(filename);
	const file = `${filename}.jpg`;

	// console.log(file);

	const saveFile = () => {
		FileSaver.saveAs(link, file);
	};

	return (
		<button className="px-6 py-1 text-center text-white bg-success hover:bg-primary rounded-md ">
			Download <FaDownload className="inline" />
		</button>
	);
};

export default DownloadButton;
