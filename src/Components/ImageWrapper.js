import React from "react";

export default function ImageWrapper({ data, handleImageClick }) {
	return (
		<div className="images-wrapper">
			{data.map((item, index) => (
				<div
					key={index}
					className="image-wrapper"
					onClick={() => handleImageClick(item.data)}
				>
					<img src={item.data.thumbnail} alt={data.thumbnail} />
					<h3>{item.data.title}</h3>
				</div>
			))}
		</div>
	);
}
