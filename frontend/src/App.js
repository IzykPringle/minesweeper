import react, { useState, useEffect } from 'react';
import './App.css';

function App() {


  const [size, setSize] = useState(10);
  const [board, setBoard] = useState(Array.from({ length: size }, () => Array.from({ length: size }, () => 1)));
  const [bombTotal, setBombTotal] = useState(20);


  useEffect(() => {
    initializeBoard();
    addBombs();

  }, [])
  class Cell {
    constructor(row, column) {
      this.isClicked = false;
      this.isBomb = false;
      this.bombsNear = 0;
      this.mask = "_";
      this.row = row;
      this.column = column;
    }
    getIsBomb() {
      return this.isBomb
    }

    setIsBomb(v) {
      this.isBomb = v;
    }

    getBombsNear() {
      return this.bombsNear;
    }

    setBombsNear() {
      this.bombsNear++;
    }

    handleClick() {
      let tempboard = [...board];
      this.isClicked = true;
      if (this.isBomb) {
        this.mask = '💣';
        alert("game over");
        window.location.reload();
      } else {
        this.mask = this.bombsNear;
        if (tempboard[this.row + 1] !== undefined && tempboard[this.row + 1].bombsNear == 0) {
          tempboard[this.row + 1][this.column].handleClick();
        }
        if (tempboard[this.row - 1] !== undefined && tempboard[this.row - 1].bombsNear == 0) {
          tempboard[this.row - 1][this.column].handleClick();
        }
        if (tempboard[this.row][this.column - 1] !== undefined && tempboard[this.row][this.column - 1].bombsNear == 0) {
          tempboard[this.row][this.column - 1].handleClick();
        }
        if (tempboard[this.row][this.column + 1] !== undefined && tempboard[this.row][this.column + 1].bombsNear == 0) {
          tempboard[this.row][this.column + 1].handleClick();
        }
      }
      tempboard[this.row][this.column] = this;
      setBoard(tempboard);
    }
  }

  function initializeBoard() {
    let tempboard = [...board];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        tempboard[i][j] = new Cell(i, j);
      }
    }
    setBoard(tempboard);
    console.log(board);
  }

  function addBombs() {
    let tempboard = [...board];
    let count = 0;

    while (count < bombTotal) {
      let randx = Math.floor(Math.random() * size);
      let randy = Math.floor(Math.random() * size)
      tempboard[randx][randy].setIsBomb(true);
      if (tempboard[randx + 1] !== undefined) {
        tempboard[randx + 1][randy].setBombsNear();
      }
      if (tempboard[randx - 1] !== undefined) {
        tempboard[randx - 1][randy].setBombsNear();
      }
      if (tempboard[randx][randy - 1] !== undefined) {
        tempboard[randx][randy - 1].setBombsNear();
      }
      if (tempboard[randx][randy + 1] !== undefined) {
        tempboard[randx][randy + 1].setBombsNear();
      }
    
      
      count++;
    }

    setBoard(tempboard);
  }



  return (
    <>
      <div id='boardgrid'>
        {board.map((row) => {

          return row.map((cell, ind) => {
            return <div key={ind} id='cell' onClick={() => { cell.handleClick() }}>{cell.mask}</div>
          })
        })}



      </div>
    </>
  );
}

export default App;
