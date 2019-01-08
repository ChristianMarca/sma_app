const margin = { top: 20, right: 35, bottom: 20, left: 20 };
const width =
	window.innerWidth / 2.5 - margin.left - margin.right ||
	document.documentElement.clientWidth / 2.5 - margin.left - margin.right ||
	document.body.clientWidth / 2.5 - margin.left - margin.right;
export const setup = {
	dataRangeMin: 0,
	dataRangeMax: 100,
	barSeparation: 0.05,
	transitionDelay: 750,

	margin,
	width,
	height: 250 - margin.top - margin.bottom
};
