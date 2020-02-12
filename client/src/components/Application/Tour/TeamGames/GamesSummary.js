import React, { Component } from "react";
import { Button, Table, Icon,  Modal } from "semantic-ui-react";
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
                console.log(res.data[0].games)
                if (parseInt(res.data[0].games) > 0) {  // no games have been registered in db
                    console.log("fetching games...")
                   //const gamedata = await axios.post("/api/fetchteamgames", {tourId: tourId})
                  this.getData("/api/fetchteamgames", tourId) 
                 // if all rounds listed...
                } 
                this.setState({  nameA: nameA, nameB: nameB });

            }

        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false })
        })

    }

     getData = async (url, tourId) => {
        try {
            const response = await axios.post(url,  {tourId: tourId})
            console.log(response.data)
            
            let games = response.data
            let listedRounds = games.map(game => {return parseInt(game.round)})
            console.log(listedRounds)
            this.setState({ games: games, listedRounds:listedRounds });
        }catch (error){
            console.log(error)
        }

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
                                       {game.game_name}
                                    </Table.Cell>
                                    <Table.Cell >{game.points_a}</Table.Cell>
                                    <Table.Cell >{game.points_b}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>

                <Modal id="addingGameModal" size="fullscreen" open={this.state.isAddingGame} onClose={this.closeAddingGame}
                        closeOnDimmerClick={false}>
                        <Modal.Header>Add new Game</Modal.Header>
                        <Modal.Content >
                            
                            {<AddGame listedRounds ={this.state.listedRounds} addGame={this.addGame} tourId={this.props.tourId} rounds={this.props.rounds} gameTypes={this.state.gameTypes} closeModal={this.closeAddingGame} />}

                            
                        </Modal.Content>
                    </Modal>

                </div>
            )
        }
    }
}

export default GamesSummary;