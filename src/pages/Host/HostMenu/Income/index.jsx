import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../UserContext'
import { getUserTransactions } from '../../../../api'
import { toast } from 'react-toastify'
import * as S from './styles'

export default function Income() {
  const { user } = useContext(UserContext)
  const [userTransactions, setUserTransactions] = useState(null)
  const [totalTransacAmount, setTotalTransacAmount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsData = await getUserTransactions(user.uid)

        if (transactionsData !== null) {
          setUserTransactions(transactionsData)

          let total = 0
          transactionsData.forEach((transaction) => {
            total += transaction.purchaseCost || 0
          })
          setTotalTransacAmount(total)
        }
      } catch (err) {
        toast.error(err.message)
      }
    }

    fetchData()
  }, [user.uid])

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
    const formattedDate = new Date(dateString).toLocaleDateString(
      'en-US',
      options
    )
    return formattedDate
  }

  return (
    <S.TransactionsWrapper>
      <S.TransactionsTitle>Income</S.TransactionsTitle>

      <S.TransactionsIncome>
        <S.IncomeText>
          Last <span>30 days</span>
        </S.IncomeText>
        <S.IncomeValue>$ {totalTransacAmount},00</S.IncomeValue>
      </S.TransactionsIncome>

      <S.TransactionList>
        {userTransactions !== null && userTransactions.length !== 0 ? (
          <>
            <S.ListTitle>
              Your transactions ({userTransactions.length})
            </S.ListTitle>
            {userTransactions.map((transaction) => (
              <S.TransactionItem key={transaction.transactionId}>
                <div className="left">
                  <span>$ {transaction.purchaseCost},00</span>
                </div>
                <div className="right">
                  <span>{formatDate(transaction.purchaseDate)}</span>
                </div>
              </S.TransactionItem>
            ))}
          </>
        ) : (
          <S.NoIncomeMessage>
            <span>You&apos;ve got no transactions yet.</span>
            Keep up with the good work!
          </S.NoIncomeMessage>
        )}
      </S.TransactionList>
    </S.TransactionsWrapper>
  )
}
