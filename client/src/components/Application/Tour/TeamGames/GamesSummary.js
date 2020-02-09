import React, { Component } from "react";
import { Button, Modal, Table, Icon } from "semantic-ui-react";
import axios from "axios";
import Loading from "../../../Loading/Loading";


//import "./tour.css";
class GamesSummary extends Component {


    constructor(props) {
        super(props);
        this.state = {
            hasGames: false,
            tourId: null,
            games: [],
            nameA: '',
            nameB: '',
        }
    }



    componentDidMount() {
        // this.setState({ isLoading: true })
        const tourId = this.props.tourId
        const rounds = this.props.rounds
        let games = this.state.games

        axios.post("/api/gettourteamnames", { tourId: tourId })
            .then(res => {
                if (!res.data) {
                    throw new Error('No team names found');
                } else {

                    console.log(res.data)
                    let nameA = res.data[0].name
                    let nameB = res.data[1].name
                    if (parseInt(res.data[0].games) === 0) {
                        for (let i = 1; i < rounds + 1; i++) {
                            let obj = { "round": i, "status": "open", "pointsA": 0, "pointsB": 0 };
                            games.push(obj);
                        }

                    } else {
                        //games = res.data
                        //
                    }

                    this.setState({ games: games, nameA: nameA, nameB: nameB });

                }
                this.setState({ games: games });

            }).catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })

    }

    handleEditGame = () => {

    }




    render() {
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            const games = this.state.games;
            return (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width='1'>Edit</Table.HeaderCell>
                            <Table.HeaderCell width='1'>Round</Table.HeaderCell>
                            <Table.HeaderCell width='3'>Game</Table.HeaderCell>
                            <Table.HeaderCell width='2'>{this.state.nameA}</Table.HeaderCell>
                            <Table.HeaderCell width='2'>{this.state.nameB} </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {games.map((game) => {
                            return (
                                <Table.Row key={game.round}>
                                    <Table.Cell ><Icon name='edit' link onClick={() => this.handleEditTour(game)} ></Icon></Table.Cell>
                                    <Table.Cell >{game.round}</Table.Cell>
                                    <Table.Cell >{game.game || ''}</Table.Cell>
                                    <Table.Cell >{game.pointsA}</Table.Cell>
                                    <Table.Cell >{game.pointsB}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            )
        }
    }
}

export default GamesSummary;