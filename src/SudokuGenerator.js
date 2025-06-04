import { gridSize } from './Utilities.js';

export const sudokuGenerator = () => {
	const sudoku = createEmptyGrid();
	resolveSudoku(grid);
};

const createEmptyGrid = () => {
	return new Array(gridSize).fill().map(() => new Array(gridSize).fill(null));
};

const resolveSudoku = (grid) => {
	const emptyCell = findEmpty(grid);
	if (!emptyCell) return true;

	const numbers = getRandomNumbers();

	for (let i = 0; i < numbers.length; i++) {
		if (!validate(grid, emptyCell.row, emptyCell.column, numbers[i])) continue;
		grid[emptyCell.row][emptyCell.column] = numbers[i];
		if (resolveSudoku(grid)) return true;
		grid[emptyCell.row][emptyCell.column] = null;
	}
};

const findEmpty = (grid) => {
	for (let row = 0; row < gridSize; row++) {
		for (let column = 0; column < gridSize; column++) {
			if (grid[row][column] === null) return { row, column };
		}
	}
	return null;
};

const getRandomNumbers = () => {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	for (let i = numbers.length - 1; i >= 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
	}
	return numbers;
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

console.log('Hi');
