import { Sudoku } from '/sudoku.js';
import { gridSize, boxSize } from '/Utilities.js';
import { convertIndexToPosition, convertPositionToIndex } from '/Utilities.js';

const sudoku = new Sudoku();
let cells = document.querySelectorAll('.cell');
let selectedCellIndex;
let selectedCell;

const init = () => {
	fillCells();
	initCellsEvents();
	initNumbers();
	initDeleter();
};

const fillCells = () => {
	for (let i = 0; i < gridSize * gridSize; i++) {
		const { row, column } = convertIndexToPosition(i);
		if (sudoku.grid[row][column] !== null) {
			cells[i].classList.add('filled');
			cells[i].innerHTML = sudoku.grid[row][column];
		}
	}
};

const initCellsEvents = () => {
	cells.forEach((cell, index) => {
		cell.addEventListener('click', () => onCellClick(cell, index));
	});
};

const onCellClick = (clickedCell, index) => {
	cells.forEach((cell) => cell.classList.remove('selected', 'highlighted'));
	if (clickedCell.classList.contains('filled')) {
		selectedCellIndex = null;
		selectedCell = null;
	} else {
		selectedCellIndex = index;
		selectedCell = clickedCell;
		clickedCell.classList.add('selected');
		highlightCellBy(index);
	}
	if (clickedCell.innerHTML === '') return;
	cells.forEach((cell) => {
		if (cell.innerHTML === clickedCell.innerHTML) cell.classList.add('selected');
	});
};

const highlightCellBy = (index) => {
	highlightColumnBy(index);
	highlightRowBy(index);
	highlightBoxBy(index);
};

const highlightColumnBy = (index) => {
	const column = index % gridSize;
	for (let row = 0; row < gridSize; row++) {
		const cellIndex = convertPositionToIndex(row, column);
		cells[cellIndex].classList.add('highlighted');
	}
};

const highlightRowBy = (index) => {
	const row = Math.floor(index / gridSize);
	for (let column = 0; column < gridSize; column++) {
		const cellIndex = convertPositionToIndex(row, column);
		cells[cellIndex].classList.add('highlighted');
	}
};

const highlightBoxBy = (index) => {
	const row = Math.floor(index / gridSize);
	const column = index % gridSize;
	const firstRowInBox = row - (row % boxSize);
	const firstColumnInBox = column - (column % boxSize);
	for (let iRow = firstRowInBox; iRow < firstRowInBox + boxSize; iRow++) {
		for (let iColumn = firstColumnInBox; iColumn < firstColumnInBox + boxSize; iColumn++) {
			const cellIndex = convertPositionToIndex(iRow, iColumn);
			cells[cellIndex].classList.add('highlighted');
		}
	}
};

const initNumbers = () => {
	const numbers = document.querySelectorAll('.number');
	numbers.forEach((number) => {
		number.addEventListener('click', () => onNumberClick(parseInt(number.innerHTML)));
	});
};

const onNumberClick = (number) => {
	if (!selectedCell) return;
	if (selectedCell.classList.contains('filled')) return;
	setValueInSelectedCell(number);
};

const setValueInSelectedCell = (value) => {
	const { row, column } = convertIndexToPosition(selectedCellIndex);
	sudoku.grid[row][column] = value;
	selectedCell.innerHTML = value;
};

const initDeleter = () => {
	const remover = document.querySelector('.delete');
	remover.addEventListener('click', () => onDeleteClick());
};

const onDeleteClick = () => {
	if (!selectedCell) return;
	if (selectedCell.classList.contains('filled')) return;
	const { row, column } = convertIndexToPosition(selectedCellIndex);
	selectedCell.innerHTML = '';
	sudoku.grid[row][column] = null;
};

init();

const sendSudoku = async () => {
	const currentGrid = sudoku.grid;
	const response = await fetch('/check', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ currentGrid }),
	});

	const data = await response.json();
	window.location.href = data.redirect;
};

document.getElementById('checkButton').addEventListener('click', () => {
	if (!sudoku.hasEmptyCells()) sendSudoku();
	else alert('Заповніть усі клітинки судоку перед перевіркою');
});
