import React from 'react'

function EmptyState(props){
  return (
    <div className="empty-state">
      <img className="empty-state-image" src={props.imgSrc} alt={props.imageAlt} />
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  )
}

export default EmptyState