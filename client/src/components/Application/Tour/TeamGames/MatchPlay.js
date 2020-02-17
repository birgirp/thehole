import React, { Component } from "react";
import { Button, Table, Input, Dropdown, Radio, TextArea, Form } from "semantic-ui-react";
import axios from "axios";
import Loading from "../../../Loading/Loading";


//import "./tour.css";
class MatchPlay extends Component {


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
            teamA: [],
            teamB: [],
            playersA: [],
            playersB: [],
            games: [],
            firstTime: true,
            description: ""


        }
    }


    componentDidMount() {
          this.setState({ isLoading: true })

        //"/api/getteammembers"
        let games = this.state.games
        console.log(this.props.game)

        axios.post("/api/getteammembers", { tourId: this.props.tourId }).then(res => {
           
            let teamA = res.data.filter(team => { return team.team_id === this.props.idA })
            let teamB = res.data.filter(team => { return team.team_id === this.props.idB })
            let playersA = teamA.map(player => {
                return { key: player.player_id, value: player.player_id, text: player.full_name }
            })

            let playersB = teamB.map(player => {
                return { key: player.player_id, value: player.player_id, text: player.full_name }
            })

            games = teamA.map((p, i) => { return { pair: i + 1 } })

            this.setState({ playersA: playersA, playersB: playersB, games: games })

            return axios.post('/api/getmatchplaypairs', { gameId: this.props.game.id })


        }).then(res2 => {
            console.log(res2.data);
            let results = this.state.results
            let pointsA = this.state.pointsA
            let pointsB = this.state.pointsB

            if (res2.data.length === 0) {
               
          

                games.forEach((game, index) => {
                    results[index] = ""
                    pointsA[index] = 0.5
                    pointsB[index] = 0.5

                });
                console.log(results)
                this.setState({ results: results, pointsA: pointsA, pointsB: pointsB })
            } else{
                    let firstTime = false
                    let selectedPlayersA = this.state.selectedPlayersA
                    let selectedPlayersB = this.state.selectedPlayersB
                    let description = res2.data[0].description

                    res2.data.forEach((row,index) => {
                        selectedPlayersA[index] = parseInt(row.player_a)
                        selectedPlayersB[index] = parseInt(row.player_b)
                        results[index] = row.results
                        pointsA[index] = row.points_a
                        pointsB[index] = row.points_b

                    })

                    this.setState({ 
                        results: results,
                         pointsA: pointsA, 
                         pointsB: pointsB,
                         selectedPlayersA: selectedPlayersA,
                         selectedPlayersB: selectedPlayersB,
                         description: description,
                        firstTime: firstTime
                        
                        }, () => console.log(this.state))

            }
            this.setState({ isLoading: false })
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

    /* changePlayerA = (e, v) => {
 
         // set the selected player
         let selectedPlayersA = this.state.selectedPlayersA
         selectedPlayersA[v.index] = v.value;
 
 
         let playersA = this.state.playersA
         let idx = playersA[v.index].findIndex(player => {return player.key === v.value})
 
         playersA.forEach((playerset, i) => {
            if(v.index !== i){
                playerset[idx].disabled = true
            }
         })
            this.setState({
             playersA: playersA,
             selectedPlayersA: selectedPlayersA
         });
       
     }*/

    changePlayerA = (e, v) => {
        let selectedPlayersA = this.state.selectedPlayersA
        selectedPlayersA[v.index] = v.value;
        this.setState({ selectedPlayersA: selectedPlayersA })
    }

    changePlayerB = (e, v) => {
        let selectedPlayersB = this.state.selectedPlayersB
        selectedPlayersB[v.index] = v.value;
        this.setState({ selectedPlayersB: selectedPlayersB }, () => this.temp())
    }


    temp = () => {
        console.log(this.state.selectedPlayersA.length)
        console.log(this.state.selectedPlayersB.length)
        console.log(this.state.games.length)


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
        let gamesCount = this.state.games.length
        let selectedPlayersA = this.state.selectedPlayersA
        let selectedPlayersB = this.state.selectedPlayersB
        let pointsA = this.state.pointsA
        let pointsB = this.state.pointsB
        let results = this.state.results
        let description = this.state.description
        let sumA = 0
        let sumB = 0
        console.log("submitting")
     
        console.log(this.state.firstTime)
        if (this.state.firstTime) {
            //  [[gameId, pA, pB,results, pointsA, pointsB, ],.
            
            let data = []
            let gameId = this.props.game.id
            for (let i = 0; i < gamesCount; i++) {
                sumA = sumA + pointsA[i]
                sumB = sumB +pointsB[i]
                data[i] = [gameId, selectedPlayersA[i], selectedPlayersB[i], results[i], pointsA[i], pointsB[i]]
            }
            console.log(sumB)
            axios.post('/api/addmatchplaypairs', { pairs: data, sumA: sumA, sumB:sumB, description: description }).then(res => {

                console.log(res)
            })

        }else{
            console.log("update...")
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
                                <Table.HeaderCell width='1'>{this.props.nameA}</Table.HeaderCell>
                                <Table.HeaderCell width='1'>{this.props.nameB}</Table.HeaderCell>
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
                                                label='Game'
                                                index={index}
                                                fluid
                                                selection
                                                placeholder='Select Player'
                                                options={this.state.playersA}
                                                onChange={this.changePlayerA}
                                                disabled={false}
                                                value={this.state.selectedPlayersA[index]}
                                            />
                                        </Table.Cell>
                                        <Table.Cell >
                                            <Dropdown
                                                label='Game'
                                                index={index}
                                                fluid
                                                selection
                                                placeholder='Select Player'
                                                options={this.state.playersB}
                                                onChange={this.changePlayerB}
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
                        disabled={(this.state.selectedPlayersA.length === this.state.games.length) && (this.state.selectedPlayersB.length === this.state.games.length) ? false : true}>
                        Save
                    </Button>
                    <Button secondary onClick={this.handleCancel}>Cancel</Button>


                </div>
            )
        }
    }
}

export default MatchPlay;