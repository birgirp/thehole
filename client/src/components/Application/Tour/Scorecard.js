import React, { Component } from 'react'
import { Button, Grid, Input, Dropdown, Checkbox } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import Loading from '../../Loading/Loading'
import { DateInput } from 'semantic-ui-calendar-react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import './scorecard.css'
//import { ScoreCellRenderer } from './ScoreCellRenderer'
import NumericEditor from './NumericEditor.js'

class Scorecard extends Component {
  constructor(props) {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1 //January is 0!
    var yyyy = today.getFullYear()

    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd
    super(props)
    this.state = {
      isOneClick: true,
      scorecardId: '',
      courses: [],
      isLoading: false,
      createNew: false,
      noScores: false,
      scoresTouched: false,
      dateTouched: false,
      handicapTouched: false,
      courseTouched: false,
      selectedCourseId: null,
      selectedCourseName: '',
      handicap: 0,
      roundDate: today,
      status: 'Saved',
      scores: null,
      holeIds: [],
      sumStrokes: 0,
      sumPoints: 0,
      isMissingCourse: false,
      isIncomplete: false,
      submitting: false,
      columnDefs: [
        { headerName: '', field: 'rowname' },
        {
          headerName: '1',
          field: 'h1',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '2',
          field: 'h2',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '3',
          field: 'h3',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '4',
          field: 'h4',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '5',
          field: 'h5',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '6',
          field: 'h6',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '7',
          field: 'h7',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '8',
          field: 'h8',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '9',
          field: 'h9',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'Out',
          field: 'sumf9',
          width: 40,
          cellStyle: { fontWeight: 'bold' },
        },
        {
          headerName: '10',
          field: 'h10',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '11',
          field: 'h11',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '12',
          field: 'h12',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '13',
          field: 'h13',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '14',
          field: 'h14',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '15',
          field: 'h15',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '16',
          field: 'h16',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '17',
          field: 'h17',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: '18',
          field: 'h18',
          width: 40,
          cellStyle: this.cellStyling,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'In',
          field: 'sums9',
          width: 40,
          cellStyle: { fontWeight: 'bold' },
        },
        {
          headerName: 'Total',
          field: 'sum18',
          width: 40,
          cellStyle: { fontWeight: 'bold' },
        },
      ],
      rowData: [
        {
          rowname: 'Par',
          h1: '',
          h2: '',
          h3: '',
          h4: '',
          h5: '',
          h6: '',
          h7: '',
          h8: '',
          h9: '',
          h10: '',
          h11: '',
          h12: '',
          h13: '',
          h14: '',
          h15: '',
          h16: '',
          h17: '',
          h18: '',
        },
        {
          rowname: 'Hcp',
          h1: '',
          h2: '',
          h3: '',
          h4: '',
          h5: '',
          h6: '',
          h7: '',
          h8: '',
          h9: '',
          h10: '',
          h11: '',
          h12: '',
          h13: '',
          h14: '',
          h15: '',
          h16: '',
          h17: '',
          h18: '',
        },
        {
          rowname: 'Score',
          h1: '',
          h2: '',
          h3: '',
          h4: '',
          h5: '',
          h6: '',
          h7: '',
          h8: '',
          h9: '',
          h10: '',
          h11: '',
          h12: '',
          h13: '',
          h14: '',
          h15: '',
          h16: '',
          h17: '',
          h18: '',
          isSingle: true,
        },
        {
          rowname: 'Points',
          h1: '',
          h2: '',
          h3: '',
          h4: '',
          h5: '',
          h6: '',
          h7: '',
          h8: '',
          h9: '',
          h10: '',
          h11: '',
          h12: '',
          h13: '',
          h14: '',
          h15: '',
          h16: '',
          h17: '',
          h18: '',
        },
      ],
      defaultColDef: {
        resizable: false,
        editable: this.checkEditFunction,
        width: 70,
        suppressMovable: true,
        onCellValueChanged: this.onCellValueChanged,
        //  suppressKeyboardEvent: this.suppressKeyboardEvent
      },
      // frameworkComponents: { scoreCellRenderer: ScoreCellRenderer },
    }
  }

  isOneclick = () => {
    return this.state.isOneClick
  }
  /*suppressKeyboardEvent = (params) => {
    console.log("suppress??")
    console.log(params)
    let rowname = params.data.rowname
    console.log(rowname)
    return true
 
  }*/

  cellEditing = (params) => {
    //   return <input type='number' />
  }

  /* cellRendering = (params) => {
     // return {inputType: 'number'}
     // return params.value.toString()
     return <input type='number'>{params.value}</input>
   } */

