// import React from "react";
// import ReactDOM from "react-dom";
// import './index.css';

// /*
// *
// * (OK) 1- Mostrar a localização de cada jogada no formato (col,row), para cada jogada no histórico.
// * (OK) 2- Estilizar com negrito o item da lista de jogadas que está selecionado no momento.
// * (OK) 3- Reescrever o componente Board para utilizar 2 loops para fazer os quadrados, em vez de deixá-los hardcoded.
// * 4- Adicionar um botão de toggle que lhe permita ordenar os jogadas em ordem ascendente ou descendente.
// * 5- Quando alguém ganhar, destaque os 3 quadrados que causaram a vitória.
// * 6- Quando ninguém ganhar, exiba uma mensagem informando que o resultado foi um empate.
// *
// */

// const dimension = 3;

// function Square(props) {

//     return (
//         <button
//             id={`r${props.rowID}c${props.cellID}`}
//             className={props.className}
//             onClick={props.onClick}>
//             {props.value}
//         </button>
//     );

// }

// class BoardRow extends React.Component {

//     renderSquare(indexX, indexY) {

//         return (
//             <Square
//                 key={indexY}
//                 rowID={indexX}
//                 cellID={indexY}
//                 className="square"
//                 value={this.props.squares[indexY]}
//                 onClick={() => {
//                     this.props.onClick(indexX, indexY);
//                 }}
//             />
//         );
//     }

//     render() {

//         let rowCells = [];

//         for (let indexY = 0; indexY < dimension; indexY++) {

//             rowCells.push(this.renderSquare(this.props.rowID, indexY));

//         }

//         return (
//             <div
//                 id={`r${this.props.rowID}`}
//                 className={this.props.className}>
//                 {/* <div
//                     id={`rt${this.props.rowID}`}
//                     className="square squareTitle">
//                     {this.props.rowID}
//                 </div> */}
//                 {rowCells}
//             </div>
//         );

//     }

// }

// class Board extends React.Component {

//     boardBuilder() {

//         let board = [];

//         let titles = [];

//         for (let indexX = 0; indexX < dimension; indexX++) {

//             titles.push(<div className="square">{indexX}</div>);

//             board.push(<BoardRow
//                 key={indexX}
//                 rowID={indexX}
//                 className='board-row'
//                 squares={this.props.squares[indexX]}
//                 onClick={(indexX, indexY) => this.props.onClick(indexX, indexY)} />);

//         }

//         return (
//             <>
//                 {board}
//             </>
//         );

//     }

//     render() {

//         return this.boardBuilder();

//     }

// }

// class Game extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             history: [{
//                 squares: Array(dimension).fill().map(() => {
//                     return Array(dimension).fill(null);
//                 }),
//                 player: null,
//                 lastMove: null,
//             }],
//             stepNumber: 0,
//             xIsNext: true,
//         };
//     }

//     getNext() {
//         return this.state.xIsNext ? 'X' : 'O';
//     }

//     handleClick(indexX, indexY) {

//         const history = this.state.history.slice(0, this.state.stepNumber + 1);
//         const current = history[history.length - 1];
//         const squares = structuredClone(current.squares);

//         if (this.calculateWinner(squares) || squares[indexX][indexY]) {
//             return;
//         }

//         squares[indexX][indexY] = this.getNext();

//         this.setState({
//             history: history.concat([
//                 {
//                     squares: squares,
//                     player: this.getNext(),
//                     lastMove: [indexX, indexY],
//                 }
//             ]),
//             stepNumber: history.length,
//             xIsNext: !this.state.xIsNext,
//         });

//     }

//     jumpTo(step) {
//         this.setState({
//             stepNumber: step,
//             xIsNext: (step % 2) === 0,
//         });
//     }

//     calculateWinner(squares) {
//         const lines = [
//             [[0, 0], [0, 1], [0, 2]],                 //     [0, 1, 2], (H)
//             [[1, 0], [1, 1], [1, 2]],                 //     [3, 4, 5], (H)
//             [[2, 0], [2, 1], [2, 2]],                 //     [6, 7, 8], (H)
//             [[0, 0], [1, 0], [2, 0]],                 //     [0, 3, 6], (V)
//             [[0, 1], [1, 1], [2, 1]],                 //     [1, 4, 7], (V)
//             [[0, 2], [1, 2], [2, 2]],                 //     [2, 5, 8], (V)
//             [[0, 0], [1, 1], [2, 2]],                 //     [0, 4, 8], (D)
//             [[0, 2], [1, 1], [2, 0]],                 //     [2, 4, 6], (D)
//         ];

//         for (let index = 0; index < lines.length; index++) {
//             const [a, b, c] = lines[index];
//             const [ax, ay] = a;
//             const [bx, by] = b;
//             const [cx, cy] = c;
//             if (squares[ax][ay] && squares[ax][ay] === squares[bx][by] && squares[ax][ay] === squares[cx][cy]) {
//                 return lines[index];
//             }
//         }

//         return null;
//     }   

//     render() {

//         const history = this.state.history;
//         const current = history[this.state.stepNumber];
//         const winner = this.calculateWinner(current.squares);

//         let status;
//         if (winner) {

//             console.log(`Winner: `, winner);

//             const winnerPlayer = current.squares[winner[0][0]][winner[0][1]];

//             console.log(`current.squares: `, current.squares);

//             status = `Winner: ${winnerPlayer}`;

//         } else {
//             status = `Next player: ${this.getNext()}`;
//         }

//         const moves = history.map((step, move) => {

//             let desc;
//             if (move) {
//                 desc = `Go to move #${move} (${step.lastMove})`;
//             } else {
//                 desc = `Go to game start`;
//             }

//             desc = this.state.stepNumber === move ? <b>{desc}</b> : desc;

//             return (
//                 <li key={move}>
//                     <button onClick={() => this.jumpTo(move)}>{desc}</button>
//                 </li>
//             );

//         });

//         return (
//             <div className="game">
//                 <div className="game-board">
//                     <Board
//                         squares={current.squares}
//                         onClick={(indexX, indexY) => this.handleClick(indexX, indexY)}
//                     />
//                 </div>
//                 <div className="game-info">
//                     <div>{status}</div>
//                     <ol>{moves}</ol>
//                 </div>
//             </div>
//         );
//     }
// }

// // =================================================

// ReactDOM.render(
//     <Game />,
//     document.getElementById('root')
// );


import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import { Game } from "./components/Game";

const dimension = 3;


/*
*
* (OK) 1- Mostrar a localização de cada jogada no formato (col,row), para cada jogada no histórico.
* (OK) 2- Estilizar com negrito o item da lista de jogadas que está selecionado no momento.
* (OK) 3- Reescrever o componente Board para utilizar 2 loops para fazer os quadrados, em vez de deixá-los hardcoded.
* 4- Adicionar um botão de toggle que lhe permita ordenar os jogadas em ordem ascendente ou descendente.
* 5- Quando alguém ganhar, destaque os 3 quadrados que causaram a vitória.
* 6- Quando ninguém ganhar, exiba uma mensagem informando que o resultado foi um empate.
*
*/

ReactDOM.render(
    <Game
        dimension={dimension}
    />,
    document.getElementById('root')
);