export const getNextInterval = (currentCycle: number): number => {
	if (currentCycle % 7 === 0 && currentCycle !== 0) return 15;
	return 5;
};
