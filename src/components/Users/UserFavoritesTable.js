import React, {Component} from 'react'
import { Table } from '../General/Table'
import ActionIcon from '../../img/icon-action.svg'
import AvatarPlaceholder from '../../img/avatar-placeholder-min.png'

export class UserFavoritesTable extends Component {
  state = {
    favorites: this.props.userFavorites,
    loading: this.props.userFavorites ? true : false
  }

  componentDidUpdate(prevProps, preState){
    if(prevProps.userFavorites !== this.props.userFavorites){
      this.setState({
        favorites: this.props.userFavorites,
        loading: false
      })
    }
  }

  render() {

    const columns = [
      {
        id: 'Avatar', // Required because our accessor is not a string
        Header: 'User',
        headerClassName: 'cell-avatar',
        Cell: props => props.original.avatar 
          ? <img src={props.original.avatar} alt="Profile Avatar" />
          : <img src={AvatarPlaceholder} alt="Profile Avatar Placeholder" />,
        className: 'cell-avatar'
      },
      {
        Header: '',
        Cell: props => <span>{props.original.name}</span>,
      }, 
      {
        id: 'Location', // Required because our accessor is not a string
        Header: 'Location',
        accessor: 'location',
        filterable: false,
        sortable: false
      },
      {
        id: 'Available', // Required because our accessor is not a string
        Header: 'Availability',
        // accessor: 'availabol.value',
        Cell: props => <span className="cell-status available">Available</span>,
        filterable: false,
        sortable: false
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
                <li className="table-action-list-item">Contact</li>
                <li className="table-action-list-item">Profile</li>
                <li className="table-action-list-item">Remove</li>
              </ul>
            </div>
          )
        },
        className: 'cell-small cell-action'
      }
    ]

    return <Table
      data={this.state.favorites}
      columns={columns}
      loading={this.state.loading}
      // className="-striped -highlight"
    />
  }
}