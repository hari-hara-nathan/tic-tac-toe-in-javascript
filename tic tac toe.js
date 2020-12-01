let EMPTY = '&nbsp;',
    moves,
    score,
    identifier = 1,
    N_size = 3,
    boxes = [],
    game_still_going = true,
    div = document.getElementById('turn');

function init() {
    let container = document.getElementById('tictactoe')
    let board = document.createElement('table');

    for (let i = 0; i < N_size; i++) {
        let row = document.createElement('tr')
        for (let j = 0; j < N_size; j++) {
            let cell = document.createElement('td');
            cell.classList.add('row' + i, 'col' + j)
            if (i == j) {
                cell.classList.add('diagonal0')
            }
            if (j == N_size - i - 1) {
                cell.classList.add('diagonal1')
            }
            cell.addEventListener('click', listener)
            row.appendChild(cell)
            boxes.push(cell)
        }
        board.appendChild(row);
    }
    container.appendChild(board);
    startGame()
}

function startGame() {
    score = {
        'X': 0,
        'O': 0
    }
    turn = 'X';
    moves = 0;
    game_still_going = true
    boxes.forEach(function(square) {
        square.innerHTML = EMPTY
    });
}

function wins(clicked) {
    let elements = clicked.className.split(/\s+/);
    for (let i = 0; i < elements.length; i++) {
        testClass = '#tictactoe ' + '.' + elements[i];
        items = contains(testClass, turn);
        if (items.length == N_size) {
            return true;
        }
    }
    return false;
}

function contains(selector, text) {
    elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element) {
        return RegExp(text).test(element.textContent)
    })
}

function restart() {
    startGame();
    div.innerHTML = `<h3>${turn}'s turn</h3>`;
}

function listener() {
    if (game_still_going) {
        if (this.innerHTML != EMPTY) { return; }
        this.innerHTML = turn;
        moves += 1;
        code = `<h2>content</h2>
        <button onclick="restart()">restart</restart>`

        if (wins(this)) {
            game_still_going = false;
            let content = `${turn} won the match`
            div.innerHTML = code.replace('content', content);
        } else
        if (moves == 9) {
            let content = 'match draw'
            div.innerHTML = code.replace('content', content);
        } else {
            turn = turn == 'X' ? 'O' : 'X';
            div.innerHTML = `<h3>${turn}'s turn</h3>`;
        }
    }
}


init();