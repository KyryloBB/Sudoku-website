const gridSize = 9;
const boxSize = 3;

const checkSudoku = (grid) => {
	for (let row = 0; row < gridSize; row++) {
		for (let column = 0; column < gridSize; column++) {
			const value = grid[row][column];
			if (!validate(grid, row, column, value)) return false;
		}
	}
	return true;
};

const validate = (grid, row, column, value) => {
	return (
		validateColumn(grid, row, column, value) &&
		validateRow(grid, row, column, value) &&
		validateBox(grid, row, column, value)
	);
};

const validateColumn = (grid, row, column, value) => {
	for (let iRow = 0; iRow < gridSize; iRow++) {
		if (grid[iRow][column] === value && iRow !== row) return false;
	}
	return true;
};

const validateRow = (grid, row, column, value) => {
	for (let iColumn = 0; iColumn < gridSize; iColumn++) {
		if (grid[row][iColumn] === value && iColumn !== column) return false;
	}
	return true;
};

const validateBox = (grid, row, column, value) => {
	const firstRowInBox = row - (row % boxSize);
	const firstColumnInBox = column - (column % boxSize);
	for (let iRow = firstRowInBox; iRow < firstRowInBox + boxSize; iRow++) {
		for (let iColumn = firstColumnInBox; iColumn < firstColumnInBox + boxSize; iColumn++) {
			if (grid[iRow][iColumn] === value && iRow !== row && iColumn !== column) return false;
		}
	}
	return true;
};

module.exports = checkSudoku;
