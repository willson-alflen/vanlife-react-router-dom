import styled from 'styled-components'

export const RentSection = styled.section`
  padding-inline: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
`

export const RentTitle = styled.h1`
  margin-bottom: 3rem;

  span {
    color: #ff8c38;
    text-decoration: underline;
  }
`

export const RentForm = styled.form`
  width: 100%;
  max-width: 500px;
`

export const RentFormSection = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 2rem;
`

export const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`

export const RentFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  &.expiryDateGroup {
    flex-direction: row;
    gap: 1rem;
  }

  &.cvv {
    width: calc(50% - 0.5rem);
  }
`

export const ExpiryDate = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
  }
`

export const Label = styled.label`
  margin-bottom: 0.5rem;
`

export const Input = styled.input`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #4d4d4d;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 1rem;
  outline: none;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
`

export const InputLike = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #4d4d4d;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 1rem;
  outline: none;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
`

export const Textarea = styled.textarea`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #4d4d4d;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 1rem;
  outline: none;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  resize: none;
  min-height: 150px;
  margin-bottom: 1.5rem;
`

export const RentButton = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  line-height: 20px;
  color: #fff;
  background-color: #ff8c38;
  padding: 1.5rem 1rem;
  border: none;
  border-radius: 6px;
  box-shadow: 4px 10px 10px -3px rgba(0, 0, 0, 0.25);
  width: 100%;
  cursor: pointer;
  margin-bottom: 3rem;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: translate(1px, 1px);
  }
`
