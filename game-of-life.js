// empty (outer) array
let initialArray = [];
//generating outer array or "rows" - y axis
for (let y = 0; y < 20; y++) {
	initialArray[y] = [];
	//generating inner array or "columns"  - x axis
	for (let x = 0; x < 20; x++) {
		//randomly assigning 0 or 1, where 0 is dead and 1 is alive
		initialArray[y][x] = Math.round(Math.random());
	}
}

//function for checking alive neighbours
const neighboursCheck = (row, col) => {
	let neighbours = 0;

	const topRow = initialArray[row - 1];
	const bottomRow = initialArray[row + 1];

	//top left position
	if (topRow && topRow[col - 1] === 1) {
		neighbours++;
	}
	//top  position
	if (topRow && topRow[col] === 1) {
		neighbours++;
	}
	//top right  position
	if (topRow && topRow[col + 1] === 1) {
		neighbours++;
	}
	//current left position
	if (initialArray[row][col - 1] === 1) {
		neighbours++;
	}
	//current right position
	if (initialArray[row][col + 1] === 1) {
		neighbours++;
	}
	//bottom left position
	if (bottomRow && bottomRow[col - 1] === 1) {
		neighbours++;
	}
	//bottom  position
	if (bottomRow && bottomRow[col] === 1) {
		neighbours++;
	}
	//bottom right position
	if (bottomRow && bottomRow[col + 1] === 1) {
		neighbours++;
	}

	return neighbours;
};

//game start function
const gameStart = () => {
	//cloning the first initial array in to a new one
	const clone = JSON.parse(JSON.stringify(initialArray));
	//itterating through rows - y axis
	for (let y = 0; y < 20; y++) {
		//itterating through the columns - x axis
		for (let x = 0; x < 20; x++) {
			let neighboursCount = neighboursCheck(y, x);
			//Below I am checking which cells go to the next array
			//Any live cell with fewer than two lives neighbours dies, as if by underpopulation (does not go to new array)
			if (initialArray[y][x] === 1 && neighboursCount < 2) {
				clone[y][x] = 0;
			}
			//Any live cell with two or three live neighbours lives on to the next generation / (does go to new array)
			if (initialArray[y][x] === 1 && (neighboursCount === 2 || neighboursCount === 3)) {
				clone[y][x] = 1;
			}
			//Any live cell with more than three live neighoubrs dies, as if by overpopulation / (does not go to new array)
			if (initialArray[y][x] === 1 && neighboursCount > 3) {
				clone[y][x] = 0;
			}
			//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction / (does go to new array)
			if (initialArray[y][x] === 0 && neighboursCount === 3) {
				clone[y][x] = 1;
			}
		}
	}

	//assigning new array to the initial array
	initialArray = JSON.parse(JSON.stringify(clone));
	//returning new updated version of array
	return clone;
};

//interval function that runs the game
setInterval(() => {
	document.body.innerHTML = JSON.stringify(gameStart());
}, 200);
