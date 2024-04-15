import styled from 'styled-components'

export const TransactionsWrapper = styled.div`
  padding: 0 2rem;
  margin-bottom: 5rem;
`

export const TransactionsTitle = styled.h2`
  color: #161616;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`

export const TransactionsIncome = styled.div`
  color: #4d4d4d;
  font-size: 1rem;
  margin-bottom: 4rem;
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
`
