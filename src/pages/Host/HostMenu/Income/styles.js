import styled from 'styled-components'

export const TransactionsWrapper = styled.div`
  padding: 0 2rem;
  margin-bottom: 5rem;

  @media (max-width: 648px) {
    padding: 0 1rem;
  }
`

export const TransactionsTitle = styled.h2`
  color: #161616;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;

  @media (max-width: 648px) {
    font-size: 2rem;
  }
`

export const TransactionsIncome = styled.div`
  color: #4d4d4d;
  font-size: 1rem;
  margin-bottom: 4rem;

  @media (max-width: 648px) {
    font-size: 0.9rem;
  }
`

export const IncomeText = styled.p`
  margin-bottom: 2rem;

  span {
    font-weight: 700;
    text-decoration: underline;
  }
`

export const IncomeValue = styled.p`
  font-size: 4rem;
  color: #161616;
  font-weight: 900;

  @media (max-width: 648px) {
    font-size: 3.25rem;
  }
`

export const TransactionList = styled.ul``

export const ListTitle = styled.h2`
  margin-bottom: 2rem;
`

export const TransactionItem = styled.li`
  list-style-type: none;
  background-color: #fff;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);

  .left {
    span {
      color: #161616;
      font-size: 2.25rem;
      font-weight: 600;
    }
  }

  .right {
    font-size: 1.25rem;
  }

  @media (max-width: 648px) {
    padding: 1.5rem;

    .left {
      span {
        font-size: 2rem;
      }
    }

    .right {
      font-size: 1rem;
    }
  }

  @media (max-width: 400px) {
    padding: 1rem;

    .left {
      span {
        font-size: 1.75rem;
      }
    }

    .right {
      font-size: 0.9rem;
    }
  }
`

export const NoIncomeMessage = styled.p`
  color: #ff8c38;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 3rem;

  span {
    display: block;
    color: #161616;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  @media (max-width: 648px) {
    font-size: 2rem;

    span {
      font-size: 0.9rem;
    }
  }
`
