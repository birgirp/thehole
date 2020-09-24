// External libs
import React, { Component } from 'react'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
// Own components...
import Loading from '../../Loading/Loading'

import NumericEditor from '../../Application/Tour/NumericEditor'
//import NumericEditor from './NumericEditor.js'

class CourseHoles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courseId: '',
      loading: false,
      columnDefs: [
        { headerName: '', field: 'rowname' },
        {
          headerName: 'H1',
          field: 'h1',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H2',
          field: 'h2',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H3',
          field: 'h3',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H4',
          field: 'h4',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H5',
          field: 'h5',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H6',
          field: 'h6',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H7',
          field: 'h7',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H8',
          field: 'h8',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H9',
          field: 'h9',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H10',
          field: 'h10',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H11',
          field: 'h11',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H12',
          field: 'h12',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H13',
          field: 'h13',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H14',
          field: 'h14',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H15',
          field: 'h15',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H16',
          field: 'h16',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H17',
          field: 'h17',
          width: 40,
          cellEditorFramework: NumericEditor,
        },
        {
          headerName: 'H18',
          field: 'h18',
          width: 40,
          cellEditorFramework: NumericEditor,
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
      ],
      defaultColDef: {
        onCellValueChanged: this.onCellValueChanged,
        resizable: false,
        editable: this.checkEditFunction,
        width: 70,
        suppressMovable: true,
      },
    }
  }

  componentDidMount() {
    this.props.action(this.state.rowData)
  }

  checkEditFunction = (params) => {
    //params.node - for row identity
    //params.column - for column identity

    return params.column.colId !== 'rowname' // - just as sample
  }

  onCellValueChanged = (e) => {
    this.props.action(this.state.rowData)
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    } else {
      //<div className="ag-theme-balham" style={{ height: '200px', width: '1200px'  }}>
      return (
        <div>
          <h1>Holes </h1>
          <br />

          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
          />
          <br />
        </div>
      )
    }
  }
}

export default CourseHoles
