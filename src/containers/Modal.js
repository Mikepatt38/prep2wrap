import { connect } from 'react-redux'
import { setModal } from '../actions/components'
import { Modal } from '../components/Modal'

const mapStateToProps = (state) => ({
  active: state.sessionState.modalActive,
})

const mapDispatchToProps = (dispatch) => ({
  onSetModal: (active) => dispatch(setModal(active))
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)