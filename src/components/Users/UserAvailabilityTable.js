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

  elementHasId(element){
    return typeof element.id != 'undefined'
  }

  toggleTableDropdown(index){
    // store which dropdown was selected
    const el = document.getElementById(`dropdown-${index}`)
    // if there are dropdowns that are active, lets find them
    const els = document.getElementsByClassName('menu-dropdown--active')
    // we need to remove this class if it is out there
    if(els[0] && els[0].id === `dropdown-${index}`){
      els[0].classList.remove('menu-dropdown--active')
    }
    else if(els[0]){
      els[0].classList.remove('menu-dropdown--active')
      el.classList.add('menu-dropdown--active')
    }
    //if there aren't any active, lets add the class
    else {
      el.classList.add('menu-dropdown--active')
    }
  }

  render() {
   
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
        Header: props => <span>Date <img src={SwapIcon} alt="Change Date Order Icon" /></span>,
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
        headerClassName: 'cell-small',
        filterable: false,
        sortable: false,
        Cell: props => {
          return (     
            <div className="action-container">
              <span className="action" onClick={() => this.toggleTableDropdown(props.index)}><img src={ActionIcon} alt="Table Icon for Actions" /></span>
              <div className="menu-dropdown" id={`dropdown-${props.index}`}>
              <div className="arrow-up"></div>
                <div className="menu-dropdownView">
                  <ul className="menu-dropdownItems">
                    {
                      props.original.dateType.toLowerCase() === 'requested'
                        ? <li className="menu-dropdown-item red">Delete</li>
                        : <li className="menu-dropdown-item">View Jobs</li>
                    }
                  </ul>
                </div>
              </div>
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
      // className="-striped -highlight"
    />
  }
}