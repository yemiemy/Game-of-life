function make2DArray (rows, cols) {
    let arr = new Array(rows)
    for (let i = 0; i < arr.length; i++){
        arr[i] = new Array(cols)
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;

function setup () {
    createCanvas(600,400)
    cols = width / resolution
    rows = height / resolution
    grid = make2DArray(rows, cols)
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            grid[i][j] = Math.round(Math.random())
        }
    }
}

function draw(){
    background(0);

    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            let x = i*resolution
            let y = j * resolution

            if (grid[i][j] == 1) {
                fill(255)
                rect(x, y, resolution, resolution)
            }
        }
    }

    
    let next = make2DArray(rows, cols)
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            let neighbours = countNeighbours(grid, i, j)

            let state = grid[i][j]
            if (state == 0 && neighbours == 3){
                next[i][j] = 1
            }else if( state == 1 && (neighbours < 2 || neighbours > 3)){
                next[i][j] = 0;
            } else{
                next[i][j] = state
            }
        }
    }

    grid = next;
}

function countNeighbours(grid, x, y){
    let sum = 0;
    for(let i = -1; i < 2; i++){
        for (let j = -1; j < 2; j++){
            let row = (x + i + rows) % rows
            let col = (y + j + cols) % cols
            sum+=grid[row][col]
        }
    }
    return sum
}