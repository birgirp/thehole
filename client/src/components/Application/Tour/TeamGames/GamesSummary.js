import React, { Component } from "react";
import { Table, Icon, Dropdown } from "semantic-ui-react";
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
            gameTypes: []
          //  gameTypes: [{ key: 1, value: 1, text: "Skins" },
          //  { key: 2, value: 2, text: "Stableford" },
          //  { key: 3, value: 3, text: "Matchplay" }]
        }
    }



    componentDidMount() {
        // this.setState({ isLoading: true })
        const tourId = parseInt(this.props.tourId)
        const rounds = this.props.rounds
        let games = this.state.games

        axios.post("/api/getgametypes").then(response => {
            console.log(response)

            let gameTypes = response.data.map((game) =>  {return {key: game.id, value: game.id, text: game.name}})
            this.setState({gameTypes : gameTypes})
            return axios.post("/api/gettourteamnames", { tourId: tourId })
        }).then(res => {
            if (!res.data) {
                throw new Error('No team names found');
            } else {
                let nameA = res.data[0].name
                let nameB = res.data[1].name
                if (parseInt(res.data[0].games) === 0) {  // no games have been registered in db
                    for (let i = 1; i < rounds + 1; i++) {
                        let obj = { "tourId": tourId ,"round": i, "status": "open", "pointsA": 0, "pointsB": 0 };
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

    handleEditGame = (e) => {
        console.log(e)
    }

    handleGameChange = (e, v) => {
        let games = this.state.games
        let game = games[v.index]
        game.game = v.value

        let isNew = game.id ? false : true

        if(isNew){
            axios.post('/api/addteamgame', { tourId: game.tourId, round: game.round, game: game.game}).then(res => {
                console.log(res.data)
                game.id = parseInt(res.data[0].id)
            })
        }
        this.setState({ games: games }, () => console.log(this.state.games))
    }

 
    render() {
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            const games = this.state.games;
            const gameTypes = this.state.gameTypes
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
                        {games.map((game, index) => {
                            return (
                                <Table.Row key={game.round}>
                                    <Table.Cell ><Icon name='edit' link onClick={() => this.handleEditGame(game)} ></Icon></Table.Cell>
                                    <Table.Cell >{game.round}</Table.Cell>
                                    <Table.Cell >
                                        <Dropdown
                                            index={index}
                                            fluid
                                            selection
                                            placeholder='Select game'
                                            options={gameTypes}
                                            onChange={this.handleGameChange}
                                            disabled={false}
                                        />
                                    </Table.Cell>
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