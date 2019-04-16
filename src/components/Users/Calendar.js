import React, { Component } from "react";
import dateFns from "date-fns"

class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: null,
    selectedDateType: '',
    bookedDates: [],
    personalDates: []
  }

  componentWillReceiveProps = () => {
    this.setState({
      bookedDates: []
    })
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle" id="calendar">
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
    const { currentMonth } = this.state
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

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat)
        compareDate = dateFns.format(day, "MM/DD/YYYY")
        const cloneDay = day
        this.props.dates.map( (date) => {
          return compareDate === date.date 
            ? date.dateType.toLowerCase() === 'booked' 
              ? this.state.bookedDates.push(dateFns.format(day, "MM/DD/YYYY")) 
              : this.state.personalDates.push(dateFns.format(day, "MM/DD/YYYY"))
            : ''
        })
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                :  this.state.bookedDates.includes(compareDate) 
                  ? "booked" 
                  : this.state.personalDates.includes(compareDate)
                    ? "personal"
                    : ""
            }`}
            key={day}
            // Not sure I want the user to set availability based on clicked the day cell
            // might bring back to allow user to "quick view" a blocked out date
            // onClick={ () => 
            //   this.state.bookedDates.includes(dateFns.format(dateFns.parse(cloneDay), "MM/DD/YYYY"))
            //     // ? this.onDateClick(dateFns.parse(cloneDay))
            //     ? null // null while trying to figure out what to do when user clicks date that is booked
            //     : this.setDateClick(dateFns.parse(cloneDay))
            // }
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