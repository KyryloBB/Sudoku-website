export const gridSize = 9;
export const boxSize = 3;

export const convertIndexToPosition = (index) => {
	return {
		row: Math.floor(index / gridSize),
		column: index % gridSize,
	};
};

export const convertPositionToIndex = (row, column) => {
	return row * gridSize + column;
};
