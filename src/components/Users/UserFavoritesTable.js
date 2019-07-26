import React, {Component} from 'react'
import UserProfileModal from './UserProfileModal'
import { Table } from '../General/Table'
import ActionIcon from '../../img/icon-action.svg'
import AvatarPlaceholder from '../../img/avatar-placeholder-min.png'

export class UserFavoritesTable extends Component {
  state = {
    loading: true,
    favorites: [],
    user: {},
    modalActive: false
  }

  componentDidMount(){
    this.getUsersCurrentFavorites()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.currentUser.favorites !== this.props.currentUser.favorites){
      this.getUsersCurrentFavorites()
    }
  }

  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  getUsersCurrentFavorites = async () => {
    const { getCurrentFavorites, currentUser } = this.props
    const userFavorites = await getCurrentFavorites(currentUser.id)
    this.setState({
      favorites: userFavorites,
      loading: false
    })
  }

  removeUserFavorite = async (userToRemove) => {
    this.setState({ loading: true })
    this.props.removeUserFromUserFavorites(this.props.currentUser.id, this.state.favorites, userToRemove)
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

  handleUserSelected = (user) => {
    this.setState({
      user: user,
      modalActive: true
    })
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
        Cell: props => <span>{props.original.firstName} {props.original.lastName}</span>,
      }, 
      {
        id: 'Location', // Required because our accessor is not a string
        Header: 'Location',
        // accessor: 'location',
        Cell: props => <span>{props.original.profileInformation.location[0].label}</span>,
        filterable: false,
        sortable: false
      },
      {
        id: 'Available', // Required because our accessor is not a string
        Header: 'Availability',
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
                <li className="table-action-list-item"><a href={`mailto:${props.original.email}`}>Contact</a></li>
                <li className="table-action-list-item" onClick={() => this.handleUserSelected(props.original)}>Profile</li>
                <li className="table-action-list-item" onClick={() => this.removeUserFavorite(props.original)}>Remove</li>
              </ul>
            </div>
          )
        },
        className: 'cell-small cell-action'
      }
    ]

    return (
      <React.Fragment>
        <UserProfileModal
          currentUser={this.props.currentUser}
          updateUserFavorites={this.props.updateUserFavorites}
          active={this.state.modalActive}
          user={this.state.user}
          close={this.toggleModal}
        />
        <Table
          data={this.state.favorites}
          columns={columns}
          loading={this.state.loading}
        />
      </React.Fragment>
    )
  }
}