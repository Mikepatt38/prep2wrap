import React from 'react'
import ReactDOM from 'react-dom'
import Loading from './Loading'

function LoadingModal(props){
  return (
    props.active ?
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modalBg modal-open">
          <div className="modal modal-loading">
            <div className="modal-body">
              <Loading />
              {props.message}
            </div>
          </div>
        </div>
      </React.Fragment>, document.body
    ) : null

  )
}

export default LoadingModal 