import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../../api'
import { toast } from 'react-toastify'
import Confetti from 'react-confetti'
import { useWindowSize } from '@uidotdev/usehooks'
import { UserContext } from '../../UserContext'
import { getAuth, signOut } from 'firebase/auth'
import * as S from './styles'

export default function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const message = location.state?.message
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [loginStatus, setLoginStatus] = useState('idle')
  const [error, setError] = useState(null)
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)

  function handleFormChange(event) {
    const { name, value } = event.target
    setLoginData({ ...loginData, [name]: value })
  }

  function handleFormSubmit(event) {
    event.preventDefault()

    setLoginStatus('submitting')

    loginUser(loginData)
      .then((userCredential) => {
        if (userCredential) {
          setError(null)
          setUser(userCredential.user)
          toast.success('You have successfully logged in!')
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
        setLoginData({ email: '', password: '' })
      })
  }

  function handleSignOut() {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        setShowConfetti(false)
        setUser(null)
        toast.success('You have successfully signed out!')
        navigate('/login', { replace: true })
      })
      .catch((err) => {
        setError(err)
      })
  }

  useEffect(() => {
    if (user) {
      setShowConfetti(true)
      const timeout = setTimeout(() => {
        setShowConfetti(false)
      }, 6000)

      return () => clearTimeout(timeout)
    }
  }, [user])

  return (
    <S.SectionWrapper>
      {showConfetti && <Confetti width={width} height={height} />}

      {user ? (
        <S.LoggedInMessage>
          <h2>You are already logged in!</h2>
          <p>
            If you want to sign out{' '}
            <button onClick={handleSignOut}>click here</button>
          </p>
        </S.LoggedInMessage>
      ) : (
        <>
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
        </>
      )}
    </S.SectionWrapper>
  )
}
