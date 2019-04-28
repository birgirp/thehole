import React, { PureComponent } from 'react';
import { Button } from "semantic-ui-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import axios from "axios";
import Loading from "../../Loading/Loading";
import "./graph.css"

/*const data = [
    {
        name: 'Round 1', score: 16,
    },
    {
        name: 'Round 2', score: 12,
    },
    {
        name: 'Round 3', score: 7,
    },
    {
        name: 'Round 4', score: 2,
    },
    {
        name: 'Round 5', score: -2,
    }


];*/

export default class EclecticGraph extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: []
        }
    }



    //static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
    componentDidMount() {
        this.setState({ loading: true })
        axios.post("/api/geteclectictrend", {
            tourId: this.props.tourId,
            playerId: this.props.playerId
            
        }).then(response => {
            if (response.data.length === 0) {
                console.log("no eclectic scores found");
                this.setState({ loading: false })
            } else {
                let data = response.data
                this.setState({ data, loading: false })
            }

        })
            .catch(error => {
                console.log(error);
            });
    }


    handleCloseGraph = () => {
        this.props.closeModal();
    }

    render() {

        if (this.state.loading) {
            return (
                <Loading />
            )
        } else {
            return (
                <div id="x">
                    <LineChart
                        width={600}
                        height={210}
                        data={this.state.data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tour_round" />
                        <YAxis interval="preserveStartEnd"/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />

                    </LineChart>
                  
                    <Button primary onClick={this.handleCloseGraph}>Close</Button>
                </div>
            );
        }
    }
}
