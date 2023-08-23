import { useState } from 'react';
import './App.css'
import confetti from 'canvas-confetti';

import { Square } from './components/Square.jsx';

import {  TURNS } from './constants';
import { checkWinnerFrom, checkEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModal.jsx';

function App() {
  // Estado para inicializar el tablero
  const [board, setBoard] = useState(Array(9).fill(null));

  // Estado para saber quien tiene el turno
  const [turn, setTurn] = useState(TURNS.X)

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  
  const updateBoard = (index) => {
      // no actualizamos esta posicion si ya tiene un valor(x u o) o si hay un ganador
      if(board[index] || winner) return

      // actualizar el board con el turn del jugador
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)

      //actualizando el turno del jugador --> x u o
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)

      // revisamos si hay un ganador
      const newWinner = checkWinnerFrom(newBoard)
      if (newWinner) {
        confetti()
        setWinner(newWinner)
      }else if (checkEndGame(newBoard)) {
        setWinner(false)
      }
  }

 return (
  <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className='game'>
          {
            board.map((square,index)=> {
              return (
                <Square 
                  key={index} 
                  index={index}
                  updateBoard={updateBoard}
                  >
                   {square}
                </Square>

              )
            })
          }
      </section>

      {/* seccion para mostrar a quien le toca el turno */}
      <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}/>
  </main>
 )
}

export default App
