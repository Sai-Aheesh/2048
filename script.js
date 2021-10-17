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
            all_squares[randomNum].innerHTML = 2
        } else generate()

    }

    //Move right
    function swipeRight() {
        for (let i =0; i<width*width; i++) {
            if (i%4 === 0) {  //checking if it belongs to first column
                row = []
                for (let j = 0; j<4; j++){
                    row.push(parseInt(all_squares[i+j].innerHTML))
                }
                console.log(row)

                let filterRow = row.filter(num => num)
                let missing = 4 - filterRow.length
                let zeroes = Array(missing).fill(0)
                let newRow = zeroes.concat(filterRow)
                console.log(newRow)

                for (let j = 0; j < 4; j++) {
                    all_squares[i+j].innerHTML = newRow[j]
                }
            }
        }

    }
    swipeRight()
})
