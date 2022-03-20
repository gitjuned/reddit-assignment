import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import ImageWrapper from "./Components/ImageWrapper";
import Main from "./Components/Main";

const baseURL = "http://www.reddit.com/r/pics/.json?jsonp=";

function App() {
	const [originalData, setOriginalData] = useState(null);
	const [filteredData, setFilteredData] = useState(null);
	const [activeCard, setActiveCard] = useState(null);
	const [title, setTitle] = useState("");

	useEffect(() => {
		axios.get(baseURL).then((response) => {
			setOriginalData(response.data.data.children);
			setFilteredData(response.data.data.children);
		});
	}, []);

	// HANDLE IMAGE CLICK OF THE ASIDE COMPONENT
	function handleImageClick(data) {
		setActiveCard(data);
	}

	// HANDLE INPUT (TITLE) CHANGE
	function handleInputChange(e) {
		let query = e.target.value;
		if (query) {
			setTitle(e.target.value);
		} else {
			setTitle(e.target.value);
			setFilteredData(originalData);
			setActiveCard(null);
		}
	}

	// HANDLE FORM SUBMIT
	// FILTERS TITLE IN LOWERCASE
	function handleFormSubmit(e) {
		e.preventDefault();
		if (title) {
			const filteredData = originalData.filter((item) =>
				item.data.title.toLowerCase().includes(title.toLowerCase())
			);
			setFilteredData(filteredData);
			setActiveCard(null);
		} else {
			setFilteredData(originalData);
			setActiveCard(null);
		}
	}

	return filteredData ? (
		<div className="wrapper">
			{/* ASIDE */}
			<aside>
				<form onSubmit={handleFormSubmit}>
					<input
						type="text"
						placeholder="Filter By Title"
						onChange={handleInputChange}
						value={title}
					/>
					<input type="submit" value="FILTER" />
				</form>

				<ImageWrapper
					data={filteredData}
					handleImageClick={handleImageClick}
				/>
			</aside>
			{/* END ASIDE */}

			{/* MAIN - SINGLE IMAGE */}
			<Main data={activeCard} />
			{/* END MAIN */}
		</div>
	) : (
		<p>No data</p>
	);
}

export default App;
