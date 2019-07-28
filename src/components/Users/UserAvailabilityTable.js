import React, { Component } from 'react'
import { Table } from '../General/Table'
import { Link } from 'react-router-dom'
import EmptyState from "../General/EmptyState"
import Loading from "../General/Loading"
import CalendarIllustration from '../../img/illustrations/calendar.svg'
import ActionIcon from '../../img/icon-action.svg'
import SwapIcon from '../../img/icon-swap.svg'

export class UserAvailabilityTable extends Component {
  state = {
    availability: this.props.dates ? this.props.dates : [],
    hasAvailability: this.props.dates ? this.props.dates.length > 0 : false,
    availabilityByActiveMonth: this.filterAvailabilityByMonth(this.props.dates ? this.props.dates : []),
    loading: true,
    pageLoading: true,
    tableLoading: false
  }

  componentDidMount = () => {
    this.setState({ 
      loading: false,
    })
    setTimeout(() => {
      this.setState({
        pageLoading: false
    })}, 500)
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.currentUser.availability !== this.props.currentUser.availability){
      this.setState({
        tableLoading: true,
        availability: this.props.dates ? this.props.dates : [],
        availabilityByActiveMonth: this.filterAvailabilityByMonth(this.props.dates ? this.props.dates : [])
      })
      this.getUsersCurrentAvailability()
      setTimeout( () => {
        this.setState({
          tableLoading: false
        })
      }, 350)
    }
    if(prevProps.activeMonth !== this.props.activeMonth){
      this.setState({
        tableLoading: true,
        availabilityByActiveMonth: this.filterAvailabilityByMonth(this.props.dates ? this.props.dates : [])
      })
      setTimeout( () => {
        this.setState({
          tableLoading: false
        })
      }, 350)
    }
    if(prevProps.dates !== this.props.dates){
      this.setState({
        availability: this.props.dates ? this.props.dates : [],
        hasAvailability: this.props.dates ? this.props.dates.length > 0 : false
      })
    }
  }

  getUsersCurrentAvailability = async () => {
    const userAvailability = this.props.currentUser.availability
    this.setState({
      availability: this.userAvailability,
      availabilityByActiveMonth: this.filterAvailabilityByMonth(this.props.dates ? this.props.dates : []),
      loading: false
    })
  }

  elementHasId(element){
    return typeof element.id != 'undefined'
  }

  deleteCreatedDate(currentDates, dateToDelete){
    this.setState({ loading: true })
    this.props.removeAvailabilityDate(this.props.currentUser.id, currentDates, dateToDelete)
  }

  filterAvailabilityByMonth(availability){
    let updatedAvailability = []
    availability.map(date => {
      const arrPos = date.date.split('/')[0] -1
      if(arrPos % this.props.activeMonth === 0){
        updatedAvailability.push(date)
      }
    })
    return updatedAvailability
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

    if(this.state.pageLoading || this.state.tableLoading){
      return (
        <Loading />
      )
    }
    const columns = [
      {
        id: 'Status', // Required because our accessor is not a string
        Header: 'Type',
        headerClassName: 'cell-small',
        filterable: false,
        sortable: false,
        Cell: props => props.original.dateType.toLowerCase() === 'booked' ? <span className="cell-status booked">Booked</span> : props.original.dateType.toLowerCase() === 'requested' ? <span className="cell-status personal">Personal</span> : <span className="cell-status personal">Unavailable</span>,
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
                  props.original.dateType.toLowerCase() === 'requested' || props.original.dateType.toLowerCase() === 'personal'
                    ? <li className="table-action-list-item" onClick={() => this.deleteCreatedDate(this.state.availability, props.original)}>Delete</li>
                    : <li className="table-action-list-item"><Link to="/jobs">View Jobs</Link></li>
                }
              </ul>
            </div>
          )
        },
        className: 'cell-small cell-action'
      }
    ]
   
    return (
      <React.Fragment>
      {
        this.state.hasAvailability 
        ?
          this.state.availabilityByActiveMonth.length 
          ?
          <Table
            data={this.state.availabilityByActiveMonth}
            columns={columns}
            loading={this.state.loading}
          />
          :
          <div className="empty-state">
            <p>You currently have no booked or personal days for this month.</p>
          </div>
        :
        <EmptyState
          imgSrc={CalendarIllustration}
          imgAlt="Availability Page Illustration"
          title="You currently do not have any availability data."
          text="This is where all your availability data will appear. You will have a month by month day calendar and a table list view of all your availability dates color coded."
        />
      }
      </React.Fragment>
    )
  }
}