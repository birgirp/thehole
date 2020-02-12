import React, { Component } from "react";
import { Button, Table, Icon, Dropdown } from "semantic-ui-react";
import axios from "axios";
import AddGame from "./AddGame";
import Loading from "../../../Loading/Loading";


//import "./tour.css";
class MatchPlay extends Component {


    constructor(props) {
        super(props);
        this.state = {


        }
    }



    componentDidMount() {
        //   this.setState({ isLoading: true })


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
                                <Table.HeaderCell width='1'>{this.state.nameA}</Table.HeaderCell>
                                <Table.HeaderCell width='1'>{this.state.nameB}</Table.HeaderCell>
                                <Table.HeaderCell width='3'>Results</Table.HeaderCell>
                                <Table.HeaderCell width='2'>Points A</Table.HeaderCell>
                                <Table.HeaderCell width='2'>Points B</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {games.map((game, index) => {
                                return (
                                    <Table.Row key={game.round}>
                                        <Table.Cell >
                                            <Dropdown
                                                label='Game'
                                                index={index}
                                                fluid
                                                selection
                                                placeholder='Select Player'
                                                options={playersA}
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
                                                options={playersB}
                                                onChange={this.changePlayerB}
                                                disabled={false}
                                            />

                                        </Table.Cell>
                                        <Table.Cell >
                                            <Input
                                                index={index}
                                                name='Results'
                                                type="Text"
                                                value={}
                                                onChange={this.changeResult}
                                            />
                                        </Table.Cell>
                                        <Table.Cell >

                                        </Table.Cell>
                                        <Table.Cell >
                                            
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>

                    <Modal id="addingGameModal" size="fullscreen" open={this.state.isAddingGame} onClose={this.closeAddingGame}
                        closeOnDimmerClick={false}>
                        <Modal.Header>Add new Game</Modal.Header>
                        <Modal.Content >

                            {<AddGame listedRounds={this.state.listedRounds} addGame={this.addGame} tourId={this.props.tourId} rounds={this.props.rounds} gameTypes={this.state.gameTypes} closeModal={this.closeAddingGame} />}


                        </Modal.Content>
                    </Modal>

                </div>
            )
        }
    }
}

export default MatchPlay;