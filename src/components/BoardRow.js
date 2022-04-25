import React from "react";
import { Square } from "./Square";

export class BoardRow extends React.Component {

    renderSquare(indexX, indexY) {

        return (
            <Square
                key={indexY}
                rowID={indexX}
                cellID={indexY}
                className="square"
                value={this.props.squares[indexY]}
                onClick={() => {
                    this.props.onClick(indexX, indexY);
                }}
            />
        );
    }

    render() {

        let rowCells = [];

        for (let indexY = 0; indexY < this.props.dimension; indexY++) {

            rowCells.push(this.renderSquare(this.props.rowID, indexY));

        }

        return (
            <div
                id={`r${this.props.rowID}`}
                className={this.props.className}>
                {/* <div
                    id={`rt${this.props.rowID}`}
                    className="square squareTitle">
                    {this.props.rowID}
                </div> */}
                {rowCells}
            </div>
        );

    }

}