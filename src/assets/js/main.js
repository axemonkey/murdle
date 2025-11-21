import { settings } from './modules/settings.js';

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
			theBox.append(cell);
			cell.addEventListener('click', (event) => {
				boxClick(event.target);
			});
		}
	}

	return theBox;
};

const buildPuzzle = () => {
	const { labels, items } = settings;
	const totalBoxes = (settings.categories - 2) * 3;
	const puzzleHolder = document.querySelector('#puzzle');

	for (let boxNumber = 1; boxNumber <= totalBoxes; boxNumber++) {
		const config = {
			boxNumber,
			size: settings.size,
			// label0: labels[0],
			// items0: items[0],
			// label1: labels[1],
			// items1: items[1],
		};

		const boxGrid = buildGrid(config);

		puzzleHolder.append(boxGrid);
	}
};

const init = () => {
	console.log('JS loaded');

	buildPuzzle();
};

window.addEventListener('load', init);
