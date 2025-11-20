import fs from 'fs';
import path from 'path';
import {optimize} from 'svgo';
import sharp from 'sharp';

import {
	logger,
	em,
	imagesBannerBranding,
} from './build-logger.js';

/**
 * Gets the time it took from given start date.
 *
 * @param {Object} start - Reference Start date.
 */
function getTimeItTook(start) {
	const stop = Date.now();
	return `${em(`${(stop - start) / 1000}s`)}`;
}

async function processImagesFunction(options) {
	logger.banner('Processing images', imagesBannerBranding);
	const start = Date.now();

	async function processSvg(svgFile) {
		logger.info(`doing a SVG innit`);

		const filePath = `${options.source}/${svgFile}`;
		const destinationFile = `${options.destination}/${svgFile}`;
		const svgFileContent = fs.readFileSync(filePath, 'utf8');

		const result = optimize(svgFileContent);
		const optimizedSvgFileContent = result.data;

		logger.step(`SVG from ${em(path.basename(filePath))} optimised with SVGO`);
		fs.writeFileSync(destinationFile, optimizedSvgFileContent);
		// logger.step(`SVG saved to ${em(destinationFile)}`);

		logger.step(`${em(destinationFile)} successfully created\n`);
	}

	async function processImage(imageFile) {
		const filePath = `${options.source}/${imageFile}`;
		const destinationFile = `${options.destination}/${imageFile}`;

		await sharp(filePath)
			.toFile(destinationFile)
			.then(() => {
				logger.step(`Image ${em(destinationFile)} optimised with Sharp`);

				logger.step(`${em(destinationFile)} successfully created\n`);
			})
			.catch(error => {
				logger.warning(error);
			});
	}

	if (fs.existsSync(options.source)) {
		const imageFiles = fs
			.readdirSync(options.source)
			.filter(file => {
				const supportedExtensions = ['png', 'jpg', 'jpeg', 'svg', 'ico', 'gif', 'avif', 'webp'];
				for (const extension of supportedExtensions) {
					if (path.extname(file).toLowerCase() === `.${extension}`) {
						return true;
					}
				}

				if (fs.statSync(`${options.source}/${file}`).isDirectory()) {
					logger.info(`${file} is a directory`);
					processImagesFunction({
						source: `${options.source}/${file}`,
						destination: `${options.destination}/${file}`,
					});
				}
				return false;
			});

		logger.info(`Found ${imageFiles.length} image(s) to process\n`);

		if (imageFiles.length > 0) {
			// make images folder
			fs.mkdirSync(options.destination, {recursive: true});

			for (const imageFile of imageFiles) {
				const filePath = `${options.source}/${imageFile}`;
				const fileExtension = path.extname(imageFile).toLowerCase();

				if (['.ico'].includes(fileExtension)) {
					// just copy it
					if (fs.statSync(filePath).isFile()) {
						const destinationFile = `${options.destination}/${imageFile}`;
						fs.copyFileSync(filePath, destinationFile);

						logger.step(`${em(destinationFile)} successfully created\n`);
					}
				} else if (fileExtension === '.svg') {
					// do svgo
					await processSvg(imageFile);
				} else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(fileExtension)) {
					// do sharp
					await processImage(imageFile);
				}
			}
		}
	}
	logger.success(`Image processing task completed in ${getTimeItTook(start)}`);
}

export {
	processImagesFunction,
	getTimeItTook,
};
