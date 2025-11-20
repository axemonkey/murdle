import { settings } from "./modules/settings.js";

const buildGrid = (config) => {
	const theBox = document.createElement("div");
	theBox.classList.add("box", `box-size${config.size}`);
	theBox.id = `box${config.boxNumber}`;

	for (let i = 1; i <= config.size; i++) {
		for (let j = 1; j <= config.size; j++) {
			const cell = document.createElement("div");
			cell.classList.add("cell", "state0");
			cell.dataset.state = "0";
			cell.dataset.row = i;
			cell.dataset.col = j;
			cell.dataset.rc = `${i}-${j}`;
			cell.style.gridRow = i;
			cell.style.gridColumn = j;
			theBox.append(cell);
		}
	}

	return theBox;
};

const buildPuzzle = () => {
	const { labels, items } = settings;
	const config = {
		boxNumber: 1,
		// categories: settings.categories,
		size: settings.size,
		label0: labels[0],
		items0: items[0],
		label1: labels[1],
		items1: items[1],
	};

	const puzzleHolder = document.getElementById("puzzle");
	const firstGrid = buildGrid(config);

	puzzleHolder.append(firstGrid);
};

const init = () => {
	console.log("JS loaded");

	buildPuzzle();
};

window.addEventListener("load", init);
