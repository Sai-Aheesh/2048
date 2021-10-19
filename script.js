document.addEventListener("DOMContentLoaded", () =>{
    const grid = document.querySelector('.grid')
    const score = document.getElementById('score-num')
    const result = document.getElementById('result')
    const width = 4
    let all_squares = []
    let scoreNum = 0

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
            else all_squares[randomNum].innerHTML = width


        } else generate()

    }

    //Move right
    function swipeRight() {
        for (let i =0; i<width*width; i++) {
            //checking if it belongs to first column
            if (i%width === 0) {
                row = []
                // Creating an array row and pushing all values of respective row into them
                for (let j = 0; j<width; j++){
                    row.push(parseInt(all_squares[i+j].innerHTML))
                }

                let filterRow = row.filter(num => num)
                let missing = width - filterRow.length
                // Based on the number of missing zeroes, we add them on the left of filterRow
                let zeroes = Array(missing).fill(0)
                let newRow = zeroes.concat(filterRow)

                for (let j = 0; j < width; j++) {
                    all_squares[i+j].innerHTML = newRow[j]
                }
            }
        }

    }

    //Move left
    function swipeLeft() {
        for (let i = 0; i < width * width; i++) {
            //checking if it belongs to first column
            if (i % width === 0) {
                row = []
                // Creating an array row and pushing all values of respective row into them
                for (let j = 0; j < width; j++) {
                    row.push(parseInt(all_squares[i + j].innerHTML))
                }

                //filters the row from all zeroes and extracts only non-zero numbers
                let filterRow = row.filter(num => num)
                let missing = width - filterRow.length
                // Based on the number of missing zeroes, we add them on the right of filterRow
                let zeroes = Array(missing).fill(0)
                let newRow = filterRow.concat(zeroes)

                for (let j = 0; j < width; j++) {
                    all_squares[i + j].innerHTML = newRow[j]
                }
            }
        }

    }

    function combineSameElementsRow() {
        for (let i =0; i<width*width-1; i++) {
            if(i%width==width-1) {continue}
            if(all_squares[i].innerHTML == all_squares[i+1].innerHTML){
                let total = parseInt(all_squares[i].innerHTML) + parseInt(all_squares[i+1].innerHTML)
                all_squares[i].innerHTML = total
                all_squares[i+1].innerHTML = 0
                scoreNum += total
                score.innerHTML = scoreNum
            }
        }
        checkfor2048()
    }

    document.addEventListener('keyup', controls)

    function keyRight() {
        swipeRight()
        combineSameElementsRow()
        swipeRight()
        generate()
    }

    function keyLeft() {
        swipeLeft()
        combineSameElementsRow()
        swipeLeft()
        generate()
    }


    //Move down
    function swipeDown() {
        for (let i = 0; i < width; i ++) {
            col = []
            for (let j = 0; j < width; j++) {
                col.push(parseInt(all_squares[i+ (width*j)].innerHTML))
            }

            let filterCol = col.filter(num => num)
            let missing = width - filterCol.length
            let zeroes = Array(missing).fill(0)
            let newCol = zeroes.concat(filterCol)

            for (let j = 0; j < width; j++) {
                all_squares[i +(width*j)].innerHTML = newCol[j]
            }

        }
    }


    //Move up
    function swipeUp() {
        for (let i = 0; i < width; i++) {
            col = []
            for (let j = 0; j < width; j++) {
                col.push(parseInt(all_squares[i + (width * j)].innerHTML))
            }

            let filterCol = col.filter(num => num)
            let missing = width - filterCol.length
            let zeroes = Array(missing).fill(0)
            let newCol = filterCol.concat(zeroes)

            for (let j = 0; j < width; j++) {
                all_squares[i + (width * j)].innerHTML = newCol[j]
            }

        }

    }

    function combineSameElementsCol() {
        for (let i = 0; i < width*(width-1); i++) {
            if (all_squares[i].innerHTML === all_squares[i + width].innerHTML) {
                let total = parseInt(all_squares[i].innerHTML) + parseInt(all_squares[i + width].innerHTML)
                all_squares[i].innerHTML = total
                all_squares[i + width].innerHTML = 0
                scoreNum += total
                score.innerHTML = scoreNum
            }
        }
        checkfor2048()
    }

    function keyDown() {
        swipeDown()
        combineSameElementsCol()
        swipeDown()
        generate()
    }

    function keyUp() {
        swipeUp()
        combineSameElementsCol()
        swipeUp()
        generate()

    }

    //assigning keys
    function controls(e) {
        //If pressed key is right arrow
        if (e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
        } else if(e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 40) {
            keyDown()
        }
    }



    // Check for 2048 in the squares
    function checkfor2048() {
        for (let i =0; i < all_squares.length; i++) {
            if (all_squares[i].innerHTML == 2048){
                result.innerHTML = 'You Win!'
                document.removeEventListener('keyup', controls)
            }
        }

    }

    //Check if you lost
    function checkforLoss() {
        let count = 0
        for (let i = 0; i<all_squares.length; i++){
            if (all_squares[i].innerHTML == 0) {
                count++
            }
        }

        if (count === 0) {
            result.innerHTML = 'You Lose'
            document.removeEventListener('keyup', controls)
        }
    }
})

