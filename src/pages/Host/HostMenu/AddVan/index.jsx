import { useState } from 'react'
import { addVan, auth } from '../../../../api'
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { toast } from 'react-toastify'
import * as S from './styles'

export default function AddVan() {
  const storage = getStorage()
  const [vanData, setVanData] = useState({
    name: '',
    type: '',
    price: '',
    imageUrl: null,
    description: '',
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
      const currentUser = auth.currentUser
      if (!currentUser) {
        throw new Error('You must be logged in to list a van')
      }

      if (!vanData.imageUrl) {
        throw new Error('Please select an image for the van')
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
    } catch (error) {
      console.error('Error listing van:', error)
      toast.error('Failed to list your van. Please try again later.')
    }
  }

  function clearForm() {
    setVanData({
      name: '',
      type: '',
      price: '',
      imageUrl: null,
      description: '',
    })
  }

  return (
    <S.AddVanSection>
      <S.AddVanTitle>Van Info</S.AddVanTitle>

      <S.AddVanForm onSubmit={handleFormSubmit}>
        <S.AddVanLabel htmlFor="van-name">Name:</S.AddVanLabel>
        <S.AddVanInput
          type="text"
          id="van-name"
          name="name"
          value={vanData.name}
          onChange={handleFormChange}
          required
        />

        <S.AddVanLabel htmlFor="van-type">Van Type:</S.AddVanLabel>
        <S.AddVanInput
          type="text"
          id="van-type"
          name="type"
          value={vanData.type}
          onChange={handleFormChange}
          required
        />

        <S.AddVanLabel htmlFor="van-price">Price:</S.AddVanLabel>
        <S.AddVanInput
          type="number"
          id="van-price"
          name="price"
          value={vanData.price}
          onChange={handleFormChange}
          required
        />

        <S.AddVanLabel htmlFor="van-image" className="label-input-file">
          Upload Van Image
        </S.AddVanLabel>
        <S.AddVanInputFile
          type="file"
          id="van-image"
          name="imageUrl"
          onChange={handleFormChange}
          accept="image/*"
          required
        />

        <S.AddVanLabel htmlFor="van-description">Description:</S.AddVanLabel>
        <S.AddVanTextarea
          id="van-description"
          name="description"
          value={vanData.description}
          onChange={handleFormChange}
          required
        />

        <S.AddVanButton type="submit">List your van</S.AddVanButton>
      </S.AddVanForm>
    </S.AddVanSection>
  )
}
