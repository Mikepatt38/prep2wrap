import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from '../components/General/Modal'

const mapStateToProps = (state) => ({
  active: state.sessionState.modalActive,
  title: state.sessionState.modalTitle,
  children: state.sessionState.modalChildren,
})

export default connect(mapStateToProps)(Modal)