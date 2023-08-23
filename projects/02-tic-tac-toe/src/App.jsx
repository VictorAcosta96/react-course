import { useState } from 'react';
import './App.css'
import confetti from 'canvas-confetti';

const TURNS = {
  X: '✖️',
  O: '⭕'
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]  
]

const Square = ({children, updateBoard , index , isSelected}) => {

  const className = ` square ${isSelected ? 'is-selected' : ''}  `

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      <span>{children}</span>
    </div>
  )
}

function App() {
  // Estado para inicializar el tablero
  const [board, setBoard] = useState(Array(9).fill(null));

  // Estado para saber quien tiene el turno
  const [turn, setTurn] = useState(TURNS.X)

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
      for (const combo of WINNER_COMBOS) {
        const [a,b,c] = combo
          if (
            boardToCheck[a] && 
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
          ) {
            return boardToCheck[a]
          }
      }
      // si no hay ganador
      return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
      // revisamos si hay un empate
      // si no hay mas espacios vacios en el tablero
      // newBoard inicialmente es esto -> [null,null,null,null,null,null,null,null,null]
      // a medida que vamos jugando se van rellenando los espacios y si se llenen todos significa que hay un empate
      return newBoard.every(square => square !== null)
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
      const newWinner = checkWinner(newBoard)
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

      {/* seccion para saber quien ha ganado */}
      {winner !== null && (
        <section className='winner'>
            <div className="text">
              <h2>{winner === false ? 'Empate' : 'Ganó'}</h2>
            

            <header className='win'>
                {winner && <Square> {winner} </Square>}
            </header>

            <footer>
               <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
            </div>
        </section>
      )
      }
  </main>
 )
}

export default App
