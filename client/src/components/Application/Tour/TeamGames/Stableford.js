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

        let games = this.state.games


        axios.post("/api/getteammembers", { tourId: this.props.tourId }).then(res => {

            let teams = res.data
            teams.forEach(element => {
                element.status = ''
                element.points = 0
            });

            let teamA = res.data.filter(team => { return team.team_id === this.props.idA })
            let teamB = res.data.filter(team => { return team.team_id === this.props.idB })

            console.log(teamB)

            this.setState({
                teamA: teamA,
                teamB: teamB,
                description: this.props.game.description
            })

            return axios.post('/api/getstablefordgame', { gameId: this.props.game.id })


        }).then(res2 => {

            this.setState({ isLoading: false})

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
                                        <Table.Cell >
                                            {player.full_name}
                                        </Table.Cell>
                                        <Table.Cell >
                                            {player.handicap}

                                        </Table.Cell>
                                        <Table.Cell >
                                        {player.points || 0 }
                                        </Table.Cell>
                                        <Table.Cell >
                                            {teamB[index].full_name}
                                        </Table.Cell>
                                        <Table.Cell >
                                        {teamB[index].handicap}
                                        </Table.Cell>
                                        <Table.Cell >
                                        {teamB[index].points || 0}
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