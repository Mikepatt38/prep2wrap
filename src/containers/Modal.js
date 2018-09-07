import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setModal } from '../actions/components'
import Modal from '../components/Modal'

const mapStateToProps = (state) => ({
  active: state.sessionState.modalActive,
  title: state.sessionState.modalTitle,
  children: state.sessionState.modalChildren,
  modalSuccess: state.sessionState.modalSuccess,
})

const mapDispatchToProps = (dispatch) => ({
  setModal: bindActionCreators(setModal, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)