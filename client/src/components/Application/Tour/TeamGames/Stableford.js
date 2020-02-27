import React, { Component } from "react";
import { Button, Table, TextArea, Form } from "semantic-ui-react";
import axios from "axios";
import Loading from "../../../Loading/Loading";


//import "./tour.css";
class Stableford extends Component {


    constructor(props) {
        super(props);
        this.state = {
            sumPointsA: 0,
            sumPointsB: 0,
            nameA: "",
            nameB: "",
            teamA: [],
            teamB: [],

            firstTime: true,
            description: "",
            isAllSubmitted: true

        }
    }


    componentDidMount() {
        this.setState({ isLoading: true })
        let teamA = []
        let teamB = []
        let sumPointsA = 0
        let sumPointsB = 0
        let isAllSubmitted = false

        axios.post("/api/getteammembers", { tourId: this.props.tourId }).then(res => {

            let teams = res.data
            teams.forEach(element => {
                element.status = ''
                element.points = 0
            });

            teamA = res.data.filter(team => { return team.team_id === this.props.idA })
            teamB = res.data.filter(team => { return team.team_id === this.props.idB })


            return axios.post('/api/getstablefordgame', { tourId: this.props.game.tour_id, round: this.props.game.round })


        }).then(res2 => {
            if (res2.data) {
                let scores = res2.data
                console.log(scores)

                isAllSubmitted = true

                for (let i = 0; i < teamA.length; i++) {
                    let playerA = teamA[i]
                    let playerB = teamB[i]
                    if (scores.some(p => p.player_id === playerA.player_id)) {
                        playerA.points = parseInt(scores.filter(p => p.player_id === playerA.player_id)[0].points)
                        playerA.status = scores.filter(p => p.player_id === playerA.player_id)[0].status
                    } else {
                        playerA.points = 0
                        playerA.status = ""
                    }
                    sumPointsA += playerA.points
                    if (scores.some(p => p.player_id === playerB.player_id)) {
                        playerB.points = parseInt(scores.filter(p => p.player_id === playerB.player_id)[0].points)
                        playerB.status = scores.filter(p => p.player_id === playerB.player_id)[0].status
                    } else {
                        playerB.points = 0
                        playerB.status = ""
                    }

                    sumPointsB += playerB.points

                    isAllSubmitted = (playerA.status !== 'Submitted' || playerB.status !== 'Submitted') ? false : true

                }

                console.log(teamA)

                this.setState({
                    teamA: teamA,
                    teamB: teamB,
                    description: this.props.game.description,
                    sumPointsA: sumPointsA,
                    sumPointsB: sumPointsB,
                    isLoading: false,
                    isAllSubmitted: isAllSubmitted
                })
            } else {

                this.setState({
                    teamA: teamA,
                    teamB: teamB,
                    description: this.props.game.description,
                    sumPointsA: sumPointsA,
                    sumPointsB: sumPointsB,
                    isLoading: false,
                    isAllSubmitted: isAllSubmitted
                })

            }


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



    changeDescription = (e, v) => {
        let description = this.state.description
        description = v.value
        this.setState({ description: description })
    }


    handleSubmit = () => {
        let gameId = this.props.game.id
        let a = this.state.sumPointsA
        let b = this.state.sumPointsB
        let sumA, sumB
        let delta = a - b
        if (delta === 0) {
            sumA = 0.5
            sumB = 0.5
        } else if (delta > 0) {
            sumA = 1
            sumB = 0
        } else {
            sumA = 0
            sumB = 1
        }


        this.props.updatePoints(gameId, sumA, sumB)
    }




    handleCancel = (e) => {
        this.props.closeModal()
    }


    render() {

        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            const teamA = this.state.teamA
            const teamB = this.state.teamB

            return (
                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width='2'>A: {this.props.nameA}</Table.HeaderCell>
                                <Table.HeaderCell width='1'>Hcp</Table.HeaderCell>
                                <Table.HeaderCell width='1'>Points</Table.HeaderCell>
                                <Table.HeaderCell width='2'>B: {this.props.nameB}</Table.HeaderCell>
                                <Table.HeaderCell width='1'>Hcp</Table.HeaderCell>
                                <Table.HeaderCell width='1'>Points</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {teamA.map((player, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell negative={player.status !== 'Submitted'} >
                                            {player.full_name}
                                        </Table.Cell>
                                        <Table.Cell negative={player.status !== 'Submitted'} >
                                            {player.handicap}
                                        </Table.Cell>
                                        <Table.Cell negative={player.status !== 'Submitted'}>
                                            {player.points || 0}
                                        </Table.Cell>
                                        <Table.Cell negative={teamB[index].status !== 'Submitted'}>
                                            {teamB[index].full_name}
                                        </Table.Cell>
                                        <Table.Cell negative={teamB[index].status !== 'Submitted'} >
                                            {teamB[index].handicap}
                                        </Table.Cell>
                                        <Table.Cell negative={teamB[index].status !== 'Submitted'} >
                                            {teamB[index].points || 0}
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row >
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell><b>{this.state.sumPointsA}</b></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell><b>{this.state.sumPointsB}</b></Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
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
                        disabled={!this.state.isAllSubmitted}>
                        Save
                    </Button>
                    <Button secondary onClick={this.handleCancel}>Cancel</Button>


                </div>
            )
        }
    }
}

export default Stableford;