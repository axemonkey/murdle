import { defaults } from './settings.js';

const getParam = (param) => {
	const q = document.location.search;
	if (q) {
		const p = new URLSearchParams(q);
		if (p) {
			const d = p.get(param);
			if (d) {
				const j = JSON.parse(d);
				console.log('woop');
				console.log(j);
				return j;
			}
		}
	}
	return false;
};

const getDataObjFromURL = () => {
	const data = getParam('data');
	let dataObj;

	if (!data.categories || !data.size) {
		dataObj = structuredClone(defaults);
	} else {
		dataObj = data;
	}

	return dataObj;
};

export { getDataObjFromURL };
