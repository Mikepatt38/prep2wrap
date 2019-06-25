import React, { Component } from 'react'
import { Table } from '../General/Table'
import { Link } from 'react-router-dom'
import ActionIcon from '../../img/icon-action.svg'
import TrashIcon from '../../img/icon-trash.svg'
import SwapIcon from '../../img/icon-swap.svg'

export class UserAvailabilityTable extends Component {
  state = {
    availability:     
      // Sort the dates from most recent to latest
      // sort and reverse both manipulate the original array
      // so no need to create a new var
      this.formatDatesArr(this.props.dates),
    loading: this.props.dates ? false : true,
    dateTypeKey: 0
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.dates !== this.props.dates){
      this.setState({
        availability: this.props.dates,
        loading: false
      })
    }
  }

  formatDatesArr(dates){
    // lets sort the dates in order from newest to oldest
    dates.sort((a,b) => {
      return new Date(b.date) - new Date(a.date)
    }).reverse()
        
    // loop through the dates and only add one we haven't seen to the new dates arr
    let uniqueDates = []
    dates.filter( (item, pos) => {
      if(!uniqueDates.some( el => el.dateTitle === item.dateTitle)) uniqueDates.push(item)
    })

    return uniqueDates
  }

  elementHasId(element){
    return typeof element.id != 'undefined'
  }

  deleteCreatedDate(currentDates, dateToDelete){
    this.setState({
      loading: true
    })
    this.props.removeAvailabilityDate(this.props.currentUser.id, currentDates, dateToDelete)
  }

  toggleRowActions(index){
    // store which row was selected
    const el = document.getElementById(`row-${index}`)
    const elAction = document.getElementById(`action-${index}`)
    // if there are rows that are active, lets find them
    const els = document.getElementsByClassName('row-actions-active')
    const elsAction = document.getElementsByClassName('action-hidden')
    // we need to remove this class if it is out there
    if(els[0] && els[0].id === `row-${index}`){
      els[0].classList.remove('row-actions-active')
      elsAction[0].classList.remove('action-hidden')
    }
    else if(els[0]){
      els[0].classList.remove('row-actions-active')
      elsAction[0].classList.remove('action-hidden')
      el.classList.add('row-actions-active')
      elAction.classList.add('action-hidden')
    }
    //if there aren't any active, lets add the class
    else {
      el.classList.add('row-actions-active')
      elAction.classList.add('action-hidden')
    }
  }

  render() {

    const { dateTypeKey } = this.state
   
    const columns = [
      {
        id: 'Status', // Required because our accessor is not a string
        Header: 'Type',
        headerClassName: 'cell-small',
        filterable: false,
        sortable: false,
        Cell: props => props.original.dateType.toLowerCase() === 'booked' ? <span className="cell-status active">Booked</span> : props.original.dateType.toLowerCase() === 'requested' ? <span className="cell-status personal">Personal</span> : <span className="cell-status unavailable">Unavailable</span>,
        className: 'cell-small'
      },
      {
        Header: props => <span>Start Date <img src={SwapIcon} alt="Change Date Order Icon" /></span>,
        headerClassName: 'cell-medium',
        accessor: 'date',
        className: 'cell-medium'
      }, 
      {
        Header: 'Date Title',
        filterable: false,
        sortable: false,
        accessor: 'dateTitle',
      }, 
      {
        id: 'Actions', // Required because our accessor is not a string
        Header: 'Action',
        headerClassName: 'cell-action',
        filterable: false,
        sortable: false,
        Cell: props => {
          return (     
            <div className="action-container">
              <div 
                className="action" 
                onClick={() => this.toggleRowActions(props.index)} 
                id={`action-${props.index}`}
              >
                <img src={ActionIcon} alt="Table Icon for Actions" />
              </div>
              <ul className="table-action-list" id={`row-${props.index}`}>
                {
                  props.original.dateType.toLowerCase() === 'requested'
                    ? <li className="table-action-list-item" onClick={() => this.deleteCreatedDate(this.state.availability, props.original.date)}>Delete</li>
                    : <li className="table-action-list-item"><Link to="/jobs">View Jobs</Link></li>
                }
              </ul>
            </div>
          )
        },
        className: 'cell-small cell-action'
      }
    ]
   
    return <Table
      data={this.state.availability}
      columns={columns}
      loading={this.state.loading}
    />
  }
}