  cellStyling = (params) => {
    // let background = { background: 'white', textAlign: 'center' }
    let background = { background: 'white' }
    let rowData = this.state.rowData
    let hole = params.colDef.field
    let rowName = params.node.data.rowname
    let par = rowData[0][hole]
    let score = params.value
    if (rowName === 'Score' && score) {
      background = { background: '#ffffcc' }
      let delta = score - par
      if (delta > 2) {
        background = { background: '#ff3333' }
      }
      if (delta === 1) {
        background = { background: '#ffb3b3' }
      }
      if (delta === 0) {
        background = { background: '#99ddff' }
      }
      if (delta === -1) {
        background = { background: '#b3ffb3' }
      }
      if (delta === -2) {
        background = { background: '#66ff66' }
      }
    }
    return background
  }

  onCellFocused = (e) => {}

  onCellKeyPress = (e) => {}

  onKeyDown = (e) => {
    var keyPressed = e.event.key
    if (keyPressed === 'Enter') {
      this.gridApi.tabToNextCell()
      let gridCell = this.gridApi.getFocusedCell()
      this.gridApi.rowRenderer.startEditingCell(gridCell, null, null)
    }
  }

  onCellValueChanged = (e) => {
   
    let isSubmitted = this.state.status === 'Submitted' ? true : false
    let rowData = this.state.rowData
    if (!Number.isInteger(Number(e.newValue)) || isSubmitted) {
      rowData[2][e.column.colId] = e.oldValue
      this.setState({ rowData: rowData })
    } else {
      this.setState({ scoresTouched: true })
      let par = rowData[0][e.column.colId]
      let hcp = rowData[1][e.column.colId]
      let handicap = this.state.handicap
      let score = e.newValue
      let points = ''
      if (score) {
        points = this.calculatePointsPerHole(
          parseInt(par),
          parseInt(hcp),
          parseInt(score),
          parseInt(handicap)
        )
      }

      rowData[3][e.column.colId] = points

      this.setState({ rowData: rowData }, () => this.sumScores())
    }
    e.api.refreshCells()
  }

  onGridReady = (params) => {
    this.gridApi = params.api
    this.columnApi = params.columnApi
    params.api.setRowData(this.state.rowData)
  }

  sumScores = () => {
    let sumStrokes = 0
    let sumPoints = 0
    let rowData = this.state.rowData
    var i
    for (i = 1; i < 10; i++) {
      if (rowData[2]['h' + i] !== '') {
        sumStrokes = sumStrokes + parseInt(rowData[2]['h' + i])
        sumPoints = sumPoints + parseInt(rowData[3]['h' + i])
      }
    }

    rowData[2]['sumf9'] = sumStrokes
    rowData[3]['sumf9'] = sumPoints
    sumStrokes = 0
    sumPoints = 0
    for (i = 10; i < 19; i++) {
      if (rowData[2]['h' + i] !== '') {
        sumStrokes = sumStrokes + parseInt(rowData[2]['h' + i])
        sumPoints = sumPoints + parseInt(rowData[3]['h' + i])
      }
    }
    rowData[2]['sums9'] = sumStrokes
    rowData[3]['sums9'] = sumPoints

    rowData[2]['sum18'] = sumStrokes + rowData[2]['sumf9']
    rowData[3]['sum18'] = sumPoints + rowData[3]['sumf9']

    sumStrokes = 0
    sumPoints = 0

    this.setState({ sumStrokes: sumStrokes, sumPoints: sumPoints })
  }

  checkEditFunction = (params) => {
    //params.node - for row identity
    //params.column - for column identity

    let cols = ['rowname', 'sumf9', 'sums9']
    let n = cols.includes(params.column.colId)

    return !n && params.node.rowIndex === 2
    // return params.column.colId !== 'rowname' && params.node.rowIndex === 2
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    var firstline = null
    axios
      .post('/api/getscorecard', {
        tourId: this.props.tourId,
        roundNum: this.props.roundNum,
        playerId: this.props.playerId,
      })
      .then((res) => {
        if (!res.data) {
          this.setState({
            createNew: true,
            handicap: this.props.handicap,
            isLoading: false,
          })
        } else {
          firstline = res.data[0]
          let date = firstline.round_date.split('T')[0]
          this.setState({
            scorecardId: firstline.id,
            status: firstline.status,
            selectedCourseId: firstline.course_id,
            roundDate: date,
            handicap: firstline.handicap,
          })
          let rowData = this.state.rowData
          res.data.forEach((hole) => {
            hole.strokes
              ? (rowData[2]['h' + hole.hole] = hole.strokes)
              : (rowData[2]['h' + hole.hole] = '')
            hole.points
              ? (rowData[3]['h' + hole.hole] = hole.points)
              : (rowData[3]['h' + hole.hole] = '')
          })

          this.setState({ rowData, isLoading: false })
          this.fetchCourse(firstline.course_id)
        }
      })
      .catch((err) => {
        console.log(err)

        axios.get('/users/logout')

        this.setState({ isLoading: false })
        window.location = '/'
      })
  }

