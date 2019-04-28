import React, { PureComponent } from 'react';
import { Button } from "semantic-ui-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import axios from "axios";
import Loading from "../../Loading/Loading";
import "./graph.css"

const COLORS = ['#FF6633', '#FFB399', '#FF33FF', '#4D8000', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

export default class EclecticGraph extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            columns: []
        }
    }



    //static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
    componentDidMount() {
        // this.setState({ loading: true })
        axios.post("/api/geteclecticbars", {
            tourId: this.props.tourId,
        }).then(response => {
            if (response.data.length === 0) {
                console.log("no eclectic scores found");
                //    this.setState({ loading: false })
            } else {
                let data = response.data
                console.log(data)
                this.createChartData(data)
                //   this.setState({ data, loading: false })
            }

        })
            .catch(error => {
                console.log(error);
            });
    }

    createChartData = (data) => {
        let max = Math.max(...data.map(function (o) { return o.tour_round; }))

        let arrdata = data.map((val, index, arr) => { return [val.tour_round, val.full_name, val.score] });

        let pivotTable = this.getPivotArray(arrdata, 0, 1, 2)

        let newArr = []
        let r = pivotTable[0].length
        for (var i = 1; i < pivotTable.length; i++) {
            let o = {}
            for (var s = 0; s < r; s++) {
                if(!pivotTable[i][s] && i !== 1){
                o[pivotTable[0][s]] = pivotTable[i-1][s]
                }else{
                o[pivotTable[0][s]] = pivotTable[i][s]
                }
            }
            newArr.push(o)
        }

        pivotTable[0].shift()
        let columns = pivotTable[0]
        console.log(pivotTable[0])

        this.setState({ data: newArr, columns: columns })
    }


    getPivotArray = (dataArray, rowIndex, colIndex, dataIndex) => {
        //Code from https://techbrij.com
        var result = {}, ret = [];
        var newCols = [];
        for (var i = 0; i < dataArray.length; i++) {

            if (!result[dataArray[i][rowIndex]]) {
                result[dataArray[i][rowIndex]] = {};
            }
            result[dataArray[i][rowIndex]][dataArray[i][colIndex]] = dataArray[i][dataIndex];

            //To get column names
            if (newCols.indexOf(dataArray[i][colIndex]) === -1) {
                newCols.push(dataArray[i][colIndex]);
            }
        }

        newCols.sort();
        var item = [];

        //Add Header Row
        item.push('Round');
        item.push.apply(item, newCols);
        ret.push(item);

        //Add content 
        for (var key in result) {
            item = [];
            item.push(key);
            for (var s = 0; s < newCols.length; s++) {
                item.push(result[key][newCols[s]] || "");
            }
            ret.push(item);
        }
        return ret;
    }


    handleCloseGraph = () => {
        this.props.closeModal();
    }

    render() {

        //   <Bar dataKey="pv" fill="#8884d8" />
        //   <Bar dataKey="uv" fill="#82ca9d" />

        if (this.state.loading) {
            return (
                <Loading />
            )
        } else {

            let data = this.state.data
            let columns = this.state.columns
            console.log(columns[1])
            console.log("kjj " + columns.length)
            let bars = []

            for (var i = 0; i < columns.length; i++) {
                console.log(i)
                bars.push(<Bar dataKey={columns[i]} fill={COLORS[i]} key={columns[i]} />)
            }
            console.log(bars)
            return (
                <div id="x">
                    <BarChart
                        width={600}
                        height={220}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Round" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {bars}
                    </BarChart>

                    <Button primary onClick={this.handleCloseGraph}>Close</Button>
                </div>
            );
        }
    }
}
