import React, { Component } from "react";

export class ScoreCellRenderer extends Component {

    render() {
      
        let rowname = this.props.data.rowname
        if(rowname==="Score"){
            console.log(this.props)
            return (
                 <label>{this.props.value}</label>
                // <span>{this.props.value}</span>
            )
        }else{

        return (
          //  <input type="number">{this.props.value}</input>
            <span>{this.props.value}</span>
        )
        }
    }
}
