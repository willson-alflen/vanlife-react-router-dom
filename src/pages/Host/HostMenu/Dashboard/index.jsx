import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../../UserContext'
import HostVans from '../../HostVans'
import { FaRegStar } from 'react-icons/fa6'
import HostRentedVans from '../../../../components/HostRentedVans'
import {
  calcAverageUserRatings,
  getUserTransactions,
  removeUser,
} from '../../../../api'
import { toast } from 'react-toastify'
import * as S from './styles'

export default function Dashboard() {
  const { user, dispatch } = useContext(UserContext)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [totalTransacAmount, setTotalTransacAmount] = useState(0)
  const [userRating, setUserRating] = useState(0)

  async function handleUserRemove() {
    const confirm = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    )

    if (confirm) {
      try {
        await removeUser(user.uid)
        toast.success('Your account has been deleted.')
        dispatch({ type: 'REMOVE_USER' })
        navigate('/')
      } catch (error) {
        console.log('Error deleting user: ', error)
        toast.error('An error occurred. Please try again later.')
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsData = await getUserTransactions(user.uid)

        if (transactionsData !== null) {
          let total = 0
          transactionsData.forEach((transaction) => {
            total += transaction.purchaseCost || 0
          })
          setTotalTransacAmount(total)
        }

        const rating = await calcAverageUserRatings(user.uid)
        setUserRating(rating)
      } catch (err) {
        toast.error(err.message)
      }
    }

    fetchData()
  }, [user.uid])

  return (
    <S.DashboardContainer>
      <S.SectionHeader>
        <S.HeaderTitle>
          Welcome, <span>{user.name || user.email} !</span>
        </S.HeaderTitle>
        <S.HeaderBody>
          <S.HeaderText>
            Income last <span>30 days</span>
          </S.HeaderText>
          <S.HeaderText className="income">
            $ {totalTransacAmount},00
          </S.HeaderText>
        </S.HeaderBody>
      </S.SectionHeader>

      <S.SectionScore>
        {userRating === 0 ? (
          <></>
        ) : (
          <>
            <S.ScoreTitle>Review score</S.ScoreTitle>
            <S.ScoreBody>
              <S.ScoreText>
                <FaRegStar
                  style={{
                    color: 'FF8C38',
                    fontSize: '1.5rem',
                  }}
                />
                <p>
                  <span>{userRating}</span>/5
                </p>
              </S.ScoreText>
            </S.ScoreBody>
          </>
        )}
      </S.SectionScore>

      <S.SectionVans>
        <HostVans pathname={pathname} />
      </S.SectionVans>

      <S.SectionRentedVans>
        <HostRentedVans />
      </S.SectionRentedVans>

      <S.SectionAccount>
        <S.AccountTitle>Your account data</S.AccountTitle>
        <S.AccountData>
          <S.AccountDataItem>
            <span style={user.name ? { color: 'inherit' } : { color: 'red' }}>
              {user.name ? user.name : `You didn't provide a name yet`}
            </span>
            <legend>name</legend>
          </S.AccountDataItem>

          <S.AccountDataItem>
            <span>{user.email}</span>
            <legend>email</legend>
          </S.AccountDataItem>

          <S.AccountDataItem>
            <span style={user.name ? { color: 'inherit' } : { color: 'red' }}>
              {user.phone
                ? user.phone
                : `You didn't provide a phone number yet`}
            </span>
            <legend>phone</legend>
          </S.AccountDataItem>

          <S.AccountDanger>
            <h3>Danger Zone</h3>
            <p>
              If you want to delete your account{' '}
              <span onClick={handleUserRemove}>click here</span>
            </p>
          </S.AccountDanger>
        </S.AccountData>
      </S.SectionAccount>
    </S.DashboardContainer>
  )
}
