import React, { Component } from "react";
//import { Tab, Form, Input, Dropdown } from "semantic-ui-react";
import axios from "axios";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Loading from "../../Loading/Loading";

class TourSummary extends Component {


    constructor(props) {
        super(props);
        this.state = {

            loading: false,
            columnDefs: [ ],
            rowData: [ ],
            scoreData: [],
            defaultColDef: {
                resizable: false,
                editable: this.checkEditFunction
                , width: 70,
                suppressMovable: true
            }


        }
    }


    checkEditFunction = (params) => {

        //params.node - for row identity
        //params.column - for column identity
        console.log(params.column);
        return false
    }

    
    createRowData = () => {
        let rounds = this.props.rounds;
        let players = this.props.players;
        let scoreData = this.state.scoreData
        let rowData = [];
        players.forEach(element => {
            let row = { player: element.full_name }
            let sum = 0;
            var key
            var z
            for (z = 1; z < rounds + 1; z++) {
                key = 'r' + z
                row[key] = ""
            }
            row['eclectic'] = ""
         

            let p_id = element.player_id

            scoreData.forEach(item =>{
                if(item.player_id === p_id){
                    var key2 = 'r' + item.tour_round
                    row[key2] = item.points
                    sum = sum + parseInt(item.points)
                }

            })
            row['sum'] = sum

            rowData.push(row)
        });

        this.setState({ rowData:rowData })


    }
    
    
    
    
    
    componentDidMount() {
        let tourId = this.props.tourId;
        let rounds = this.props.rounds;
        this.setState({isLoading: true})



        let columnDefs = [{ headerName: "Player", field: "player",  width: 180 }]
        var i;
        for (i = 1; i < rounds + 1; i++) {
            let col = { headerName: "Round" + i, field: "r" + i, width: 80 }
            columnDefs.push(col)
        }
        let eclcol = {headerName: "Eclectic", field: "eclectic", width:80}
        columnDefs.push(eclcol)
        let sumcol = {headerName: "Sum", field: "sum", width:80}
        columnDefs.push(sumcol)
        
        this.setState({ columnDefs:columnDefs })
      
        axios.post("/api/gettourscorecards", { tourId: tourId })
            .then(res => {
                if (!res.data) {
                    throw new Error('No scorecards found');
                }
           
                this.setState({ scoreData: res.data , isLoading: false }, () => this.createRowData());
                this.setState({isLoading: false})
            })
            .catch(err => {
                console.log(err);
                this.setState({isLoading: false})
            })

          


    }





    render() {

        //console.log(this.state)
        if (this.state.isLoading) {
            return (<Loading />)
        } else {

            return (
                <div>
                    <h1> Tour Summary </h1>
                    <br />
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.state.rowData}
                        enterMovesDownAfterEdit={false}
                        enterMovesDown={false}>
                    </AgGridReact>
                    <br />


                </div>
            )
        }
    }
}

export default TourSummary;