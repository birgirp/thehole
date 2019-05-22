import React, { Component } from "react";
//import { Tab, Form, Input, Dropdown } from "semantic-ui-react";
import axios from "axios";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Loading from "../../Loading/Loading";
import { Checkbox } from "semantic-ui-react";

class TourSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rankingCompetion:true,
            loading: false,
            columnDefs: [],
            rowData: [],
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
            overlayNoRowsTemplate: "<span> </span>",
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




    componentDidMount() {

        let tourId = this.props.tourId;
        let rounds = this.props.rounds;
        this.setState({ isLoading: true })
        let columnDefs = [{ headerName: "Player", field: "player", width: 100 ,  pinned: "left"}]
        let sumcol = { headerName: "Sum", field: "sum", width: 80,  sort: "desc" }
        columnDefs.push(sumcol)

        var i;
        for (i = 1; i < rounds + 1; i++) {
            let col = { headerName: "Round" + i, field: "r" + i, width: 80 }
            columnDefs.push(col)
        }

        let parscol = { headerName: "Pars", field: "pars", width: 80 }
        columnDefs.push(parscol)

        let birdiescol = { headerName: "Birdies", field: "birdies", width: 80 }
        columnDefs.push(birdiescol)

        let eaglescol = { headerName: "Eagles", field: "eagles", width: 80 }
        columnDefs.push(eaglescol)


        this.setState({ columnDefs: columnDefs })

        axios.post("/api/gettourscorecards", { tourId: tourId })
            .then(res => {
                if (!res.data) {
                    throw new Error('No scorecards found');
                }

                this.setState({ scoreData: res.data }, () => this.createRowData());
              //  this.setState({ isLoading: false })
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })
    }


    createRowData = () => {
        let rounds = this.props.rounds;
      //  console.log(rounds)

        let players = this.props.players;
       // console.log(players)

        let scoreData = this.state.scoreData
        //console.log(scoreData)
        let rowData = [];
        players.forEach(element => {
            let row = {player_id:element.player_id, player: element.full_name }
            let sum = 0;
            var key

            var z
            for (z = 1; z < rounds + 1; z++) {
                key = 'r' + z
                row[key] = ""
            }
            let p_id = element.player_id

            scoreData.forEach(item => {
                if (item.player_id === p_id) {
                    var key2 = 'r' + item.tour_round
                    row[key2] = item.points
                    sum = sum + parseInt(item.points)
                }

            })
            row['sum'] = sum

            rowData.push(row)
        });

        this.setState({ rowData: rowData } )
        this.fetchPars()

    }

    createRowData2 = () => {


    }

    
    fetchPars = () => {
          let tourId = this.props.tourId;
        axios.post("/api/getpars", { tourId: tourId })
        .then(res => {
            if (!res.data) {
                throw new Error('No pars found');
            }
            let parData = res.data
            console.log("hg")
            console.log(parData)
       
            let rowData =this.state.rowData

            parData.forEach(item =>{
                let index = rowData.findIndex(x => x.player_id ===item.player_id);
                rowData[index]["pars"] = item.pars
                rowData[index]["birdies"] = item.birdies
                rowData[index]["eagles"] = item.eagles
                //console.log(index)

            })

            this.setState({rowData: rowData, isLoading: false })
        })
        .catch(err => {
            console.log(err);
            this.setState({ isLoading: false })
        })

    }

    toggleCheckbox = (e, v) =>{
        console.log(v.checked)
        console.log(this.state.rowData)
    }


    render() {

        //console.log(this.state)
        if (this.state.isLoading) {
            return (<Loading />)
        } else {

            return (
                <div>
                    <h1> Tour Summary </h1>
                  
                    <Checkbox  
                    label="Ranking Competition"
                    onChange ={this.toggleCheckbox}
                    >
  
                    </Checkbox>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.state.rowData}
                        enterMovesDownAfterEdit={false}
                        enterMovesDown={false}
                        overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                        overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}>
                    </AgGridReact>
                    <br />


                </div>
            )
        }
    }
}

export default TourSummary;