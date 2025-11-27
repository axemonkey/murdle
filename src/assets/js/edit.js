import { constants } from './modules/settings.js';
import { getDataObjFromURL } from './modules/tools.js';

let locals = undefined;

/*

TODO:
* validate form (no empty text fields)
* probably a help button
* "load example" button that loads the defaults

*/

const populateForm = () => {
	// console.log(locals);
	const numCats = locals.categories;
	const numItems = locals.size;

	document.querySelector('#numCategories').value = numCats;
	document.querySelector('#numItems').value = numItems;

	for (let wCat = 0; wCat < constants.MAX_CATS; wCat++) {
		const wLabel = document.querySelector(`[for="category-${wCat}"]`);
		const wInput = document.querySelector(`#category-${wCat}`);
		const wSection = document.querySelector(`[data-items="items-${wCat}"]`);

		wInput.value = locals.labels[wCat];
		wSection.querySelector('p').textContent = locals.labels[wCat];

		if (wCat < numCats) {
			wLabel.classList.remove('hide');
			wInput.classList.remove('hide');
			wSection.classList.remove('hide');
		} else {
			wLabel.classList.add('hide');
			wInput.classList.add('hide');
			wInput.value = '';
			wSection.classList.add('hide');
		}

		for (let wItem = 0; wItem < constants.MAX_SIZE; wItem++) {
			const wItemLabel = document.querySelector(
				`[for="category-${wCat}-item-${wItem}"]`,
			);
			const wItemInput = document.querySelector(
				`#category-${wCat}-item-${wItem}`,
			);

			wItemInput.value = '';
			if (locals.items[wCat] && locals.items[wCat][wItem]) {
				wItemInput.value = locals.items[wCat][wItem];
			}

			if (wItem < numItems) {
				wItemLabel.classList.remove('hide');
				wItemInput.classList.remove('hide');
			} else {
				wItemLabel.classList.add('hide');
				wItemInput.classList.add('hide');
				wItemInput.value = '';
			}
		}
	}

	parseForm();
};

const parseForm = () => {
	console.log('parseForm');

	const data = {
		labels: [],
		items: [],
	};
	data.categories = document.querySelector('#numCategories').value;
	data.size = document.querySelector('#numItems').value;

	// const labelInputs = document.querySelectorAll(`[id^="category"]`);
	const labelInputs = document.querySelectorAll('#categoriesFieldset input');
	// labelInputs.forEach((labelInput) => {
	// 	data.labels.push(labelInput.value);

	// });

	for (let labelIndex = 0; labelIndex < labelInputs.length; labelIndex++) {
		const wLabel = labelInputs[labelIndex];
		data.labels.push(wLabel.value);
		const itemsLabel = document.querySelector(
			`[data-items="items-${labelIndex}"] > p`,
		);
		itemsLabel.textContent = wLabel.value;
	}

	for (let wCat = 0; wCat < data.categories; wCat++) {
		const itemValues = [];
		const itemInputs = document.querySelectorAll(
			`[data-items="items-${wCat}"] input`,
		);
		itemInputs.forEach((itemInput) => {
			itemValues.push(itemInput.value);
		});
		data.items.push(itemValues);
	}

	console.log(data);

	const saveLink = document.querySelector('#saveLink');
	// const dataParam = JSON.stringify(data);
	const dataParam = encodeURIComponent(JSON.stringify(data));
	console.log(dataParam);
	saveLink.setAttribute('href', `/?data=${dataParam}`);
};

const setupFormEvents = () => {
	const inputs = document.querySelectorAll('[type="text"]');
	const selects = document.querySelectorAll('select');

	inputs.forEach((input) => {
		input.addEventListener('change', parseForm);
	});
	selects.forEach((select) => {
		select.addEventListener('change', (event) => {
			const element = event.target;
			const field = element.dataset.field;
			console.log(field);
			locals[field] = element.value;
			populateForm();
		});
	});
};

const init = () => {
	console.log('JS loaded');

	const dataObj = getDataObjFromURL();
	locals = dataObj;

	populateForm();
	setupFormEvents();
};

window.addEventListener('load', init);
