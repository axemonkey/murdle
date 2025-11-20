import {
	logger,
	imagesBannerBranding,
} from './build-logger.js';
import {processImages} from './build-tasks.js';
import {getTimeItTook} from './build-functions.js';

const siteRoot = 'src';
const start = Date.now();

processImages(siteRoot)
	.then(() => {
		logger.banner(`Build complete in ${getTimeItTook(start)}`, imagesBannerBranding);
	})
	.catch(error => {
		logger.failure(error);
	});
