import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../api'
import { toast } from 'react-toastify'
import * as S from './styles'

export default function Signup() {
  const navigate = useNavigate()
  const [signupData, setSignupData] = useState({ email: '', password: '' })
  const [signupStatus, setSignupStatus] = useState('idle')
  const [error, setError] = useState(null)

  function handleFormChange(event) {
    const { name, value } = event.target
    setSignupData({ ...signupData, [name]: value })
  }

  function handleFormSubmit(event) {
    event.preventDefault()

    setSignupStatus('submitting')

    registerUser(signupData)
      .then((userCredential) => {
        if (userCredential) {
          setError(null)
          toast.success('You have successfully created an account')
          navigate('/login')
        } else {
          setError(new Error("Couldn't create user"))
        }
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setSignupStatus('idle')
        setSignupData({ email: '', password: '' })
      })
  }

  return (
    <S.SectionWrapper>
      {error && <S.SignupMessage>{error.message}</S.SignupMessage>}

      <S.FormWrapper>
        <S.SignupTitle>Create an account</S.SignupTitle>

        <S.SignupForm onSubmit={handleFormSubmit}>
          <S.SignupInput
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleFormChange}
            placeholder="Email address"
          />
          <S.SignupInput
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleFormChange}
            placeholder="Password"
          />
          <S.SignupButton
            type="submit"
            disabled={signupStatus === 'submitting'}
          >
            {signupStatus === 'submitting' ? 'Creating user...' : 'Register'}
          </S.SignupButton>
        </S.SignupForm>
      </S.FormWrapper>
    </S.SectionWrapper>
  )
}
