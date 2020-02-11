// External libs
import React, { Component } from "react";
import { Button, TextArea, Input, Dropdown, Grid } from "semantic-ui-react";
import axios from "axios";

// Own components...
import Loading from "../../../Loading/Loading";

class AddGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tourId: null,
            gameTypes: [],
            round: 1,
            selectedGame: null,
            description: '',
            maxRounds: 0,
            listedRounds: []


        };
    }

    componentDidMount() {

        this.setState({tourId: this.props.tourId, gameTypes: this.props.gameTypes, maxRounds: this.props.rounds })
    }

    changeRound = (e, v) => {
        this.setState({ round: v.value })
    }

    changeGame = (e, v) => {
        this.setState({ selectedGame: v.value })
    }

    changeDescription = (e, v) => {
        this.setState({ description: v.value })

    }
    handleSubmit = () => {
        console.log(this.state)

        axios.post('/api/addteamgame', { tourId: this.state.tourId, round: this.state.round, game: this.state.selectedGame }).then(res => {
            console.log(res.data)
            let gameTypes = this.state.gameTypes
            let idx = gameTypes.findIndex(type => type.key === this.state.selectedGame)
            let id = parseInt(res.data[0].id)

            let gameName = this.state.gameTypes[idx].text
            let game = {"id": id, "tourId": this.state.tourId ,"round":this.state.round ,"gameName":gameName, "game": this.state.selectedGame, "status": "New", "pointsA": 0, "pointsB": 0}
            this.props.addGame(game)
            this.handleCancel()
        })
    }


    handleCancel = () => {
        this.props.closeModal();
    }


    render() {

        const gameTypes = this.state.gameTypes
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            return (
                <div>

                    <Grid colums={2} >
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Input
                                    name='Round'
                                    label='Round'
                                    max={this.props.rounds}
                                    min={1}
                                    type="Number"
                                    value={this.state.round}
                                    onChange={this.changeRound}
                                />
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Dropdown
                                    label='Game'
                                    fluid
                                    selection
                                    placeholder='Select game'
                                    options={gameTypes}
                                    onChange={this.changeGame}
                                    disabled={false}
                                />

                            </Grid.Column>

                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={9}>
                                <TextArea
                                    name='Description'
                                    placeholder='Description'
                                    style={{ minHeight: 100 }}
                                    type="Text"
                                    value={this.state.description}
                                    onChange={this.changeDescription}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <br></br>
                    <Button primary onClick={this.handleSubmit}>Submit</Button>
                    <Button secondary onClick={this.handleCancel}>Cancel</Button>

                </div>
            )
        }
    }
}


export default AddGame;