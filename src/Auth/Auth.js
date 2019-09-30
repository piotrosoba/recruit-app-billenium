import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import LogInForm from './LogInForm'
import RegisterForm from './RegisterForm'

const Auth = props => {
  const [logInForm, setLogInForm] = React.useState(true)

  const toggleForm = () => {
    setLogInForm(!logInForm)
  }

  return (
    props._isLogged ?
      props.children
      :
      logInForm ?
        <LogInForm
          toggleForm={toggleForm}
        />
        :
        <RegisterForm
          toggleForm={toggleForm}
        />
  )
}

Auth.propTypes = {
  children: PropTypes.element
}

const mapStateToProps = state => ({
  _isLogged: state.auth.isLogged
})

export default connect(
  mapStateToProps,
  null
)(Auth)