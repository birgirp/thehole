import React, { Component } from "react";
import { Button, Table, Input, Dropdown, Radio } from "semantic-ui-react";
import axios from "axios";
import Loading from "../../../Loading/Loading";


//import "./tour.css";
class MatchPlay extends Component {


    constructor(props) {
        super(props);
        this.state = {
            winner:null,
            nameA: "A",
            nameB: "B",
            selectedPlayersA: "Biggi",
            selectedPlayersB: [],
            playersA: [{key:1,value:1,text:'Biggi'},{key:2,value:2,text:'Jói'}],
            playersB: [{key:3,value:3,text:'Haukur'},{key:4,value:4,text:'Garðar'}],
            visiblePlayersA: [],
            visibleplayersB: []

        }
    }



    componentDidMount() {
        //   this.setState({ isLoading: true })

    // start by loading all players A and B
    this.setState({visiblePlayersA: this.state.playersA, visibleplayersB: this.state.playersB});
    }

    changeResult = (e,v) => {
        console.log(v.value)
    }

    changePlayerA = (e,v) => {
       
        console.log(v)
        let selectedPlayersA = this.state.selectedPlayersA

        let playersA  = this.state.playersA
        // selectedPlayersA[v.index] = v;
        
        let updatedPlayerListA = playersA.filter(player => { return player.key !== v.value})
        this.setState({
            visiblePlayersA: updatedPlayerListA});
            console.log(this.state.selectedPlayersA)
    }

    changePlayerB = (e,v) => {
        console.log(v.value)
    }

    handleChangeWinner = (e,v) => {
        console.log(v.value)
      
        
    }

    handleSubmit = (e) => {
        console.log(e)
    }

    handleCancel = (e) => {
        this.props.closeModal()
    }
  



    render() {
        const { value } = this.state;
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            const games = [{pair:1},{pair:2}]
        
            let visiblePlayersB = [{key:3,value:3,text:'Haukur'},{key:4,value:4,text:'Garðar'},]
            return (
                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width='1'>{this.state.nameA}</Table.HeaderCell>
                                <Table.HeaderCell width='1'>{this.state.nameB}</Table.HeaderCell>
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
                                                value={}
                                                options={this.state.visiblePlayersA}
                                                onChange={this.changePlayerA}
                                                disabled={false}
                                            />
                                        </Table.Cell>
                                        <Table.Cell >
                                            <Dropdown
                                                label='Game'
                                                index={index}
                                                fluid
                                                selection
                                                placeholder='Select Player'
                                                options={visiblePlayersB}
                                                onChange={this.changePlayerB}
                                                disabled={false}
                                            />

                                        </Table.Cell>
                                        <Table.Cell >
                                            <Input
                                                index={index}
                                                name='Results'
                                                type="Text"
                                                value={this.state.results}
                                                onChange={this.changeResult}
                                            />
                                        </Table.Cell>
                                        <Table.Cell >
                                            <Radio
                                                label="A"
                                                name="radioGroup"
                                                checked={this.state.winner === 'A'}
                                                value='A'
                                                onChange={this.handleChangeWinner}>
                                            </Radio>
                                            <Radio
                                                label="B"
                                                name="radioGroup"
                                                checked={this.state.winner === 'B'}
                                                value='B'
                                                onChange={this.handleChangeWinner}>
                                            </Radio>
                                            <Radio
                                                label="Draw"
                                                name="radioGroup"
                                                checked={this.state.winner === 'Draw'}
                                                value='Draw'
                                                onChange={this.handleChangeWinner}>
                                            </Radio>
                                        </Table.Cell>

                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                    <br></br>
                    <Button
                        primary
                        onClick={this.handleSubmit}
                        disabled={this.state.disabled}>
                        Submit
                    </Button>
                    <Button secondary onClick={this.handleCancel}>Cancel</Button>


                </div>
            )
        }
    }
}

export default MatchPlay;