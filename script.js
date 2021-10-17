console.log("Hello world!")

document.addEventListener("DOMContentLoaded", () =>{
    const grid = document.querySelector('.grid')
    const score = document.getElementById('score-num')
    const result = document.getElementById('result')
    const width = 4
    all_squares = []

    function board() {
        for (let i=0; i<width*width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            grid.appendChild(square)
            all_squares.push(square)
        }
        generate()
        generate()
    }
    board()

    //generating random numbers
    function generate() {
        let randomNum = Math.floor(Math.random() * all_squares.length)
        if (all_squares[randomNum].innerHTML == 0) {
            rand = Math.floor(Math.random()*2)
            if (rand == 0){
                all_squares[randomNum].innerHTML = 2
            }
            else all_squares[randomNum].innerHTML = 4

        } else generate()

    }

    //Move right
    function swipeRight() {
        for (let i =0; i<width*width; i++) {
            //checking if it belongs to first column
            if (i%4 === 0) {
                row = []
                // Creating an array row and pushing all values of respective row into them
                for (let j = 0; j<4; j++){
                    row.push(parseInt(all_squares[i+j].innerHTML))
                }

                let filterRow = row.filter(num => num)
                let missing = 4 - filterRow.length
                // Based on the number of missing zeroes, we add them on the left of filterRow
                let zeroes = Array(missing).fill(0)
                let newRow = zeroes.concat(filterRow)

                for (let j = 0; j < 4; j++) {
                    all_squares[i+j].innerHTML = newRow[j]
                }
            }
        }

    }

    //Move left
    function swipeLeft() {
        for (let i = 0; i < width * width; i++) {
            //checking if it belongs to first column
            if (i % 4 === 0) {
                row = []
                // Creating an array row and pushing all values of respective row into them
                for (let j = 0; j < 4; j++) {
                    row.push(parseInt(all_squares[i + j].innerHTML))
                }

                //filters the row from all zeroes and extracts only non-zero numbers
                let filterRow = row.filter(num => num)
                let missing = 4 - filterRow.length
                // Based on the number of missing zeroes, we add them on the right of filterRow
                let zeroes = Array(missing).fill(0)
                let newRow = filterRow.concat(zeroes)

                for (let j = 0; j < 4; j++) {
                    all_squares[i + j].innerHTML = newRow[j]
                }
            }
        }

    }

    function combineSameElements() {
        for (let i =0; i<15; i++) {
            if(all_squares[i].innerHTML === all_squares[i+1].innerHTML){
                let total = parseInt(all_squares[i].innerHTML) + parseInt(all_squares[i+1].innerHTML)
                all_squares[i].innerHTML = total
                all_squares[i+1].innerHTML = 0
            }
        }
    }

    //assigning keys
    function  controls(e) {
        //If pressed key is right arrow
        if(e.keyCode === 39){
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
        }
    }

    document.addEventListener('keyup', controls)

    function keyRight() {
        swipeRight()
        combineSameElements()
        swipeRight()
        generate()
    }

    function keyLeft() {
        swipeLeft()
        combineSameElements()
        swipeLeft()
        generate()
    }
})
