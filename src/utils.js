const threeMonthInMs = 7.884e+9;
const twoMonthInMs = 5.256e+9;
const oneMonthInMs = 2.628e+9;

export function getStartDateForSimilarWeb (now) {
  const endDate = new Date(now.valueOf() - twoMonthInMs);
  return `${endDate.getFullYear()}-${endDate.getMonth()}`;
}

export function getEndDateForSimilarWeb (now) {
  const endDate = new Date(now.valueOf()/*  - oneMonthInMs */);
  return `${endDate.getFullYear()}-${endDate.getMonth()}`;
}