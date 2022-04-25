import React from "react";
import { BoardRow } from "./BoardRow";

export class Board extends React.Component {

    boardBuilder() {

        let board = [];

        let titles = [];

        for (let indexX = 0; indexX < this.props.dimension; indexX++) {

            titles.push(<div className="square">{indexX}</div>);

            board.push(<BoardRow
                key={indexX}
                rowID={indexX}
                className='board-row'
                squares={this.props.squares[indexX]}
                onClick={(indexX, indexY) => this.props.onClick(indexX, indexY)} 
                dimension={this.props.dimension}
                />);

        }

        return (
            <>
                {board}
            </>
        );

    }

    render() {

        return this.boardBuilder();

    }

}