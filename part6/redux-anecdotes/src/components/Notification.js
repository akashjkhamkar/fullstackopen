import { connect } from 'react-redux'
import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const msg = props.msg
  if (!msg) {
    return null
  }
  
  return (
    <div style={style}>
      {msg}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    msg: state.notification.msg
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification