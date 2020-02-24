import React, { Component } from "react";
import { Button, Table, Input, Dropdown, Radio, TextArea, Form } from "semantic-ui-react";
import axios from "axios";
import Loading from "../../../Loading/Loading";


//import "./tour.css";
class Stableford extends Component {


    constructor(props) {
        super(props);
        this.state = {
            pointsA: [],
            pointsB: [],
            results: [],
            nameA: "",
            nameB: "",
            selectedPlayersA: [],
            selectedPlayersB: [],
            selA: [],
            selB: [],
            teamA: [],
            teamB: [],
            playersA: [],
            playersB: [],
            games: [],
            firstTime: true,
            description: "",
            isMissingPlayers: true

        }
    }


    componentDidMount() {
        this.setState({ isLoading: true })

        let games = this.state.games


        axios.post("/api/getteammembers", { tourId: this.props.tourId }).then(res => {

            let teamA = res.data.filter(team => { return team.team_id === this.props.idA })
            let teamB = res.data.filter(team => { return team.team_id === this.props.idB })
            let playersA = teamA.map(player => {
                return { key: player.player_id, value: player.player_id, text: player.full_name }
            })
            let playersB = teamB.map(player => {
                return { key: player.player_id, value: player.player_id, text: player.full_name }
            })

        
            games = []
            for (let i = 0; i < teamA.length / 2; i++) {
                games.push({ pair: i + 1 })
            }

            this.setState({
                playersA: playersA,
                playersB: playersB,
                games: games,
                selA: selA,
                selB: selB,
                description: this.props.game.description
            })

            return axios.post('/api/getstablefordgame', { gameId: this.props.game.id })


        }).then(res2 => {
         
    
        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false })
        })
    }





    changeResult = (e, v) => {

        let results = this.state.results
        results[v.index] = v.value
        this.setState({ results: results })
    }

    handleChangeWinner = (e, v) => {
        let pointsA = this.state.pointsA
        let pointsB = this.state.pointsB
        if (v.value === 'A') {
            pointsA[v.index] = 1
            pointsB[v.index] = 0
        } else if (v.value === 'B') {
            pointsA[v.index] = 0
            pointsB[v.index] = 1
        } else if (v.value === 'Draw') {
            pointsA[v.index] = 0.5
            pointsB[v.index] = 0.5
        }
        this.setState({ pointsA: pointsA, pointsB: pointsB }, () => { console.log(this.state) })
    }

    changeDescription = (e, v) => {
        let description = this.state.description
        description = v.value
        this.setState({ description: description })
    }


    handleSubmit = () => {
        this.setState({ isLoading: true })
        if (this.state.firstTime) {
            this.updateTwosomeplay()
        } else {
            axios.post('/api/deletetwosomepairs', { gameId: this.props.game.id })
                .then(res => {
                    this.updateTwosomeplay()
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ isLoading: false })
                })
        }
    }

    


    handleCancel = (e) => {
        this.props.closeModal()
    }


    render() {

        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            const games = this.state.games

            return (
                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width='1'>A: {this.props.nameA}</Table.HeaderCell>
                                <Table.HeaderCell width='1'>B: {this.props.nameB}</Table.HeaderCell>
                                <Table.HeaderCell width='1'>Results</Table.HeaderCell>
                                <Table.HeaderCell width='3'>winner</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {games.map((game, index) => {
                                return (
                                    <Table.Row key={game.pair}>
                                        <Table.Cell >
                                            <Dropdown
                                                label='A'
                                                index={index}
                                                fluid
                                                clearable
                                                multiple
                                                selection
                                                placeholder='Select Player'
                                                options={this.state.selA[index]}
                                                onChange={this.changePlayer}
                                                disabled={false}
                                                value={this.state.selectedPlayersA[index]}
                                            />
                                        </Table.Cell>
                                        <Table.Cell >
                                            <Dropdown
                                                label='B'
                                                index={index}
                                                fluid
                                                selection
                                                multiple
                                                placeholder='Select Player'
                                                options={this.state.selB[index]}
                                                onChange={this.changePlayer}
                                                disabled={false}
                                                value={this.state.selectedPlayersB[index]}
                                            />

                                        </Table.Cell>
                                        <Table.Cell >
                                            <Input
                                                index={index}
                                                name='Results'
                                                type="Text"
                                                value={this.state.results[index] || ""}
                                                onChange={this.changeResult}
                                            />
                                        </Table.Cell>
                                        <Table.Cell >
                                            <Form>
                                                <Form.Group inline>
                                                    <Form.Field>
                                                        <Radio
                                                            index={index}
                                                            label="A"
                                                            name={"radioGroup" + index}
                                                            checked={this.state.pointsA[index] === 1}
                                                            value='A'
                                                            onChange={this.handleChangeWinner}>
                                                        </Radio>
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <Radio
                                                            index={index}
                                                            label="B"
                                                            name={"radioGroup" + index}
                                                            checked={this.state.pointsB[index] === 1}
                                                            value='B'
                                                            onChange={this.handleChangeWinner}>
                                                        </Radio>
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <Radio
                                                            index={index}
                                                            label="Draw"
                                                            name={"radioGroup" + index}
                                                            checked={this.state.pointsA[index] === 0.5}
                                                            value='Draw'
                                                            onChange={this.handleChangeWinner}>
                                                        </Radio>
                                                    </Form.Field>


                                                </Form.Group>

                                            </Form>



                                        </Table.Cell>

                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                    <br></br>
                    <Form>
                        <TextArea
                            name='Description'
                            placeholder='Description'
                            style={{ minHeight: 100 }}
                            type="Text"
                            value={this.state.description}
                            onChange={this.changeDescription}
                        />
                    </Form>
                    <br></br>
                    <Button
                        primary
                        onClick={this.handleSubmit}
                        disabled={this.state.isMissingPlayers}>
                        Save
                    </Button>
                    <Button secondary onClick={this.handleCancel}>Cancel</Button>


                </div>
            )
        }
    }
}

export default Stableford;