export const resolveMonthYear = (month?: string, year?: string) => {
	const now = new Date();

	return {
		m: month !== undefined ? Number(month) : now.getMonth(),
		y: year !== undefined ? Number(year) : now.getFullYear(),
	};
};
