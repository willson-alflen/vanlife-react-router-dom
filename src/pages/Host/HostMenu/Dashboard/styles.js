import styled from 'styled-components'

export const DashboardContainer = styled.div`
  margin-bottom: 5rem;
`

export const SectionHeader = styled.section`
  padding: 3rem 2rem;
  background-color: #ffead0;
`

export const HeaderTitle = styled.h1`
  color: #161616;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`

export const HeaderBody = styled.div``

export const HeaderText = styled.p`
  color: #4d4d4d;
  font-size: 1rem;
  margin-bottom: 2rem;

  span {
    font-weight: 700;
    text-decoration: underline;
  }

  &.income {
    font-size: 4rem;
    color: #161616;
    font-weight: 900;
  }
`

export const SectionScore = styled.section`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  background-color: #ffddb2;
  padding: 3rem 2rem;
`

export const ScoreTitle = styled.h2`
  color: #161616;
  font-size: 1.5rem;
  font-weight: 700;
`

export const ScoreBody = styled.div``

export const ScoreText = styled.div`
  display: flex;
  gap: 0.25rem;

  span {
    display: inline-block;
    font-weight: 700;
    font-size: 1.5rem;
  }
`

export const SectionVans = styled.section`
  padding: 3rem 2rem;
`

export const SectionRentedVans = styled.section`
  padding: 3rem 2rem;
`

export const SectionAccount = styled.section`
  padding: 3rem 2rem;
`

export const AccountTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #161616;
  margin-bottom: 2rem;
`

export const AccountData = styled.div``

export const AccountDataItem = styled.div`
  background-color: rgba(255, 234, 208, 0.5);
  margin-bottom: 1rem;
  padding: 1rem 2rem;
  border-radius: 6px;

  span {
    display: inline-block;
    font-size: 1.25rem;
    font-weight: 600;
    width: 100%;
    border-bottom: 1px solid #ffddb2;
    margin-bottom: 0.5rem;
    padding-bottom: 0.25rem;
  }

  legend {
    font-size: 0.9rem;
  }
`

export const AccountDanger = styled.div`
  background-color: lightcoral;
  padding: 1rem 2rem;
  border-radius: 6px;
  margin-top: 3rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: white;

    span {
      color: purple;
      font-weight: 700;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`
