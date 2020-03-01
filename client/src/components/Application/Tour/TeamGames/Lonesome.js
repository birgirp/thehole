import React, { Component } from "react";
import { Button, Table, TextArea, Form, Input } from "semantic-ui-react";
import axios from "axios";
import Loading from "../../../Loading/Loading";


//import "./tour.css";
class Lonessome extends Component {


    constructor(props) {
        super(props);
        this.state = {
            sumScoresA: 0,
            sumScoresB: 0,
            nameA: "",
            nameB: "",
            teamA: [],
            teamB: [],
            firstTime: true,
            description: "",

        }
    }


    componentDidMount() {
        this.setState({ isLoading: true })
        let teamA = []
        let teamB = []
        let sumScoresA = 0
        let sumScoresB = 0


        axios.post("/api/getteammembers", { tourId: this.props.tourId }).then(res => {

            let teams = res.data
            teams.forEach(element => {
              
                element.score = 0
            });

            teamA = res.data.filter(team => { return team.team_id === this.props.idA })
            teamB = res.data.filter(team => { return team.team_id === this.props.idB })


            return axios.post('/api/getlonesomegame', { gameId: this.props.game.id })
        })
            .then(res2 => {
              
                if (res2.data) {
                    let scores =res2.data
                    console.log(scores)

                

                    for (let i = 0; i < teamA.length; i++) {
                        let playerA = teamA[i]
                        let playerB = teamB[i]
                        if (scores.some(p => p.player_id === playerA.player_id)) {
                            playerA.score = parseInt(scores.filter(p => p.player_id === playerA.player_id)[0].score)

                        } else {
                            playerA.score = 0

                        }
                        sumScoresA += playerA.score

                        if (scores.some(p => p.player_id === playerB.player_id)) {
                            playerB.score = parseInt(scores.filter(p => p.player_id === playerB.player_id)[0].score)

                        } else {
                            playerB.score = 0

                        }

                        sumScoresB += playerB.score
                    }

                    console.log(teamA)

                    this.setState({
                        teamA: teamA,
                        teamB: teamB,
                        description: this.props.game.description,
                        sumScoresA: sumScoresA,
                        sumScoresB: sumScoresB,
                        isLoading: false,
                        firstTime:false
                    });
                } else {
                    console.log(teamA)
                    console.log(teamB)
                    this.setState({
                        teamA: teamA,
                        teamB: teamB,
                        description: this.props.game.description,
                        sumScoresA: sumScoresA,
                        sumScoresB: sumScoresB,
                        isLoading: false,
                        firstTime: true

                    });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })
    }





    changeScoreA = (e, v) => {
 
        let teamA = this.state.teamA
        let player =teamA[v.index]
        player.score = parseInt(v.value)
        let sumScoresA = 0
        for(let p of teamA){
            sumScoresA +=p.score
        }
        
        this.setState({teamA: teamA, sumScoresA:sumScoresA })
      
    }

    changeScoreB = (e, v) => {
      
        let teamB = this.state.teamB
        let player =teamB[v.index]
        player.score = parseInt(v.value)


        let sumScoresB = 0
        for(let p of teamB){
            sumScoresB +=p.score
        }
        this.setState({teamB: teamB, sumScoresB: sumScoresB})
      
    }



    changeDescription = (e, v) => {
        let description = this.state.description
        description = v.value
        this.setState({ description: description })
    }


    handleSubmit = () => {
        this.setState({ isLoading: true })
        if (this.state.firstTime) {
            this.updateLonesomeScores()
        } else {
            axios.post('/api/deletelonesomescores', { gameId: this.props.game.id })
                .then(res => {
                    this.updateLonesomeScores()
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ isLoading: false })
                })
        }
    }

    updateLonesomeScores = () => {

        let teamA = this.state.teamA
        let teamB = this.state.teamB

        let players = teamA.concat(teamB)

        let a = this.state.sumScoresA
        let b = this.state.sumScoresB
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


        let description = this.state.description

        let data = []
        let gameId = this.props.game.id
        for (let i = 0; i < players.length; i++) {

            data[i] = [gameId, players[i].player_id,  players[i].score]
        }
        console.log(data)
        axios.post('/api/addlonesomescores', { scores: data, sumA: sumA, sumB: sumB, description: description }).then(res => {
            this.setState({ isLoading: false }, () => this.props.updatePoints(gameId, sumA, sumB))

        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false })
        })

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
                                <Table.HeaderCell width='1'>Score</Table.HeaderCell>
                                <Table.HeaderCell width='2'>B: {this.props.nameB}</Table.HeaderCell>
                                <Table.HeaderCell width='1'>Hcp</Table.HeaderCell>
                                <Table.HeaderCell width='1'>Score</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {teamA.map((player, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell  >
                                            {player.full_name}
                                        </Table.Cell>
                                        <Table.Cell >
                                            {player.handicap}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input
                                                index={index}
                                                name='Score'
                                                type="Number"
                                                value={this.state.teamA[index].score}
                                                onChange={this.changeScoreA}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {teamB[index].full_name}
                                        </Table.Cell>
                                        <Table.Cell >
                                            {teamB[index].handicap}
                                        </Table.Cell>
                                        <Table.Cell >
                                            <Input
                                                index={index}
                                                name='Score'
                                                type="Number"
                                                value={this.state.teamB[index].score}
                                                onChange={this.changeScoreB}
                                            />

                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row >
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell><b>{this.state.sumScoresA}</b></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell><b>{this.state.sumScoresB}</b></Table.HeaderCell>
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
                       >
                        Save
                    </Button>
                    <Button secondary onClick={this.handleCancel}>Cancel</Button>


                </div>
            )
        }
    }
}

export default Lonessome;