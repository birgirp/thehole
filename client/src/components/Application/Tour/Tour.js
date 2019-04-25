import React, { Component } from "react";
import { Tab} from "semantic-ui-react";
import axios from "axios";
import Loading from "../../Loading/Loading";
import TourSummary from "./TourSummary";
import TourEclectic from "./TourEclectic";
import TourRound from "./TourRound";
import "./tour.css";
class Tour extends Component {


    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status: "",
            rounds: 0,
            players: [],
            courses: [],
            isLoading: false,
            tourNotFound: false,
            tabs: []
        }
    }

 

    componentDidMount() {
        this.setState({ isLoading: true })
        const tourId = this.props.match.params.id
        var rounds;
        this.setState({ id: tourId })
        //  this.setState({ id: t.id, name: t.name, status: t.status, rounds: parseInt(t.rounds), isLoading: true });
        axios.post("/api/gettourbyid", { tourId: tourId })
            .then(res0 => {
                if (!res0.data) {
                    this.setState({ tourNotFound: true })
                    throw new Error('No tour found');
                }
                let t = res0.data
                this.setState({ name: t.tour_name, status: t.tour_status, rounds: parseInt(t.tour_rounds) });
                rounds = parseInt(t.tour_rounds)
                return axios.post("/api/gettourplayers", { tourId: tourId })
            }).then(res => {
                this.setState({ players: res.data });
                return axios.post("/api/gettourcourses", { tourId: tourId })
                    .then(res2 => {
                        this.setState({ courses: res2.data });

      
                         let tabs = [{ menuItem: 'Summary', render: () => <Tab.Pane><TourSummary players={this.state.players}  rounds={this.state.rounds} tourId={this.props.match.params.id}/></Tab.Pane> }]

                        var i ;
                        for (i = 1; i < rounds +1; i++) {
                            let x = i
                            let r = { menuItem: 'Round ' + i, render: () => <Tab.Pane><TourRound roundNum={x} playerId={this.props.userId} tourId={this.props.match.params.id} courses={res2.data}/></Tab.Pane> }
                            tabs.push(r)
                        }
                        tabs.push({ menuItem: 'Eclectic', render: () => <Tab.Pane><TourEclectic playerId={this.props.userId}  players={this.state.players}  tourId={this.props.match.params.id} courses={res2.data}/></Tab.Pane> })

                        this.setState({tabs: tabs})

                        this.setState({ isLoading: false });
                    })
            }).catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })
    }






    render() {
      /*  const panes = [
            { menuItem: 'Summary', render: () => <Tab.Pane><TourSummary /></Tab.Pane> },
            { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
            { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
        ]*/

        const panes = this.state.tabs
        if (this.state.isLoading) {
            return (<Loading />)
        } else {

            return (
                <div>
                    <h1>  {this.state.name} </h1>
                    <br />
                    <Tab 
                     menu={{ pointing: true, className: "wrapped" }}
                    panes={panes} />
                    <br />


                </div>
            )
        }
    }
}

export default Tour;