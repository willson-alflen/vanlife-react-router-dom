import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { UserContext } from '../../UserContext'
import Modal from 'react-modal'
import ReactStars from 'react-rating-stars-component'
import { rateVan, getVanRating, addUserRatedVan } from '../../api'
import PropTypes from 'prop-types'
import { FaRegStar } from 'react-icons/fa'
import * as S from './styles'

Modal.setAppElement('#root')

export default function VanRating({ vanId }) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const { ratedVans, addRatedVan } = useContext(UserContext)
  const [currentVanRating, setCurrentVanRating] = useState(null)
  const { user } = useContext(UserContext)
  const userHasRated = ratedVans.includes(vanId)
  const [userRating, setUserRating] = useState(0)
  const ratedStyles = {
    backgroundColor: '#ffd700',
    color: '#1f1f1f',
    fontWeight: 'bold',
  }

  const handleRating = async () => {
    if (userHasRated) {
      toast.error('You have already rated this van')
      return
    }

    try {
      await rateVan(vanId, userRating)
      await addUserRatedVan(user.uid, vanId)
      addRatedVan(vanId)
      setIsOpen(false)
      toast.success('Van rated successfully!')
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const rating = await getVanRating(vanId)
        setCurrentVanRating(rating)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRating()
  }, [vanId])

  return (
    <S.RatingWrapper>
      <S.AverageRating>
        {currentVanRating !== null && (
          <ReactStars
            count={5}
            value={currentVanRating}
            size={36}
            edit={false}
            activeColor="#ffd700"
            a11y={true}
          />
        )}
      </S.AverageRating>
      <S.CurrentUserRating>
        <S.RatingButton onClick={() => setIsOpen(true)}>
          <FaRegStar style={{ fontSize: '24px' }} />
          Rate this van
        </S.RatingButton>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Van Rating Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              width: '100%',
              maxWidth: '500px',
              height: 'fit-content',
              margin: 'auto',
              padding: '2rem',
              backgroundColor: '#1f1f1f',
              border: 'none',
              borderRadius: '8px',
            },
          }}
        >
          <S.ModalContent>
            <S.ModalTitle>Rate this van</S.ModalTitle>
            <ReactStars
              count={10}
              value={userRating}
              onChange={(newRating) => setUserRating(newRating)}
              size={36}
              activeColor="#ffd700"
              a11y={true}
            />
            <S.ModalButtonRate
              style={userRating !== 0 ? ratedStyles : null}
              onClick={() => handleRating()}
            >
              Rate
            </S.ModalButtonRate>
            <S.ModalButtonClose onClick={() => setIsOpen(false)}>
              X
            </S.ModalButtonClose>
          </S.ModalContent>
        </Modal>
      </S.CurrentUserRating>
    </S.RatingWrapper>
  )
}

VanRating.propTypes = {
  vanId: PropTypes.string,
}
