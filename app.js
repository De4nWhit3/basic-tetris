document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector("#score");
    const startBtn = document.querySelector("#start-button");
    const width = 10;

    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ];

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ];

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ];

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ];

    const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;

    // randomly select random tetromino
    function getRandomTetromino(){
        return Math.floor(Math.random() * theTetrominos.length);
    }

    let random = getRandomTetromino();
    
    let current = theTetrominos[random][currentRotation];

    // draw first rotation of the tetromino
    function draw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.add("tetromino");
        });
    }

    // undraw the tetromino
    function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("tetromino");
        });
    }

    // make tetromino move down
    timerId = setInterval(moveDown, 1000);

    function control(e){
        if(e.keyCode === 37){
            moveLeft();
        }else if(e.keyCode === 38){
            rotate();
        }else if(e.keyCode === 39){
            moveRight();
        }else if(e.keyCode === 40){
            moveDown();
        }
    }

    document.addEventListener("keydown", control);

    function freeze(){
        if(current.some(index => squares[currentPosition + index + width].classList.contains("taken"))){
            current.forEach(index => squares[currentPosition + index].classList.add("taken"));
            // start a new tetromino falling
            random = getRandomTetromino();
            current = theTetrominos[random][currentRotation];
            currentPosition = 4;
            draw();
        }
    }

    // move down function
    function moveDown(){
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function moveLeft(){
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
    
        if(!isAtLeftEdge){
            currentPosition -= 1;
        }

        if(current.some(index => squares[currentPosition + index].classList.contains("taken"))){
            currentPosition += 1;
        }

        draw();
    }

    // move tetromino right
    function moveRight(){
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

        if(!isAtRightEdge){
            currentPosition += 1;
        }

        if(current.some(index => squares[currentPosition + index].classList.contains("taken"))){
            currentPosition -= 1;
        }

        draw();
    }

    // rotate tetromino when up is pressed
    function rotate(){
        undraw();
        currentRotation++;

        if(currentRotation === current.length){
            currentRotation = 0;
        }

        current = theTetrominos[random][currentRotation];
        draw();
    }
})

