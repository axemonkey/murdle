import { getDataObjFromURL } from './modules/tools.js';

/*
TODO:
* write story and clues for example
* load example button
* save puzzle state - serialised array in params with save button
* "revert to saved" button
* polish up visuals / UI
* print stylesheet

TO DONE:
* CSS for label borders
* handle layout for 3 categories
* input for params
* URL-ise params
* clear button
*/

let currSettings;

const removeStateClass = (target) => {
	for (let number = 0; number < 5; number++) {
		target.classList.remove(`state${number}`);
	}
};

const clearCrosses = (box) => {
	const crosses = box.querySelectorAll('[data-state="4"]');
	for (const cross of crosses) {
		setState(cross, 0, true);
	}

	writeCrosses(box);
};

const writeCrosses = (box) => {
	const ticks = box.querySelectorAll('[data-state="2"]');
	for (const tick of ticks) {
		const thisRow = tick.dataset.row;
		const thisRowCells = box.querySelectorAll(`[data-row="${thisRow}"]`);
		for (const rowCell of thisRowCells) {
			if (rowCell.dataset.state === '0') {
				setState(rowCell, 4, true);
			}
		}

		const thisCol = tick.dataset.col;
		const thisColCells = box.querySelectorAll(`[data-col="${thisCol}"]`);
		for (const colCell of thisColCells) {
			if (colCell.dataset.state === '0') {
				setState(colCell, 4, true);
			}
		}
	}
};

const setCrosses = (target) => {
	const box = target.closest('.box');
	clearCrosses(box);
};

const writeCellContent = (target, state) => {
	let cellContent;
	switch (state) {
		case 1:
			cellContent = '❌';
			break;
		case 2:
			cellContent = '✅';
			break;
		case 3:
			cellContent = '❓';
			break;
		case 4:
			cellContent = '✖️';
			break;
		default:
			cellContent = ' ';
			break;
	}

	target.textContent = cellContent;
};

const setState = (target, newState, stop) => {
	target.dataset.state = newState;
	removeStateClass(target);
	target.classList.add(`state${newState}`);

	writeCellContent(target, newState);

	if (!stop) {
		setCrosses(target);
	}
};

const checkForConflictingTick = (target) => {
	const box = target.closest('.box');
	const ticksInRow = box.querySelectorAll(
		`[data-row="${target.dataset.row}"][data-state="2"]`,
	);
	const ticksInCol = box.querySelectorAll(
		`[data-col="${target.dataset.col}"][data-state="2"]`,
	);
	if (ticksInRow.length > 0 || ticksInCol.length > 0) {
		return true;
	}
	return false;
};

const boxClick = (target) => {
	const targetState = Number.parseInt(target.dataset.state, 10);

	if (targetState === 1) {
		// red cross
		// only continue if there is no tick in row or column
		const isItFixed = checkForConflictingTick(target);
		if (isItFixed) {
			return false;
		}
	}

	if (targetState < 4) {
		let newState = targetState + 1;
		if (newState === 4) {
			newState = 0;
		}
		setState(target, newState);
	}
};

const buildLabels = (config) => {
	const theLabels = document.createElement('div');
	theLabels.classList.add('labels', `labels-size${config.size}`);
	theLabels.id = `labels${config.labelsDiv}`;

	if (['0', '2a', '3'].includes(config.labelsDiv.toString())) {
		theLabels.classList.add('labels-side');
	}
	console.log(`labels: ${config.group}`);

	const labelsGroup = document.createElement('div');
	labelsGroup.classList.add('group');
	labelsGroup.textContent = config.group;
	theLabels.append(labelsGroup);

	for (let itemNumber = 0; itemNumber < config.size; itemNumber++) {
		const labelsItem = document.createElement('div');
		labelsItem.classList.add('item', `item${itemNumber}`);
		labelsItem.textContent = config.items[itemNumber];
		theLabels.append(labelsItem);
	}

	return theLabels;
};

const buildGrid = (config) => {
	const theBox = document.createElement('div');
	theBox.classList.add('box', `box-size${config.size}`);
	theBox.id = `box${config.boxNumber}`;

	for (let rowNumber = 1; rowNumber <= config.size; rowNumber++) {
		for (let columnNumber = 1; columnNumber <= config.size; columnNumber++) {
			const cell = document.createElement('div');
			cell.classList.add('cell', 'state0');
			cell.dataset.state = '0';
			cell.dataset.row = rowNumber;
			cell.dataset.col = columnNumber;
			cell.dataset.rc = `${rowNumber}-${columnNumber}`;
			cell.style.gridRow = rowNumber;
			cell.style.gridColumn = columnNumber;
			cell.textContent = ' ';
			theBox.append(cell);
			cell.addEventListener('click', (event) => {
				boxClick(event.target);
			});
		}
	}

	return theBox;
};

const buildPuzzle = (uCats, uSize) => {
	const { labels, items } = currSettings;
	const wSize = uSize || currSettings.size;
	const wCats = uCats || currSettings.categories;
	const totalBoxes = (wCats - 2) * 3;
	const puzzleHolder = document.querySelector('#puzzle');
	puzzleHolder.dataset.cats = wCats;
	puzzleHolder.dataset.size = wSize;

	for (let boxNumber = 1; boxNumber <= totalBoxes; boxNumber++) {
		const config = {
			boxNumber,
			size: wSize,
		};

		const boxGrid = buildGrid(config);
		puzzleHolder.append(boxGrid);
	}

	for (let labelsDiv = 0; labelsDiv < wCats; labelsDiv++) {
		const config = {
			labelsDiv,
			size: wSize,
			group: labels[labelsDiv],
			items: items[labelsDiv],
		};

		const labelsBox = buildLabels(config);
		puzzleHolder.append(labelsBox);

		if (['2', '3'].includes(labelsDiv.toString())) {
			const newConfig = config;
			newConfig.labelsDiv = `${config.labelsDiv}a`;
			// console.log(newConfig);
			const labelsBox = buildLabels(newConfig);
			puzzleHolder.append(labelsBox);
		}
	}
};

const deletePuzzle = () => {
	document.querySelector('#puzzle').replaceChildren();
};

const writeSettingsLink = () => {
	const link = document.querySelector('#settingsLink');
	const dataParam = encodeURIComponent(JSON.stringify(currSettings));
	const currentHref = link.getAttribute('href');

	link.setAttribute('href', `${currentHref}/?data=${dataParam}`);
};

const clearPuzzle = () => {
	if (confirm('Are you sure you want to clear the puzzle?')) {
		deletePuzzle();
		buildPuzzle(currSettings.categories, currSettings.size);
	}
};

const init = () => {
	console.log('JS loaded');

	currSettings = getDataObjFromURL();

	console.log(currSettings);

	document.querySelector('#menu-trigger').addEventListener('click', (event) => {
		event.target.closest('nav').classList.toggle('open');
	});

	document.querySelector('#clearButton').addEventListener('click', clearPuzzle);

	buildPuzzle();
	writeSettingsLink();
};

window.addEventListener('load', init);
