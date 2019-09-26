import React from 'react'

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

const mapStateToProps = state => ({
  _isLogged: state.auth.isLogged
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)