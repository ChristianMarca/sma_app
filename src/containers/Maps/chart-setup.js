const margin = {top: 20, right: 40, bottom: 30, left: 20};
// const width = 960 - margin.left - margin.right;
const width=window.innerWidth/1.5 - margin.left - margin.right
 || document.documentElement.clientWidth/1.5 - margin.left - margin.right
 || document.body.clientWidth/1.5 - margin.left - margin.right;
export const setup = {
  // width: window.innerWidth/2.3
  // || document.documentElement.clientWidth/2.3
  // || document.body.clientWidth/2.3,
  // height: 200,
   dataRangeMin: 0,
   dataRangeMax: 50,
  barSeparation: 0.05,
   transitionDelay: 750,

  margin,
  width,
  height : 500 - margin.top - margin.bottom,
  // barWidth : Math.floor(width / 19) - 1,
}
