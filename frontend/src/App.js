import react, { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  
  const [size, setSize] = useState(10);
  const [board, setBoard] = useState(Array.from({length: size},()=> Array.from({length: size}, () => 1)));
  const [bombTotal, setBombTotal] = useState(10);
  
  
  useEffect(() => {
    initializeBoard()
    addBombs();
    
  }, [])
  class Cell {
    constructor() {
      this.isClicked = false;
      this.isBomb = false;
      this.bombsNear = 0;
      this.mask = "_";
    }
    getIsBomb() {
      return this.isBomb
    }
    
    setIsBomb(v) {
      this.isBomb = v;
    }

    handleClick() {
      this.isClicked = true;
      if (this.isBomb) {
        this.mask = '💣';
      } else {
        this.mask = this.bombsNear;
      }
    }
  }
  
  function initializeBoard() {
    let tempboard=[...board];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      tempboard[i][j] = new Cell(false, false, 0);
    }
  }
  setBoard(tempboard);
}
  
  function addBombs() {
    let counter = bombTotal;
    let tempboards = [...board];
    for (let i = 0; i < 100; i++) {
      for (let j in counter) {
  tempboards[i][j].setIsBomb(true);
    }
  }
  setBoard(tempboards)
  console.log(board)
  }
  
  
  return (
    <>
    <div id='boardgrid'>
{board.map((row) => {
  
  return row.map((cell, ind) => {
return <div key={ind} id='cell' onClick={() =>{cell.handleClick()}}>{cell.mask}</div>
})
})}



</div>
    </>
  );
}

export default App;
