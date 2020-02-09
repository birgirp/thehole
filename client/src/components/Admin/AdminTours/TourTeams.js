import React, { Component } from "react";
import { Button, Grid, Input, Dropdown, Label } from "semantic-ui-react";
import axios from "axios";
import Loading from "../../Loading/Loading";

class TourTeams extends Component {


    constructor(props) {
        super(props);
        this.state = {
            id: "",
            nameA: "",
            nameB: "",
            status: "",
            hasTeams: false,

            tourPlayers: [],

            playersA: [],
            playersB: [],

            isLoading: false
        }
    }

    componentDidMount() {
        let t = this.props.editingTour
        console.log(t.teams)
        let hasTeams = parseInt(t.teams) > 0 ? true : false
        console.log(hasTeams)
        this.setState({ id: t.id, name: t.name, status: t.status, rounds: parseInt(t.rounds), isLoading: true, hasTeams: hasTeams });
       


        axios.post("/api/gettourplayers", { tourId: t.id }).then(res => {
            this.setState({ tourPlayers: res.data, isLoading: false });
            if(hasTeams){
                axios.post("api/gettourteams" , {tourId: t.id}).then(res2 => {
                    console.log(res.data)
                })
            
            }

        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false })
        })


    }

    handleSubmit = () => {

       if(!this.state.nameA || !this.state.nameB){
           console.log(this.state.hasTeams)
       } else {
        
        this.setState({ loading: true });

        axios.post("/api/insert_teams", {
            tourId: this.state.id,
            nameA: this.state.nameA,
            nameB: this.state.nameB,
            teamA: this.state.playersA,
            teamB: this.state.playersB
        }).then(response => {

            this.setState({ loading: false })
            this.props.closeModal();
        })
            .catch(error => {
                console.log(error);
                this.setState({ isLoading: false });
            });
    }}




    handleCancel = () => {
        this.props.closeModal();
    }





    handlePlayerAChange = (event, value) => {

        let s = value.value

        this.setState({ playersA: s });

    }

    handlePlayerBChange = (event, value) => {
        this.setState({ playersB: value.value });

    }

    handleNameAChange = (event, value) => {
        this.setState({ nameA: value.value })
    }

    handleNameBChange = (event, value) => {
        this.setState({ nameB: value.value })
    }


    render() {
        const players = this.state.tourPlayers


        let pselection = players.map((val) => {
            return { key: val.player_id, text: val.full_name, value: val.player_id }
        });


        if (this.state.isLoading) {
            return (<Loading />)
        } else {

            return (
                <div>
                    <h1>  {this.state.name}: Tour Teams </h1>
                    <br />
                    <br />
                    <Grid colums={2} >
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Input
                                    fluid
                                    name='NameA'
                                    placeholder='Name A'
                                    type="Text"
                                    value={this.state.nameA}
                                    onChange={this.handleNameAChange}
                                />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Input
                                    fluid
                                    name='NameB'
                                    placeholder='Name B'
                                    type="Text"
                                    value={this.state.nameB}
                                    onChange={this.handleNameBChange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Dropdown


                                    fluid
                                    search
                                    value={this.state.playersA}
                                    selection
                                    multiple
                                    label='Players A'
                                    placeholder='Select players'
                                    options={pselection}
                                    onChange={this.handlePlayerAChange}
                                />

                            </Grid.Column>

                            <Grid.Column width={4}>
                                <Dropdown

                                    fluid
                                    search
                                    value={this.state.playersB}
                                    selection
                                    multiple
                                    label='Players B'
                                    placeholder='Select players'
                                    options={pselection}
                                    onChange={this.handlePlayerBChange}
                                />

                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                    <br />
                    <br />

                    <Button primary onClick={this.handleSubmit}>Submit</Button>
                    <Button secondary onClick={this.handleCancel}>Cancel</Button>

                </div>
            )
        }
    }
}

export default TourTeams;