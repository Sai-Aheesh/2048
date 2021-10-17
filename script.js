console.log("Hello world!")

document.addEventListener("DOMContentLoaded", () =>{
    const griddisplay = document.querySelector('.grid')
    const score = document.getElementById('score-num')
    const result = document.getElementById('result')
    const width = 4
    all_squares = []

    function board() {
        for (let i=0; i<width*width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            griddisplay.appendChild(square)
            all_squares.push(square)
        }
    }
    board()
})
