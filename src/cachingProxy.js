const createCheckSudokuProxy = (fn, maxSize) => {
	const cache = new Map();
	return function (grid) {
		const key = JSON.stringify(grid);
		if (cache.has(key)) {
			const value = cache.get(key);
			cache.delete(key);
			cache.set(key, value);
			console.log('Результат повернено з кешу');
			return value;
		} else console.log('Сітки у кеші не знайдено');
		const result = fn(grid);
		cache.set(key, result);
		if (cache.size > maxSize) {
			const oldestKey = cache.keys().next().value;
			cache.delete(oldestKey);
		}
		return result;
	};
};

module.exports = createCheckSudokuProxy;
