import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useWindowSize } from '@uidotdev/usehooks'
import Confetti from 'react-confetti'
import NotFound from '../NotFound'
import * as S from './styles'

export default function SuccessfulPurchase() {
  const location = useLocation()
  const transactionId = location.state
    ? location.state.transactionId
    : undefined
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (!transactionId) {
      return
    }

    setShowConfetti(true)

    const timeout = setTimeout(() => {
      setShowConfetti(false)
    }, 6000)

    return () => clearTimeout(timeout)
  }, [transactionId])

  if (!transactionId) {
    return <NotFound />
  }

  return (
    <S.SuccessMessage>
      {showConfetti && <Confetti width={width} height={height} />}

      <S.MessageTitle>Thank you for your purchase!</S.MessageTitle>
      <S.MessageBody>
        <S.MessageBodyText>
          Your transaction ID is <strong>{transactionId}</strong>
        </S.MessageBodyText>
        <S.MessageBodyText>
          You will receive an email confirmation shortly. If you have any
          questions, please contact us at
          <a href="mailto:"> contact@vanlifeapp.com</a>
        </S.MessageBodyText>
      </S.MessageBody>
    </S.SuccessMessage>
  )
}