  handleCancel = () => {
    this.props.closeModal()
  }

  handleSubmit = () => {
    let status = this.state.status

    console.log(status)
    if (status === 'Submitted') {
      console.log(status)
      this.changeStatus('Saved')
    } else {
      let rowData = this.state.rowData
      let incomplete = false
      for (var i = 0; i < 18; i++) {
        let score = rowData[2]['h' + i]
        if (score === 0 || score === '') {
          incomplete = true
        }
      }
      if (incomplete) {
        this.setState({ isIncomplete: true })
        console.log('incomplete')
      } else {
        if (
          !this.state.courseTouched &&
          !this.state.dateTouched &&
          !this.state.handicapTouched &&
          !this.state.scoresTouched
        ) {
          this.setState({ status: 'Submitted' }, () =>
            this.changeStatus('Submitted')
          )
          //
        } else {
          console.log('handlesave...')
          this.setState({ status: 'Submitted', submitting: true }, () =>
            this.handleSave(true)
          )
        }
      }
    }
  }

  changeStatus = (status) => {
    this.setState({ isLoading: true })
    let scorecardId = this.state.scorecardId
    axios
      .post('/api/updatescorecardstatus', {
        scorecardId: scorecardId,
        status: status,
      })
      .then((res) => {
        this.setState({ isLoading: false, status: status })
        if (status === 'Submitted') {
          this.props.closeModal()
        }
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }

  handleSave = () => {
    if (
      this.state.courseTouched ||
      this.state.dateTouched ||
      this.state.handicapTouched ||
      this.state.scoresTouched
    ) {
      let submitting = this.state.submitting
      if (
        (submitting && this.state.status === 'Submitted') ||
        this.state.status === 'Saved'
      ) {
        if (!this.state.selectedCourseId) {
          this.setState({ isMissingCourse: true })
          return
        }
        let holeIds = this.state.holeIds
        let rowData = this.state.rowData
        let scores = []
        let scorecardId = this.state.scorecardId
        this.setState({ isLoading: true })
        let score = ''
        let points = ''
        var i
        for (i = 1; i < 19; i++) {
          let holeId = holeIds[i - 1]
          score = rowData[2]['h' + i]
          points = rowData[3]['h' + i]
          if (this.state.createNew) {
            scores.push([holeId, score, points])
          } else {
            scores.push({
              scorecard_id: scorecardId,
              hole_id: holeId,
              strokes: parseInt(score),
              points: parseInt(points),
            })
          }
        }

        if (this.state.createNew) {
          axios
            .post('/api/addscorecard', {
              tourId: this.props.tourId,
              roundNum: this.props.roundNum,
              playerId: this.props.playerId,
              courseId: this.state.selectedCourseId,
              roundDate: this.state.roundDate,
              handicap: this.state.handicap,
              status: this.state.status,
              scores: scores,
            })
            .then((res) => {
              this.setState({ isLoading: false })
              this.props.fetchScorecards()
              this.props.closeModal()
            })
            .catch((err) => {
              console.log(err)
              this.setState({ isLoading: false })
            })
        } else {
          axios
            .post('/api/updatescorecard', {
              scorecardId: scorecardId,
              courseId: this.state.selectedCourseId,
              roundDate: this.state.roundDate,
              handicap: this.state.handicap,
              status: this.state.status,
              scores: scores,
            })
            .then((res) => {
              this.setState({ isLoading: false })
              this.props.fetchScorecards()
              this.props.closeModal()
            })
            .catch((err) => {
              console.log(err)
              this.setState({ isLoading: false })
            })
        }
      }
    } else {
      this.props.closeModal()
    }
  }

  calculateAllPoints = () => {
    let rowData = this.state.rowData
    let handicap = this.state.handicap
    var i
    for (i = 1; i < 19; i++) {
      let par = rowData[0]['h' + i]
      let hcp = rowData[1]['h' + i]
      let score = rowData[2]['h' + i]
      if (score !== '') {
        let points = this.calculatePointsPerHole(par, hcp, score, handicap)
        rowData[3]['h' + i] = points
      }
    }

    this.setState({ rowData: rowData }, () => this.sumScores())
  }

  calculatePointsPerHole = (par, hcp, score, handicap) => {
    let pph = this.pointPerHole(handicap, hcp)
    let input = score - pph - par
    let points = this.staplefordPoints(input)
    return points
  }

  pointPerHole = (handicap, holehcp) => {
    let extrapoints = 0
    if (handicap >= holehcp) {
      extrapoints++
    }
    if (holehcp + 18 <= handicap) {
      extrapoints++
    }
    if (holehcp + 36 <= handicap) {
      extrapoints++
    }
    return extrapoints
  }

  staplefordPoints = (strokes) => {
    let points = 0
    switch (strokes) {
      case -3:
        points = 5
        break
      case -2:
        points = 4
        break
      case -1:
        points = 3
        break
      case 0:
        points = 2
        break
      case 1:
        points = 1
        break
      case 2:
        points = 0
        break
      default:
        points = 0
    }
    return points
  }

  fetchCourse = (courseId) => {
    this.setState({ isLoading: true })
    axios
      .post('/api/getholes', { courseId })
      .then((res) => {
        let parf9 = 0
        let pars9 = 0
        let par18 = 0
        let holeIds = []
        let rowData = this.state.rowData
        res.data.forEach((hole) => {
          rowData[0]['h' + hole.hole] = hole.par
          rowData[1]['h' + hole.hole] = hole.handicap
          if (hole.hole < 10) {
            parf9 += hole.par
          }
          if (hole.hole > 9) {
            pars9 += hole.par
          }

          holeIds.push(hole.id)
        })

        par18 = parf9 + pars9
        rowData[0]['sumf9'] = parf9
        rowData[0]['sums9'] = pars9
        rowData[0]['sum18'] = par18

        this.setState({ rowData: rowData, holeIds: holeIds }, () =>
          this.calculateAllPoints()
        )

        this.setState({ isLoading: false })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }

  handleCourseChange = (e, v) => {
    this.setState({ selectedCourseId: parseInt(v.value), courseTouched: true })
    this.fetchCourse(v.value)
  }

  onDateChange = (event, { name, value }) => {
    this.setState({ roundDate: value, dateTouched: true })
  }
  handleHandicapChange = (e, v) => {
    this.setState({ handicap: v.value, handicapTouched: true }, () =>
      this.calculateAllPoints()
    )
  }

  setSingleClickStatus = (e, v) => {
    let rowData = this.state.rowData
    rowData[2].isSingle = v.checked

    this.setState({ isOneClick: v.checked, rowData: rowData })
  }

  render() {
    let isSubmitted = this.state.status === 'Submitted' ? true : false
    if (this.state.isLoading) {
      return <Loading />
    } else {
      let courses = this.props.courses
      let cselection = courses.map((val, index, arr) => {
        return {
          key: parseInt(val.course_id),
          text: val.course_name + '-' + val.tee,
          value: parseInt(val.course_id),
        }
      })
      return (
        <div>
          <Checkbox
            label='Enter score moves to next cell'
            onChange={this.setSingleClickStatus}
            checked={this.state.isOneClick}
          />
          <Grid colums={3}>
            <Grid.Row>
              <Grid.Column width={2}>
                <Input
                  name='Handicap'
                  placeholder='Handicap'
                  max='54'
                  min='0'
                  type='Number'
                  value={this.state.handicap}
                  onChange={this.handleHandicapChange}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Dropdown
                  fluid
                  selection
                  label='Courses'
                  value={this.state.selectedCourseId}
                  placeholder='Select course'
                  options={cselection}
                  onChange={this.handleCourseChange}
                />
                {this.state.isMissingCourse && <span>Select course!</span>}
              </Grid.Column>
              <Grid.Column width={6}>
                <DateInput
                  name='date'
                  placeholder='Date'
                  value={this.state.roundDate}
                  iconPosition='left'
                  dateFormat='YYYY-MM-DD'
                  onChange={this.onDateChange}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br />
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            enterMovesDownAfterEdit={false}
            singleClickEdit={true}
            // stopEditingWhenGridLosesFocus={true}
            enterMovesDown={false}
            onGridReady={this.onGridReady}
            frameworkComponents={this.state.frameworkComponents}
            //onCellKeyPress={this.onCellKeyPress}
            onCellKeyDown={this.onKeyDown}
            //  onCellFocused={this.onCellFocused}
          />
          <br />

          <Grid colums={1}>
            <Grid.Row>
              <Grid.Column>
                {!isSubmitted && (
                  <Button primary onClick={this.handleSave}>
                    Save
                  </Button>
                )}
                <Button primary onClick={this.handleSubmit}>
                  {isSubmitted ? 'UnSubmit' : 'Submit'}
                </Button>
                <Button secondary onClick={this.handleCancel}>
                  Cancel
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {this.state.isIncomplete && (
                  <span className='errorMessage'>
                    Fill in score for all holes!
                  </span>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )
    }
  }
}

export default Scorecard
