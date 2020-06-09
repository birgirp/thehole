import React, { Component } from 'react'
import { Button, Table, Icon, Modal } from 'semantic-ui-react'
import axios from 'axios'
import AddGame from './AddGame'
import Loading from '../../../Loading/Loading'
import MatchPlay from './MatchPlay'
import Twosome from './Twosome'
import Stableford from './Stableford'
import Lonesome from './Lonesome'

//import "./tour.css";
class GamesSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddingGame: false,
      hasGames: false,
      tourId: null,
      games: [],
      nameA: '',
      nameB: '',
      idA: null,
      idB: null,
      gameTypes: [],
      listedRounds: [],
      allRoundsListed: false,
      isLoading: false,
      isOPenMatchPlay: false,
      isOPenTwosomePlay: false,
      showTeamsModal: false,
      playersA: [],
      playersB: [],
      editingGame: null,
      editingRound: '',
      sumA: 0,
      sumB: 0,
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const tourId = parseInt(this.props.tourId)

    try {
      let response = await axios.post('/api/getgametypes')

      let gameTypes = response.data.map((game) => {
        return { key: game.id, value: game.id, text: game.name }
      })
      this.setState({ gameTypes: gameTypes })
      let res = await axios.post('/api/gettourteamnames', { tourId: tourId })

      if (!res.data) {
        throw new Error('No team names found')
      } else {
        let nameA = res.data[0].name
        let nameB = res.data[1].name
        let idA = res.data[0].id
        let idB = res.data[1].id

        if (parseInt(res.data[0].games) > 0) {
          //  games have been registered in db

          //const gamedata = await axios.post("/api/fetchteamgames", {tourId: tourId})
          this.getData('/api/fetchteamgames', tourId)
          // if all rounds listed...
        } else {
          this.setState({ isLoading: false })
        }
        let teamdata = await axios.post('/api/getteammembers', {
          tourId: this.props.tourId,
        })

        let teamA = teamdata.data.filter((team) => {
          return team.team_id === idA
        })
        let teamB = teamdata.data.filter((team) => {
          return team.team_id === idB
        })
        let playersA = teamA.map((player) => {
          return {
            key: player.player_id,
            value: player.player_id,
            text: player.full_name,
          }
        })
        let playersB = teamB.map((player) => {
          return {
            key: player.player_id,
            value: player.player_id,
            text: player.full_name,
          }
        })

        this.setState({
          nameA: nameA,
          nameB: nameB,
          idA: idA,
          idB: idB,
          playersA: playersA,
          playersB: playersB,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  getData = async (url, tourId) => {
    try {
      const response = await axios.post(url, { tourId: tourId })

      let games = response.data
      let listedRounds = games.map((game) => {
        return parseInt(game.round)
      })

      this.setState(
        {
          games: games,
          listedRounds: listedRounds,
          isLoading: false,
        },
        () => this.sumPoints()
      )
    } catch (error) {
      console.log(error)
      this.setState({ isLoading: false })
    }
  }

  sumPoints = () => {
    let games = this.state.games
    let sumA = 0
    let sumB = 0

    games.forEach((game) => {
      sumA = sumA + game.points_a
      sumB = sumB + game.points_b
    })

    this.setState({ sumA: sumA, sumB: sumB })
  }

  handleAddGame = (e, v) => {
    this.setState({ isAddingGame: true })
  }

  closeAddingGame = (game) => {
    this.setState({ isAddingGame: false })
  }

  addGame = (game) => {
    let games = this.state.games

    games.push(game)
    games.sort((a, b) => (a.round > b.round ? 1 : -1))
    this.setState({ games: games })
  }

  updatePoints = (gameId, points_a, points_b) => {
    let games = this.state.games
    let game = games[games.findIndex((game) => game.id === gameId)]
    game.points_a = points_a
    game.points_b = points_b
    console.log(game)
    this.setState({ openGame: '', games: games }, () => this.sumPoints())
  }

  closeEditGame = () => {
    this.setState({ openGame: '' })
  }

  closeShowTeams = () => {
    this.setState({ showTeamsModal: false })
  }

  handleDeleteGame = async (e) => {
    console.log(e)
    console.log(this.state.selectedRounds)
    try {
      let newgames = this.state.games.filter((game) => game.id !== e.id)
      let newlistedRounds = this.state.listedRounds.filter(
        (item) => item !== parseInt(e.round)
      )

      await axios.post('/api/deletegame', { gameId: e.id })
      this.setState({ games: newgames, listedRounds: newlistedRounds })
    } catch (error) {
      console.log(error)
    }
  }

  handleEditGame = (e) => {
    //let editingGame = this.state.editingGame
    let editingGame = e
    let editingRound = e.round
    e.teamIdA = this.state.idA
    e.teamIdB = this.state.idB

    this.setState({
      editingGame: editingGame,
      openGame: e.game_name,
      editingRound: editingRound,
    })
  }

  handleClickNames = (e) => {
    this.setState({ showTeamsModal: true })
  }

  getTeamMembersTable = () => {
    let playersA = this.state.playersA
    let playersB = this.state.playersB
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width='2'>
              {' '}
              Team A: {this.state.nameA}
            </Table.HeaderCell>
            <Table.HeaderCell width='2'>
              {' '}
              Team B: {this.state.nameB}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {playersA.map((player, idx) => {
            return (
              <Table.Row key={idx}>
                <Table.Cell>{playersA[idx].text}</Table.Cell>
                <Table.Cell>{playersB[idx].text}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    )
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />
    } else {
      let games = this.state.games
      return (
        <div>
          <Button primary onClick={this.handleAddGame}>
            Add Game
          </Button>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width='1'>Delete</Table.HeaderCell>
                <Table.HeaderCell width='1'>Edit</Table.HeaderCell>
                <Table.HeaderCell width='1'>Round</Table.HeaderCell>
                <Table.HeaderCell width='3'>Game</Table.HeaderCell>
                <Table.HeaderCell onClick={this.handleClickNames} width='2'>
                  {this.state.nameA}
                </Table.HeaderCell>
                <Table.HeaderCell onClick={this.handleClickNames} width='2'>
                  {this.state.nameB}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {games.map((game, index) => {
                return (
                  <Table.Row key={game.round}>
                    <Table.Cell>
                      <Icon
                        name='delete'
                        link
                        onClick={() => this.handleDeleteGame(game)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        name='edit'
                        link
                        onClick={() => this.handleEditGame(game)}
                      />
                    </Table.Cell>
                    <Table.Cell>{game.round}</Table.Cell>
                    <Table.Cell>{game.game_name}</Table.Cell>
                    <Table.Cell>{game.points_a}</Table.Cell>
                    <Table.Cell>{game.points_b}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell />
                <Table.HeaderCell />
                <Table.HeaderCell />
                <Table.HeaderCell>
                  <b>{this.state.sumA}</b>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <b>{this.state.sumB}</b>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>

          <Modal
            id='addingGameModal'
            size='fullscreen'
            open={this.state.isAddingGame}
            onClose={this.closeAddingGame}
            closeOnDimmerClick={false}
          >
            <Modal.Header>Add new Game</Modal.Header>
            <Modal.Content scrolling={true}>
              {
                <AddGame
                  listedRounds={this.state.listedRounds}
                  addGame={this.addGame}
                  tourId={this.props.tourId}
                  rounds={this.props.rounds}
                  gameTypes={this.state.gameTypes}
                  closeModal={this.closeAddingGame}
                />
              }
            </Modal.Content>
          </Modal>

          <Modal
            id='editMatchPlay'
            size='fullscreen'
            open={this.state.openGame === 'Matchplay'}
            onClose={this.closeEditGame}
            closeOnDimmerClick={false}
          >
            <Modal.Header>
              Match Play - Round {this.state.editingRound}{' '}
            </Modal.Header>
            <Modal.Content scrolling={true}>
              {
                <MatchPlay
                  game={this.state.editingGame}
                  tourId={this.props.tourId}
                  idA={this.state.idA}
                  description={this.state.description}
                  idB={this.state.idB}
                  nameA={this.state.nameA}
                  nameB={this.state.nameB}
                  updatePoints={this.updatePoints}
                  closeModal={this.closeEditGame}
                />
              }
            </Modal.Content>
          </Modal>

          <Modal
            id='editTwosomePlay'
            size='fullscreen'
            open={this.state.openGame === 'Twosome'}
            onClose={this.closeEditGame}
            closeOnDimmerClick={false}
          >
            <Modal.Header>
              Twosome - Round {this.state.editingRound}{' '}
            </Modal.Header>
            <Modal.Content scrolling={true}>
              {
                <Twosome
                  game={this.state.editingGame}
                  tourId={this.props.tourId}
                  idA={this.state.idA}
                  description={this.state.description}
                  idB={this.state.idB}
                  nameA={this.state.nameA}
                  nameB={this.state.nameB}
                  updatePoints={this.updatePoints}
                  closeModal={this.closeEditGame}
                />
              }
            </Modal.Content>
          </Modal>

          <Modal
            id='editStablefordPlay'
            size='fullscreen'
            open={this.state.openGame === 'Stableford'}
            onClose={this.closeEditGame}
            closeOnDimmerClick={false}
          >
            <Modal.Header>
              Stableford - Round {this.state.editingRound}{' '}
            </Modal.Header>
            <Modal.Content scrolling={true}>
              {
                <Stableford
                  game={this.state.editingGame}
                  tourId={this.props.tourId}
                  idA={this.state.idA}
                  idB={this.state.idB}
                  description={this.state.description}
                  nameA={this.state.nameA}
                  nameB={this.state.nameB}
                  updatePoints={this.updatePoints}
                  closeModal={this.closeEditGame}
                />
              }
            </Modal.Content>
          </Modal>

          <Modal
            id='editLonesomeGame'
            size='fullscreen'
            open={this.state.openGame === 'Lonesome'}
            onClose={this.closeEditGame}
            closeOnDimmerClick={false}
          >
            <Modal.Header>
              Lonesome - Round {this.state.editingRound}{' '}
            </Modal.Header>
            <Modal.Content scrolling={true}>
              {
                <Lonesome
                  game={this.state.editingGame}
                  tourId={this.props.tourId}
                  idA={this.state.idA}
                  idB={this.state.idB}
                  description={this.state.description}
                  nameA={this.state.nameA}
                  nameB={this.state.nameB}
                  updatePoints={this.updatePoints}
                  closeModal={this.closeEditGame}
                />
              }
            </Modal.Content>
          </Modal>

          <Modal
            id='showTeams'
            size='fullscreen'
            open={this.state.showTeamsModal}
            onClose={this.closeShowTeams}
            closeOnDimmerClick={true}
          >
            <Modal.Header>Team Members</Modal.Header>
            <Modal.Content scrolling={true}>
              {this.state.showTeamsModal ? this.getTeamMembersTable() : ''}
            </Modal.Content>
          </Modal>
        </div>
      )
    }
  }
}

export default GamesSummary
