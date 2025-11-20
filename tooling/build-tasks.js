import {
	processImagesFunction,
} from './build-functions.js';

async function processImages(siteRoot) {
	const options = {
		source: `${siteRoot}/assets/images`,
		destination: `${siteRoot}/public/images`,
	};

	await processImagesFunction(options);
}

export {
	processImages,
};
