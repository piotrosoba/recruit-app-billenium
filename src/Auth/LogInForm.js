import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { logInAsyncActionCreator, resetPasswordAsyncActionCreator } from '../state/auth'
import { addSnackbarActionCreator } from '../state/snackbars'

import { Paper, TextField, Button, Typography, CircularProgress, Collapse } from '@material-ui/core'

const styles = {
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 },
  paper: { maxWidth: 320, padding: 20 },
  buttons: { display: 'flex', justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' },
  button: { marginBottom: 10 },
  circural: { display: 'flex', justifyContent: 'center', width: 80 }
}

const LogInForm = props => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [pwdError, setPwdError] = useState(false)
  const [pwd, setPwd] = useState('')

  const [forgotPanel, toggleForgot] = useState(false)
  const [forgotError, setForgotError] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')

  const [circural, setCircural] = useState(false)

  const emailValidate = (string = email) => {
    const isError = (!string.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    setEmailError(isError)
    return isError
  }
  const pwdValidate = (string = pwd) => {
    setPwdError(!string)
    return !string
  }
  const forgotEmailValidate = (string = forgotEmail) => {
    const isError = (!string.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    setForgotError(isError)
    return isError
  }

  const onSubmit = () => {
    const isEmailError = emailValidate()
    const isPwdError = pwdValidate()
    if (!isEmailError && !isPwdError) {
      setCircural(true)
      props._logIn(email, pwd)
        .catch(r => {
          setCircural(false)
          let message = 'Błąd! Spróbuj ponownie później.'
          switch (r.response && r.response.data.error && r.response.data.error.message) {
            case 'EMAIL_NOT_FOUND':
              message = 'Nieprawidłowy email lub hasło.'
              break
            case 'INVALID_PASSWORD':
              message = 'Nieprawidłowy email lub hasło.'
              break
            case 'USER_DISABLED':
              message = 'To konto jest zablokowane.'
              break
            default:
              break
          }
          props._snackbar(message, 'red')
        })
    }
  }

  const submitOnEnter = evt => {
    if (evt.key === 'Enter')
      onSubmit()
  }

  const onSubmitPwdReset = () => {
    if (!forgotEmailValidate()) {
      setCircural(true)
      props._resetPwd(forgotEmail)
        .then(() => {
          props._snackbar('Sprawdź swojego maila!')
          toggleForgot(false)
        })
        .catch((r) => {
          let message = 'Błąd! Spróbuj ponownie później.'
          if (r.response.data.error.message === 'EMAIL_NOT_FOUND')
            message = 'Do tego maila nie jest przypisane żadne konto.'
          props._snackbar(message, 'red')
        })
        .finally(() => setCircural(false))
    }
  }

  const submitForgotOnEnter = evt => {
    if (evt.key === 'Enter')
      onSubmitPwdReset()
  }

  return (
    <div style={styles.center}>
      <Paper style={styles.paper}>
        <Typography
          align='center'
          variant='h4'
        >
          Zaloguj się
        </Typography>
        <TextField
          value={email}
          onChange={(evt) => {
            setEmail(evt.target.value)
            if (emailError)
              emailValidate(evt.target.value)
          }}
          onBlur={() => emailValidate()}
          onKeyPress={submitOnEnter}
          fullWidth
          margin='normal'
          label='email'
          variant='outlined'
          error={emailError}
          helperText={emailError ? 'Podaj prawidłowy email!' : null}
        />
        <TextField
          value={pwd}
          onChange={(evt) => {
            setPwd(evt.target.value)
            if (pwdError)
              pwdValidate(evt.target.value)
          }}
          onBlur={() => pwdValidate()}
          onKeyPress={submitOnEnter}
          fullWidth
          margin='normal'
          label='hasło'
          variant='outlined'
          type='password'
          error={pwdError}
        />
        <div style={styles.buttons}>
          <Button
            style={styles.button}
            color='primary'
            variant='contained'
            onClick={onSubmit}
            margin='normal'
          >
            zaloguj
          </Button>
          <div style={styles.circural}>
            {circural ? <CircularProgress /> : null}
          </div>
          <Button
            style={styles.button}
            color='secondary'
            variant='contained'
            onClick={props.toggleForm}
          >
            rejestracja
          </Button>
          <Button
            onClick={() => toggleForgot(!forgotPanel)}
          >
            przywróc hasło
        </Button>
        </div>

        <Collapse in={forgotPanel}>
          <TextField
            value={forgotEmail}
            onChange={(evt) => {
              setForgotEmail(evt.target.value)
              if (forgotError)
                forgotEmailValidate(evt.target.value)
            }}
            onBlur={() => forgotEmailValidate()}
            onKeyPress={submitForgotOnEnter}
            fullWidth
            margin='normal'
            label='email'
            variant='outlined'
            error={forgotError}
            helperText={forgotError ? 'Podaj prawidłowy email!' : null}
          />
          <Button
            color='primary'
            variant='contained'
            fullWidth
            onClick={onSubmitPwdReset}
          >
            wyślij
            </Button>
        </Collapse>

      </Paper>
    </div>
  )
}

LogInForm.propTypes = {
  toggleForm: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  _snackbar: (text, color, time) => dispatch(addSnackbarActionCreator(text, color, time)),
  _logIn: (email, pwd) => dispatch(logInAsyncActionCreator(email, pwd)),
  _resetPwd: email => dispatch(resetPasswordAsyncActionCreator(email))
})

export default connect(
  null,
  mapDispatchToProps
)(LogInForm)