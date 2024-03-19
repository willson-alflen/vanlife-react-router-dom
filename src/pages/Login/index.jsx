import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../../api'
import * as S from './styles'

export default function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const message = location.state?.message
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [loginStatus, setLoginStatus] = useState('idle')
  const [error, setError] = useState(null)

  function handleFormChange(event) {
    const { name, value } = event.target
    setLoginData({ ...loginData, [name]: value })
  }

  function handleFormSubmit(event) {
    event.preventDefault()

    setLoginStatus('submitting')

    loginUser(loginData)
      .then((user) => {
        if (user) {
          setError(null)
          localStorage.setItem('loggedIn', true)
          navigate('/host', { replace: true })
        } else {
          setError(new Error('Invalid email or password'))
        }
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoginStatus('idle')
      })
  }

  return (
    <S.SectionWrapper>
      {message && <S.LoginMessage>{message}</S.LoginMessage>}

      {error && <S.LoginMessage>{error.message}</S.LoginMessage>}

      <S.FormWrapper>
        <S.LoginTitle>Sign in to your account</S.LoginTitle>

        <S.LoginForm onSubmit={handleFormSubmit}>
          <S.LoginInput
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleFormChange}
            placeholder="Email address"
          />
          <S.LoginInput
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleFormChange}
            placeholder="Password"
          />
          <S.LoginButton
            type="submit"
            disabled={loginStatus === 'idle' ? false : true}
          >
            {loginStatus === 'submitting' ? 'Signing in...' : 'Sign in'}
          </S.LoginButton>

          <S.LoginSpan>
            Don&apos;t have an account?{' '}
            <S.LoginLink to="/signup">Create one now</S.LoginLink>
          </S.LoginSpan>
        </S.LoginForm>
      </S.FormWrapper>
    </S.SectionWrapper>
  )
}
