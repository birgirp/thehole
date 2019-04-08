import React, { Component } from "react";
//import { Tab, Form, Input, Dropdown } from "semantic-ui-react";
import axios from "axios";
import Loading from "../../Loading/Loading";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class TourEclectic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            isNoData: "",
            eclecticScores: [],
            players: [],
            courses: [],
            isLoading: false,

            columnDefs: [
                { headerName: "Player", field: "player", width: 140},
                { headerName: "1", field: "h1", width: 40 },
                { headerName: "2", field: "h2", width: 40 },
                { headerName: "3", field: "h3", width: 40 },
                { headerName: "4", field: "h4", width: 40 },
                { headerName: "5", field: "h5", width: 40 },
                { headerName: "6", field: "h6", width: 40 },
                { headerName: "7", field: "h7", width: 40 },
                { headerName: "8", field: "h8", width: 40 },
                { headerName: "9", field: "h9", width: 40 },
                { headerName: "10", field: "h10", width: 40 },
                { headerName: "11", field: "h11", width: 40 },
                { headerName: "12", field: "h12", width: 40 },
                { headerName: "13", field: "h13", width: 40 },
                { headerName: "14", field: "h14", width: 40 },
                { headerName: "15", field: "h15", width: 40 },
                { headerName: "16", field: "h16", width: 40 },
                { headerName: "17", field: "h17", width: 40 },
                { headerName: "18", field: "h18", width: 40 },
                { headerName: "Sum", field: "sum", width: 40 }
            ],
            rowData: [],
            defaultColDef: {
                resizable: false,
                editable: false
                , width: 70,
                suppressMovable: true
            }
        }
    }

    componentDidMount() {

        this.setState({ isLoading: true })
        axios.post("/api/geteclectic", { tourId: this.props.tourId })
            .then(res => {
                if (!res.data) {
                    this.setState({ isNoData: true })
                    throw new Error('No data found');
                }
                let eclecticScores = res.data
                this.setState({ eclecticScores: eclecticScores }, () => this.populateGrid())
                this.setState({ isLoading: false })

            }).catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })

    }

    populateGrid = () => {
        let rowData = []
        let eclecticScores = this.state.eclecticScores
                 console.log(eclecticScores);
        let p = eclecticScores.length / 18
       // console.log(p)
        var key
        var i
        var s
        var k = 0
        for (i = 0; i < p; i++) {
            let sum = 0
            let full_name = eclecticScores[k].full_name
           
            let row = { player: full_name, sum: 0 }
            for (s = 0; s < 18; s++) {

              let item = eclecticScores[k + s]
                key = 'h' + item.hole
                row[key] = item.eclectic
                sum = sum + parseInt(item.eclectic)
           // console.log("key " + key)
           // console.log("item.eclectic " + item.eclectic)

            }
            row.sum = sum;
            rowData.push(row)
            k = k + 18
        }
        console.log(rowData)

        this.setState({rowData: rowData})


    }




    render() {


        if (this.state.isLoading) {
            return (<Loading />)
        } else {

            return (
                <div>
                    <h1> Eclectic </h1>
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

export default TourEclectic;