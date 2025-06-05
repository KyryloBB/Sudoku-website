import { boxSize, gridSize } from '/Utilities.js';
import { sudokuGenerator, findEmpty } from '/SudokuGenerator.js';

export class Sudoku {
	constructor() {
		this.grid = sudokuGenerator();
	}

	getDuplicatePositions(row, column, value) {
		const duplicatePositionsInColumn = this.getDuplicatePositionsInColumn(row, column, value);
		const duplicatePositionsInRow = this.getDuplicatePositionsInRow(row, column, value);
		const duplicatePositionsInBox = this.getDuplicatePositionsInBox(row, column, value);
		const duplicates = [...duplicatePositionsInColumn, ...duplicatePositionsInRow];
		for (const value of duplicatePositionsInBox) {
			if (value.row !== row && value.column !== column) {
				duplicates.push(value);
			}
		}
		return duplicates;
	}

	getDuplicatePositionsInColumn(row, column, value) {
		const duplicates = [];
		for (let iRow = 0; iRow < gridSize; iRow++) {
			if (this.grid[iRow][column] === value && iRow !== row) {
				duplicates.push({ row: iRow, column });
			}
		}
		return duplicates;
	}

	getDuplicatePositionsInRow(row, column, value) {
		const duplicates = [];
		for (let iColumn = 0; iColumn < gridSize; iColumn++) {
			if (this.grid[row][iColumn] === value && iColumn !== column) {
				duplicates.push({ row, column: iColumn });
			}
		}
		return duplicates;
	}

	getDuplicatePositionsInBox(row, column, value) {
		const duplicates = [];
		const firstRowInBox = row - (row % boxSize);
		const firstColumnInBox = column - (column % boxSize);
		for (let iRow = firstRowInBox; iRow < firstRowInBox + boxSize; iRow++) {
			for (let iColumn = firstColumnInBox; iColumn < firstColumnInBox + boxSize; iColumn++) {
				if (this.grid[iRow][iColumn] === value && iRow !== row && iColumn !== column) {
					duplicates.push({ row: iRow, column: iColumn });
				}
			}
		}
		return duplicates;
	}

	hasEmptyCells() {
		return Boolean(findEmpty(this.grid));
	}
}
