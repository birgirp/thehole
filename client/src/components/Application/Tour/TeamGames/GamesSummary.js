import React, { Component } from "react";
import { Button, Table, Icon, Dropdown, Modal } from "semantic-ui-react";
import axios from "axios";
import AddGame from "./AddGame";
import Loading from "../../../Loading/Loading";


//import "./tour.css";
class GamesSummary extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isAddingGame: false,
            hasGames: false,
            tourId: null,
            games: [],
            nameA: '',
            nameB: '',
            gameTypes: [],
            listedRounds: [],
            allRoundsListed: false

        }
    }



    componentDidMount() {
        // this.setState({ isLoading: true })
        const tourId = parseInt(this.props.tourId)
       
        let games = this.state.games

        axios.post("/api/getgametypes").then(response => {
            let gameTypes = response.data.map((game) =>  {return {key: game.id, value: game.id, text: game.name}})
            this.setState({gameTypes : gameTypes})
            return axios.post("/api/gettourteamnames", { tourId: tourId })
        }).then(res => {
            if (!res.data) {
                throw new Error('No team names found');
            } else {
                let nameA = res.data[0].name
                let nameB = res.data[1].name
                if (!parseInt(res.data[0].games) === 0) {  // no games have been registered in db

                 // axios.post('fetchteamgames')

                 // set listedRounds

                 // if all rounds listed...
                } 
                this.setState({ games: games, nameA: nameA, nameB: nameB });

            }
            

        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false })
        })

    }

    handleEditGame = (e) => {
        console.log(e)
    }





    handleAddGame = (e,v) => {
        this.setState({isAddingGame: true})
    }

    closeAddingGame = (game) => {

        this.setState({isAddingGame: false})
    }

    addGame = (game) => {
        let games = this.state.games
        games.push(game)
        games.sort((a,b) => (a.round > b.round) ? 1 : -1)
        this.setState({ games: games})
    }

 
    render() {
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            const games = this.state.games;
            const gameTypes = this.state.gameTypes
            return (
                <div>
                <Button primary onClick={this.handleAddGame}>Add Game</Button>
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
                                       {game.gameName}
                                    </Table.Cell>
                                    <Table.Cell >{game.pointsA}</Table.Cell>
                                    <Table.Cell >{game.pointsB}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>

                <Modal id="addingGameModal" size="fullscreen" open={this.state.isAddingGame} onClose={this.closeAddingGame}
                        closeOnDimmerClick={false}>
                        <Modal.Header>Add new Game</Modal.Header>
                        <Modal.Content >
                            
                            {<AddGame addGame={this.addGame} tourId={this.props.tourId} rounds={this.props.rounds} gameTypes={this.state.gameTypes} closeModal={this.closeAddingGame} />}

                            
                        </Modal.Content>
                    </Modal>

                </div>
            )
        }
    }
}

export default GamesSummary;