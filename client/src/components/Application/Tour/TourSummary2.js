import React, { Component } from 'react'
import axios from 'axios'
import { Modal } from 'semantic-ui-react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import Loading from '../../Loading/Loading'
import ViewScorecard from './ViewScorecard'

class TourSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetchingRank: false,
      isRankingCompetion: false,
      isOpenViewScorecard: false,
      viewRoundNumber: '',
      scoreCardPlayer: '',
      scorecardData: null,
      rankData: [],
      sumData: [],
      isLoading: false,
      columnDefs: [],
      rowData: [],
      overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
      overlayNoRowsTemplate: '<span> </span>',
      scoreData: [],
      defaultColDef: {
        resizable: false,
        editable: this.checkEditFunction,
        width: 70,
        suppressMovable: true,
        sortable: false,
      },
    }
  }
  onGridReady = (params) => {
    this.gridApi = params.api
    this.columnApi = params.columnApi
    params.api.setRowData(this.state.rowData)
  }

  checkEditFunction = (params) => {
    //params.node - for row identity
    //params.column - for column identity
    //   console.log(params.column);
    return false
  }

  componentDidMount() {
    console.log('mounting...')
    let tourId = this.props.tourId
    let rounds = this.props.rounds
    let bestof = this.props.bestof
    let is_ranking = this.props.is_ranking
    this.setState({ isLoading: true })
    let columnDefs = [
      { headerName: 'Player', field: 'player', width: 100, pinned: 'left' },
    ]
    let sumcol = { headerName: 'Sum', field: 'sum', width: 80 }
    columnDefs.push(sumcol)

    var i
    for (i = 1; i < rounds + 1; i++) {
      let col = { headerName: 'Round' + i, field: 'r' + i, width: 80 }
      columnDefs.push(col)
    }

    let parscol = { headerName: 'Pars', field: 'pars', width: 80 }
    columnDefs.push(parscol)

    let birdiescol = { headerName: 'Birdies', field: 'birdies', width: 80 }
    columnDefs.push(birdiescol)

    let eaglescol = { headerName: 'Eagles', field: 'eagles', width: 80 }
    columnDefs.push(eaglescol)

    this.setState({ columnDefs: columnDefs })

    axios
      .post('/api/gettourscorecards', { tourId: tourId })
      .then((res) => {
        if (!res.data) {
          throw new Error('No scorecards found')
        }
        console.log('res.data')
        console.log(res.data)
        this.setState(
          { scoreData: res.data, isRankingCompetion: is_ranking },
          () => this.createRowData()
        )
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }

  createRowData = () => {
    let rounds = this.props.rounds
    //  console.log(rounds)

    let players = this.props.players
    // console.log(players)

    let scoreData = this.state.scoreData
    //console.log(scoreData)
    let rowData = []
    players.forEach((element) => {
      let row = { player_id: element.player_id, player: element.full_name }
      let sum = 0
      let key

      let z
      for (z = 1; z < rounds + 1; z++) {
        key = 'r' + z
        row[key] = ''
      }
      let p_id = element.player_id

      scoreData.forEach((item, index) => {
        if (item.player_id === p_id) {
          let key2 = 'r' + item.tour_round
          row[key2] = item.points
          sum = sum + parseInt(item.points)
        }
      })
      row['sum'] = sum

      rowData.push(row)

      console.log('rowData')
      console.log(rowData)
    })

    this.setState({ rowData: rowData }, () => {
      if (this.state.isRankingCompetion) {
        this.fetchRankData()
      } else {
        if (this.props.rounds > this.props.bestof) {
        }
      }
    })
    this.fetchPars()
  }

  fetchPars = () => {
    let tourId = this.props.tourId
    axios
      .post('/api/getpars', { tourId: tourId })
      .then((res) => {
        if (!res.data) {
          throw new Error('No pars found')
        }
        let parData = res.data
        let rowData = this.state.rowData

        parData.forEach((item) => {
          let index = rowData.findIndex((x) => x.player_id === item.player_id)
          rowData[index]['pars'] = item.pars
          rowData[index]['birdies'] = item.birdies
          rowData[index]['eagles'] = item.eagles
          //console.log(index)
        })
        rowData.sort((a, b) => (a.sum < b.sum ? 1 : -1))
        //rowData.sort((a, b) => (a.sum < b.sum ? 1 : -1))

        this.setState({ rowData: rowData })
        if (!this.state.isFetchingRank) {
          this.setState({ isLoading: false })
        }
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }
  /*
  toggleCheckbox = (e, v) => {
    this.setState({ isRankingCompetion: v.checked, isLoading: true })

    let rankData = this.state.rankData
    let tourId = this.props.tourId

    if (rankData.length === 0) {
      console.log('calling rankdata api')
      axios
        .post('/api/getranksum', { tourId: tourId })
        .then((res) => {
          if (!res.data) {
            throw new Error('No rankdata found')
          }

          this.setState({ rankData: res.data, isLoading: false }, () =>
            this.toggleRowData(true, v.checked)
          )
        })
        .catch((err) => {
          console.log(err)
          this.setState({ isLoading: false })
        })
    } else {
      this.toggleRowData(false, v.checked)
    }
  }
*/
  fetchRankData = async () => {
    let tourId = this.props.tourId
    this.setState({ isFetchingRank: true })
    try {
      let res = await axios.post('/api/getranksum', { tourId: tourId })

      if (!res.data) {
        throw new Error('No rankdata found')
      }
      let rankData = res.data
      this.setState(
        { rankData: rankData }
        //  () =>        this.toggleRowData(true, true)
      )
      let sumData = []

      let rowData = this.state.rowData
      console.log(rankData)
      rankData.forEach((rank) => {
        let index = rowData.findIndex((row) => row.player_id === rank.player_id)

        sumData.push({
          player_id: rank.player_id,
          sum: rowData[index]['sum'],
        })

        rowData[index]['sum'] = parseInt(rank.sum)
      })

      rowData.sort((a, b) => (a.sum < b.sum ? 1 : -1))
      this.setState(
        {
          rowData: rowData,
          sumData: sumData,
          isLoading: false,
          isFetchingRank: false,
        },
        () => this.gridApi.setRowData(this.state.rowData)
      )
    } catch (error) {
      console.log(error)
      this.setState({ isLoading: false })
    }
  }

  closeViewScorecard = () => {
    this.setState({ isOpenViewScorecard: false })
  }

  handleCellClicked = (e) => {
    if (e.column.colId.startsWith('r') && e.value !== '') {
      let playerName = e.data.player
      let playerId = e.data.player_id
      let tourId = this.props.tourId
      let roundNum = parseInt(e.column.colId.substring(1))

      axios
        .post('/api/getplayerscorecard', {
          tourId: tourId,
          roundNum: roundNum,
          playerId: playerId,
        })
        .then((res) => {
          if (!res.data) {
            throw new Error('No scorecard data found')
          }

          this.setState({
            scoreCardPlayer: playerName,
            scorecardData: res.data[0],
            viewRoundNumber: roundNum,
            isOpenViewScorecard: true,
          })
        })
        .catch((err) => {
          console.log(err)
          this.setState({ isLoading: false })
        })
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />
    } else {
      return (
        <div>
          <h1>
            {' '}
            Tour Summary:{' '}
            {this.state.isRankingCompetion
              ? 'Ranking Competition'
              : 'Stableford Competition'}{' '}
          </h1>

          <br />
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            enterMovesDownAfterEdit={false}
            enterMovesDown={false}
            onGridReady={this.onGridReady}
            onCellDoubleClicked={this.handleCellClicked}
            overlayLoadingTemplate={this.state.overlayLoadingTemplate}
            overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
          />
          <br />
          <Modal
            id='tourRoundModal'
            size='fullscreen'
            open={this.state.isOpenViewScorecard}
            onClose={this.closeViewScorecard}
            closeOnDimmerClick={false}
          >
            <Modal.Header>
              {this.state.scoreCardPlayer}: Round {this.state.viewRoundNumber}
            </Modal.Header>
            <Modal.Content scrolling={true}>
              {
                <ViewScorecard
                  scorecardData={this.state.scorecardData}
                  closeModal={this.closeViewScorecard}
                />
              }
            </Modal.Content>
          </Modal>
        </div>
      )
    }
  }
}

export default TourSummary
