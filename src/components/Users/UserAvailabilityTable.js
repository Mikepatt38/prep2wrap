import React, { Component } from 'react'
import { Table } from '../General/Table'
import { Link } from 'react-router-dom'
import ActionIcon from '../../img/icon-action.svg'

export class UserAvailabilityTable extends Component {
  state = {
    availability:     
      // Sort the dates from most recent to latest
      // sort and reverse both manipulate the original array
      // so no need to create a new var
      this.props.dates.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      }).reverse(),
    loading: this.props.dates ? false : true
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.dates !== this.props.dates){
      this.setState({
        availability: this.props.dates
      })
    }
  }

  render() {
   
    const columns = [
      {
        id: 'Status', // Required because our accessor is not a string
        Header: 'Type',
        headerClassName: 'cell-small',
        Cell: props => props.original.dateType.toLowerCase() === 'booked' ? <span className="cell-status active">Booked</span> : props.original.dateType.toLowerCase() === 'requested' ? <span className="cell-status personal">Personal</span> : <span className="cell-status unavailable">Unavailable</span>,
        className: 'cell-small'
      },
      {
        Header: 'Date',
        headerClassName: 'cell-medium',
        accessor: 'date',
        className: 'cell-medium'
      }, 
      {
        Header: 'Date Title',
        accessor: 'dateTitle',
      }, 
      {
        id: 'Actions', // Required because our accessor is not a string
        Header: 'Action',
        headerClassName: 'cell-small',
        Cell: props => <Link to={`/job-overview/${props.original.jobCreatorID}/${props.original.jobID}`} key={props.original.jobID}><img src={ActionIcon} alt="Table Icon for Actions" /></Link>,
        className: 'cell-small'
      }
    ]
   
    return <Table
      data={this.state.availability}
      columns={columns}
      loading={this.state.loading}
      // className="-striped -highlight"
    />
  }
}