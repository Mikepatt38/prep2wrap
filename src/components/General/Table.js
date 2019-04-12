import ReactTable from "react-table"
import React, { Component } from 'react'
import 'react-table/react-table.css'

export class Table extends Component {
  render() {
   
    return <ReactTable
      data={this.props.data}
      columns={this.props.columns}
      defaultPageSize={10}
      minRows={1}
      NoDataComponent={() => null}
    />
  }
}
