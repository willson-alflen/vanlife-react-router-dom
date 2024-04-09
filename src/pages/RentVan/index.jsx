import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../UserContext'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { rentVan } from '../../api'
import * as S from './styles'

export default function RentVan() {
  const { user } = useContext(UserContext)
  const location = useLocation()
  const van = location.state?.van
  const vanId = location.state?.id
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    renterInfo: {
      renterId: user?.uid ? user.uid : '',
      name: user?.name ? user.name : '',
      email: user?.email ? user.email : '',
    },
    vanInfo: {
      vanId: vanId,
      vanOwner: van?.hostId ? van.hostId : '',
      pricePerDay: van?.price ? van.price : 0,
      pickup: '',
      dropoff: '',
      totalDays: 0,
      message: '',
    },
    paymentInfo: {
      nameOnCard: '',
      purchaseDate: '',
      purchaseCost: 0,
      transactionId: '',
    },
  })

  const validationSchema = Yup.object().shape({
    renterInfo: Yup.object().shape({
      name: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    vanInfo: Yup.object().shape({
      pickup: Yup.date().required('Pickup date is required'),
      dropoff: Yup.date().required('Dropoff date is required'),
    }),
    paymentInfo: Yup.object().shape({
      nameOnCard: Yup.string().required('Name on card is required'),
    }),
  })

  useEffect(() => {
    if (formData.vanInfo.pickup && formData.vanInfo.dropoff) {
      const pickupDate = new Date(formData.vanInfo.pickup)
      const dropoffDate = new Date(formData.vanInfo.dropoff)
      const timeDifference = dropoffDate.getTime() - pickupDate.getTime()
      const totalDays = timeDifference / (1000 * 3600 * 24)

      if (totalDays < 1) {
        toast.error('Dropoff date must be after pickup date')
        return
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        vanInfo: { ...prevFormData.vanInfo, totalDays },
      }))

      const totalPrice = totalDays * formData.vanInfo.pricePerDay
      setFormData((prevFormData) => ({
        ...prevFormData,
        paymentInfo: { ...prevFormData.paymentInfo, purchaseCost: totalPrice },
      }))
    }
  }, [
    formData.vanInfo.pickup,
    formData.vanInfo.dropoff,
    formData.vanInfo.pricePerDay,
  ])

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.error('You must login to rent a van')
      return
    }

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return
    }

    try {
      await validationSchema.validate(formData, { abortEarly: false })

      const cardElement = elements.getElement(CardElement)

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        paymentInfo: {
          nameOnCard: paymentMethod.customer
            ? paymentMethod.customer
            : prevFormData.paymentInfo.nameOnCard,
          purchaseDate: new Date().toISOString(),
          purchaseCost: prevFormData.paymentInfo.purchaseCost,
          transactionId: paymentMethod.id,
        },
      }))

      setSubmitting(true)
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          toast.error(err.message)
        })
      }
    }
  }

  useEffect(() => {
    if (submitting) {
      const doAsyncWork = async () => {
        try {
          const res = await rentVan(formData)
          if (res.success) {
            navigate('/successful-purchase', {
              state: { transactionId: formData.paymentInfo.transactionId },
            })
          } else {
            toast.error('Rental process failed')
          }
        } catch (error) {
          toast.error(error.message)
        } finally {
          setSubmitting(false)
        }
      }

      doAsyncWork()
    }
  }, [formData, navigate, submitting])

  return (
    <S.RentSection>
      <S.RentTitle>
        Rent <span>{van.name}</span> van
      </S.RentTitle>
      <S.RentForm onSubmit={(e) => handleFormSubmit(e)}>
        {/*========= USER INFO SECTION =========*/}
        <S.RentFormSection>
          <S.SectionTitle>Your Info</S.SectionTitle>
          <S.RentFormGroup>
            <S.Label htmlFor="name">
              Full Name <span style={{ color: 'red' }}>*</span>
            </S.Label>
            <S.Input
              type="text"
              id="name"
              name="name"
              value={formData.renterInfo.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  renterInfo: { ...formData.renterInfo, name: e.target.value },
                })
              }
              required
            />
          </S.RentFormGroup>
          <S.RentFormGroup>
            <S.Label htmlFor="email">
              Email <span style={{ color: 'red' }}>*</span>
            </S.Label>
            <S.Input
              type="email"
              id="email"
              name="email"
              value={formData.renterInfo.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  renterInfo: { ...formData.renterInfo, email: e.target.value },
                })
              }
              required
            />
          </S.RentFormGroup>
        </S.RentFormSection>

        {/*========= VAN INFO SECTION =========*/}
        <S.RentFormSection>
          <S.SectionTitle>Van Info</S.SectionTitle>
          <S.RentFormGroup>
            <S.Label htmlFor="pickup">
              Pickup date <span style={{ color: 'red' }}>*</span>
            </S.Label>
            <S.Input
              type="date"
              id="pickup"
              name="pickup"
              value={formData.vanInfo.pickup}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vanInfo: { ...formData.vanInfo, pickup: e.target.value },
                })
              }
              required
            />
          </S.RentFormGroup>
          <S.RentFormGroup>
            <S.Label htmlFor="dropoff">
              Dropoff date <span style={{ color: 'red' }}>*</span>
            </S.Label>
            <S.Input
              type="date"
              id="dropoff"
              name="dropoff"
              value={formData.vanInfo.dropoff}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vanInfo: { ...formData.vanInfo, dropoff: e.target.value },
                })
              }
              required
            />
          </S.RentFormGroup>
          <S.RentFormGroup>
            <S.Label htmlFor="totalDays">Total days</S.Label>
            <S.Input
              type="text"
              id="totalDays"
              name="totalDays"
              value={formData.vanInfo.totalDays}
              disabled
              style={{ backgroundColor: '#fff' }}
            />
          </S.RentFormGroup>
          <S.RentFormGroup>
            <S.Label htmlFor="message">Message</S.Label>
            <S.Textarea
              id="message"
              name="message"
              rows="4"
              value={formData.vanInfo.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vanInfo: { ...formData.vanInfo, message: e.target.value },
                })
              }
            />
          </S.RentFormGroup>
        </S.RentFormSection>

        {/*========= PAYMENT INFO SECTION =========*/}
        <S.RentFormSection>
          <S.SectionTitle>Payment Info</S.SectionTitle>
          <S.RentFormGroup>
            <S.Label htmlFor="nameOnCard">
              Name on card <span style={{ color: 'red' }}>*</span>
            </S.Label>
            <S.Input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              value={formData.paymentInfo.nameOnCard}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentInfo: {
                    ...formData.paymentInfo,
                    nameOnCard: e.target.value,
                  },
                })
              }
              required
            />
          </S.RentFormGroup>
          <S.RentFormGroup>
            <S.Label htmlFor="card">
              Card details <span style={{ color: 'red' }}>*</span>
            </S.Label>
            <S.InputLike>
              <CardElement
                options={{
                  hidePostalCode: true,
                  style: {
                    base: {
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      color: '#4d4d4d',
                      '::placeholder': {
                        color: '#4d4d4d',
                      },
                    },
                  },
                }}
              />
            </S.InputLike>
          </S.RentFormGroup>
          <S.RentFormGroup>
            <S.Label htmlFor="purchaseCost">Total cost</S.Label>
            <S.Input
              type="text"
              id="purchaseCost"
              name="purchaseCost"
              value={formData.paymentInfo.purchaseCost}
              disabled
              style={{ backgroundColor: '#fff' }}
            />
          </S.RentFormGroup>
        </S.RentFormSection>

        <S.RentButton type="submit">Rent</S.RentButton>
      </S.RentForm>
    </S.RentSection>
  )
}
