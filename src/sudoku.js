import { boxSize, gridSize } from '/Utilities.js';
import { sudokuGenerator, findEmpty } from '/SudokuGenerator.js';

export class Sudoku {
	constructor() {
		this.grid = sudokuGenerator();
	}

	hasEmptyCells() {
		return Boolean(findEmpty(this.grid));
	}
}
