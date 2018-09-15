import React, { Component } from "react";
import dateFns from "date-fns"

class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: null,
    selectedDateType: '',
    bookedDates: []
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    )
  }

  renderDays() {
    const dateFormat = "dddd"
    const days = []
    let startDate = dateFns.startOfWeek(this.state.currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state
    const monthStart = dateFns.startOfMonth(currentMonth)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate = dateFns.startOfWeek(monthStart)
    const endDate = dateFns.endOfWeek(monthEnd)
    const dateFormat = "D"
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ""
    let compareDate = ""
    let busyDate = []

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat)
        compareDate = dateFns.format(day, "MM/DD/YYYY")
        const cloneDay = day
        this.props.dates.map( (date) => {
          compareDate === date.date ? this.state.bookedDates.push(dateFns.format(day, "MM/DD/YYYY")) : ''
        })
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                :  this.state.bookedDates.includes(compareDate) ? "selected" : ""
            }`}
            key={day}
            onClick={ () => 
              this.state.bookedDates.includes(dateFns.format(dateFns.parse(cloneDay), "MM/DD/YYYY"))
                ? this.onDateClick(dateFns.parse(cloneDay))
                : this.setDateClick(dateFns.parse(cloneDay))
            }
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        )
        day = dateFns.addDays(day, 1)
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = []
    }
    return <div className="body">{rows}</div>
  }
  
  setDateClick = day => {
    this.setState({
      bookDate: day
    },
    () => {
      this.props.setSelectedDate(day)
    })
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    },
    () => {
      this.props.onSelectedDate(dateFns.format(this.state.selectedDate, "MM/DD/YYYY"))
    })
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    })
  }

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    })
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    )
  }
}

export default Calendar