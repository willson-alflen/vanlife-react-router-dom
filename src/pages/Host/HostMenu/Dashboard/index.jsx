import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../../../UserContext'
import HostVans from '../../HostVans'
import { FaRegStar } from 'react-icons/fa6'
import HostRentedVans from '../../../../components/HostRentedVans'
import * as S from './styles'

export default function Dashboard() {
  const { user } = useContext(UserContext)
  const { pathname } = useLocation()

  return (
    <S.DashboardContainer>
      <S.SectionHeader>
        <S.HeaderTitle>
          Welcome <span>{user.name}</span>
        </S.HeaderTitle>
        <S.HeaderBody>
          <S.HeaderText>
            Income last <span>30 days</span>
          </S.HeaderText>
          <S.HeaderText className="income">$2260,00</S.HeaderText>
        </S.HeaderBody>
      </S.SectionHeader>

      <S.SectionScore>
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
              <span>4.5</span>/5
            </p>
          </S.ScoreText>
        </S.ScoreBody>
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
        </S.AccountData>
      </S.SectionAccount>
    </S.DashboardContainer>
  )
}
