import { gridSize } from './Utilities.js';
import { validate } from './SudokuGenerator.js';

const checkSudoku = (grid) => {
	for (let row = 0; row < gridSize; row++) {
		for (let column = 0; column < gridSize; column++) {
			const value = grid[row][column];
			if (!validate(grid, row, column, value)) return false;
		}
	}
	return true;
};
