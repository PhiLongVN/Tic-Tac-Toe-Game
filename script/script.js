const cells = document.querySelectorAll('.cell');
let turnPlay = true;
let currentPlayer;
const xPlayer = '<i class="fa-solid fa-x"></i>';
const oPlayer = '<i class="fa-solid fa-o"></i>';

cells.forEach((cell) => {
  cell.addEventListener('click', handleCell);
});

const winner = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/* ============================================ */
/*                   HIEN CHU                   */
/* ============================================ */

function handleCell(e) {
  let cellTarget = e.target;

  if (turnPlay) {
    cellTarget.innerHTML = xPlayer;
    cellTarget.style.pointerEvents = 'none';
    turnPlay = false;

    currentPlayer = 'X';
    cellTarget.dataset.name = currentPlayer;
  } else {
    cellTarget.innerHTML = oPlayer;
    cellTarget.style.pointerEvents = 'none';
    turnPlay = true;

    currentPlayer = 'O';
    cellTarget.dataset.name = currentPlayer;
  }

  checkWin();
}

/* ============================================ */
/*                     CHECK                    */
/* ============================================ */
function checkWin() {
  if (checkWinner()) {
    resultText.innerText = `${currentPlayer} WIN`;
    result.style.display = 'flex';
    block.style.pointerEvents = 'none';
    hilight();
  } else if (checkDraw()) {
    resultText.innerText = 'Draw';
    result.style.display = 'flex';
    block.style.pointerEvents = 'none';
  }
}

function checkWinner() {
  return winner.some((key) => {
    return key.every((index) => {
      return cells[index].dataset.name == currentPlayer;
    });
  });
}

function checkDraw() {
  return [...cells].every((index) => {
    return index.innerHTML == xPlayer || index.innerHTML == oPlayer;
  });
}


/* ============================================ */
/*                    HILIGHT                   */
/* ============================================ */
function hilight() {
  winner.forEach((key) => {
    let a = key.every((index) => {
      return cells[index].dataset.name == currentPlayer;
    });

    if (a) {
      key.forEach((index) => {
        cells[index].style.background = 'yellow';
      });
    }
  });
}

const result = document.querySelector('.nodi');
const resultText = document.querySelector('.nodi span');
const block = document.querySelector('.block');

/* ============================================ */
/*                     RESET                    */
/* ============================================ */
const reset = document.querySelector('.title button');

reset.addEventListener('click', () => {
  cells.forEach((key) => {
    key.style.background = 'white';
    key.innerHTML = '';
    result.style.display = 'none';
    key.style.pointerEvents = 'all';
    key.dataset.name = '';
  });
});
