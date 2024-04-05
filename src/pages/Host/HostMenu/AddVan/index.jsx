import { useEffect, useState } from 'react'
import { addVan, auth } from '../../../../api'
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import * as S from './styles'

export default function AddVan() {
  const storage = getStorage()
  const [vanData, setVanData] = useState({
    vanName: '',
    type: '',
    price: '',
    imageUrl: null,
    description: '',
  })
  const [imageUploaded, setImageUploaded] = useState(false)
  const imageLabelStyles = {
    backgroundColor: 'lightgreen',
    color: '#fff',
  }

  const validationSchema = Yup.object().shape({
    vanName: Yup.string().required('Van name is required'),
    type: Yup.string().required('Van type is required'),
    price: Yup.number().required('Price is required'),
    imageUrl: Yup.mixed().required('Image is required'),
    description: Yup.string().required('Description is required'),
  })

  function handleFormChange(event) {
    const { files, name, value } = event.target
    // If the input is a file input, update the image property with the selected file
    const newValue = name === 'imageUrl' ? files[0] : value
    setVanData({ ...vanData, [name]: newValue })
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    try {
      await validationSchema.validate(vanData, { abortEarly: false })

      const currentUser = auth.currentUser
      if (!currentUser) {
        toast.error('You must be logged in to list a van')
        return
      }

      if (!vanData.imageUrl) {
        toast.error('Please select an image for the van')
        return
      }

      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `van-images/${vanData.imageUrl.name}`)
      await uploadBytes(imageRef, vanData.imageUrl)
      const imageUrl = await getDownloadURL(imageRef)

      // Add the van data to Firestore, including the image URL and user ID
      await addVan({
        ...vanData,
        hostId: currentUser.uid, // Include the user ID in the van data
        imageUrl: imageUrl,
      })
      toast.success('Your van has been listed successfully!')
      clearForm()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          toast.error(error.message)
        })
      }
    }
  }

  function clearForm() {
    setVanData({
      vanName: '',
      type: '',
      price: '',
      imageUrl: null,
      description: '',
    })
  }

  useEffect(() => {
    if (vanData.imageUrl !== null) {
      setImageUploaded(true)
    }
  }, [vanData.imageUrl])

  return (
    <S.AddVanSection>
      <S.AddVanTitle>Van Info</S.AddVanTitle>

      <S.AddVanForm onSubmit={handleFormSubmit}>
        <S.AddVanLabel htmlFor="van-name">
          Van name: <span style={{ color: 'red' }}>*</span>
        </S.AddVanLabel>
        <S.AddVanInput
          type="text"
          id="van-name"
          name="van-name"
          value={vanData.vanName}
          onChange={handleFormChange}
        />

        <S.AddVanLabel htmlFor="van-type">
          Van Type: <span style={{ color: 'red' }}>*</span>
        </S.AddVanLabel>
        <S.AddVanInput
          type="text"
          id="van-type"
          name="type"
          value={vanData.type}
          onChange={handleFormChange}
        />

        <S.AddVanLabel htmlFor="van-price">
          Price: <span style={{ color: 'red' }}>*</span>
        </S.AddVanLabel>
        <S.AddVanInput
          type="number"
          id="van-price"
          name="price"
          value={vanData.price}
          onChange={handleFormChange}
        />

        <S.AddVanImageLabel
          htmlFor="van-image"
          style={imageUploaded ? imageLabelStyles : null}
        >
          {imageUploaded ? 'Image uploaded' : 'Upload Van image'}
        </S.AddVanImageLabel>
        <S.AddVanInputFile
          type="file"
          id="van-image"
          name="imageUrl"
          onChange={handleFormChange}
          accept="image/*"
        />

        <S.AddVanLabel htmlFor="van-description">
          Description: <span style={{ color: 'red' }}>*</span>
        </S.AddVanLabel>
        <S.AddVanTextarea
          id="van-description"
          name="description"
          value={vanData.description}
          onChange={handleFormChange}
        />

        <S.AddVanButton type="submit">List your van</S.AddVanButton>
      </S.AddVanForm>
    </S.AddVanSection>
  )
}
