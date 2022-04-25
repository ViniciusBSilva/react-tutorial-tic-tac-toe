// function Square(props) {

// class Square extends React.Component {
//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={() => {
//                     this.props.onClick();
//                 }}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

//     return (
//         <button
//             id={`r${props.rowID}c${props.cellID}`}
//             className={props.className}
//             onClick={props.onClick}>
//             {props.value}
//         </button>
//     );

// }

import React from "react";

export class Square extends React.Component {

    render() {
        return (
            <button
                id={`r${this.props.rowID}c${this.props.cellID}`}
                className={this.props.className}
                onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }

}