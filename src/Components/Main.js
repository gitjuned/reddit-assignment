import React from "react";

export default function Main({ data }) {
	return (
		<main>
			{data && (
				<div className="image-wrapper">
					<img src={data.url} alt={data.thumbnail} />
					<h1>{`Title: ${data.title}`}</h1>
					<h2>{`Author: ${data.author}`}</h2>
					<p>{`Subreddit: ${data.subreddit}`}</p>
				</div>
			)}
		</main>
	);
}
