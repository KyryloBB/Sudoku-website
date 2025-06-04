import { gridSize } from './Utilities.js';

export const sudokuGenerator = () => {
	const sudoku = createEmptyGrid();
	console.table(sudoku);
};

const createEmptyGrid = () => {
	return new Array(gridSize).fill().map(() => new Array(gridSize).fill(null));
};
