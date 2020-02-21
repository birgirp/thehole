import React, { Component } from "react";
import { Button, Table, Input, Dropdown, Radio, TextArea, Form } from "semantic-ui-react";
import axios from "axios";
import Loading from "../../../Loading/Loading";


//import "./tour.css";
class Twosome extends Component {


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

            let selA = []
            let selB = []
            for (let i = 0; i < (teamA.length / 2); i++) {
                selA[i] = JSON.parse(JSON.stringify(playersA));
                selB[i] = JSON.parse(JSON.stringify(playersB));
            }
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

            return axios.post('/api/gettwosomepairs', { gameId: this.props.game.id })


        }).then(res2 => {
            console.log(res2.data)
            let results = this.state.results
            let pointsA = this.state.pointsA
            let pointsB = this.state.pointsB
            let selectedPlayersA = this.state.selectedPlayersA
            let selectedPlayersB = this.state.selectedPlayersB
            // No twosome pairs found in database :
            if (!res2.data || res2.data.length === 0) {
                games.forEach((game, index) => {
                    results[index] = ""
                    pointsA[index] = 0.5
                    pointsB[index] = 0.5
                    selectedPlayersA[index] =[]
                    selectedPlayersB[index] =[]

                });


                this.setState({
                    results: results,
                    pointsA: pointsA,
                    pointsB: pointsB,
                    description: this.props.game.description,
                    selectedPlayersA: selectedPlayersA,
                    selectedPlayersB: selectedPlayersB,
                })
            } else {
                // Found twosome pairs in database
                
                let firstTime = false
                console.log(res2.data)
                let description = res2.data[0].description

                res2.data.forEach((row, index) => {
                    selectedPlayersA[index] =[]
                    selectedPlayersB[index] =[]
                    selectedPlayersA[index][0] = parseInt(row.player_a1)
                    selectedPlayersA[index][1] = parseInt(row.player_a2)
                    selectedPlayersB[index][0] = parseInt(row.player_b1)
                    selectedPlayersB[index][1] = parseInt(row.player_b2)
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
                    firstTime: firstTime,
                    isMissingPlayers: false

                })

            }
            this.setState({ isLoading: false })
        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false })
        })
    }

    initPlayerSelection = () => {

        let selA = this.state.selA
        let selB = this.state.selB

        let selectedPlayersA = this.state.selectedPlayersA
        let selectedPlayersB = this.state.selectedPlayersB

        let numPlayers = selA.length

        for (let i = 0; i < numPlayers; i++) {

            let playerKeyB = selectedPlayersB[i]
            selB.forEach((set, index) => {
                set.forEach((item) => {
                    if (index === i) {
                        if (item.key === playerKeyB) {
                            item.disabled = false
                        }
                    } else {
                        if (item.key === playerKeyB) {
                            item.disabled = true
                        }
                    }
                    if (item.key === -1) {
                        item.disabled = false
                    }
                })
            })

        }

        for (let i = 0; i < numPlayers; i++) {

            let playerKeyA = selectedPlayersA[i]

            selA.forEach((set, index) => {
                set.forEach((item) => {
                    if (index === i) {
                        if (item.key === playerKeyA) {
                            item.disabled = false
                        }
                    } else {
                        if (item.key === playerKeyA) {
                            item.disabled = true
                        }
                    }
                    if (item.key === -1) {
                        item.disabled = false
                    }
                })
            })


        }
    }

    changePlayerA = (e, v) => {
       // console.log(this.state.selectedPlayersA)
        let index = v.index
        let selA = this.state.selA
        let selectedPlayersA = this.state.selectedPlayersA
        selectedPlayersA[index] = v.value
        console.log(v.value)
        if(selectedPlayersA[index].length === 2){
            let others = this.process(v.value,selA[index])
            console.log(others)
            others.forEach(p => p.disabled = true)
        }else{
           // selA[index].forEach(p => p.disabled = false)
        }

        if(selectedPlayersA[index].length >0){
            selA.forEach((list, idx) =>{
                if(idx !==index){
                    list.forEach(item => {
                        if(v.value.includes(item.key)){
                            item.disabled = true
                        }
                    })
                }
            })
        }


        this.setState({ selectedPlayersA: selectedPlayersA }, () => this.setMissingPlayers())
    }

    process = (keys,list) => list.filter(item => !keys.includes(item.key))

    changePlayerB = (e, v) => {
        let index = v.index
        let selB = this.state.selB
        let selectedPlayersB = this.state.selectedPlayersB
        selectedPlayersB[index] = v.value
     
        if(selectedPlayersB[index].length === 2){
            let others = this.process(v.value,selB[index])
            console.log(others)
            others.forEach(p => p.disabled = true)
        }else{
           // selA[index].forEach(p => p.disabled = false)
        }

        if(selectedPlayersB[index].length >0){
            selB.forEach((list, idx) =>{
                if(idx !==index){
                    list.forEach(item => {
                        if(v.value.includes(item.key)){
                            item.disabled = true
                        }
                    })
                }
            })
        }


        this.setState({ selectedPlayersB: selectedPlayersB }, () => this.setMissingPlayers())

    }

    setMissingPlayers = () => {
        let missingA = this.state.selectedPlayersA.some(p => p.length <2)
        let missingB = this.state.selectedPlayersB.some(p => p.length <2)

        let isMissingPlayers = missingA || missingB
        console.log(isMissingPlayers)
        this.setState({ isMissingPlayers: isMissingPlayers })
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

    updateTwosomeplay = () => {
        let gamesCount = this.state.games.length
        let selectedPlayersA = this.state.selectedPlayersA
        let selectedPlayersB = this.state.selectedPlayersB
        let pointsA = this.state.pointsA
        let pointsB = this.state.pointsB
        let results = this.state.results
        let description = this.state.description
        let sumA = 0
        let sumB = 0
        let data = []
        let gameId = this.props.game.id
        for (let i = 0; i < gamesCount; i++) {
            sumA = sumA + pointsA[i]
            sumB = sumB + pointsB[i]
            data[i] = [gameId, selectedPlayersA[i][0],selectedPlayersA[i][1], 
            selectedPlayersB[i][0], selectedPlayersB[i][1],results[i], pointsA[i], pointsB[i]]
        }
        console.log(sumB)
        axios.post('/api/addtwosomepairs', { pairs: data, sumA: sumA, sumB: sumB, description: description }).then(res => {
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
                                                clearable
                                                multiple
                                                selection
                                                placeholder='Select Player'
                                                options={this.state.selA[index]}
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
                                                multiple
                                                placeholder='Select Player'
                                                options={this.state.selB[index]}
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
                        disabled={this.state.isMissingPlayers}>
                        Save
                    </Button>
                    <Button secondary onClick={this.handleCancel}>Cancel</Button>


                </div>
            )
        }
    }
}

export default Twosome;