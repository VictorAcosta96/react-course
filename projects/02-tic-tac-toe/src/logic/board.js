import { WINNER_COMBOS } from "../constants"


export const checkWinnerFrom = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no hay mas espacios vacios en el tablero
    // newBoard inicialmente es esto -> [null,null,null,null,null,null,null,null,null]
    // a medida que vamos jugando se van rellenando los espacios y si se llenen todos significa que hay un empate
    return newBoard.every(square => square !== null)
}