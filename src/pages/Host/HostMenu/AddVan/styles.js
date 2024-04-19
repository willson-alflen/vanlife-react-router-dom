import styled from 'styled-components'

export const AddVanSection = styled.section`
  padding-inline: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;

  @media (max-width: 648px) {
    padding-inline: 1rem;
  }
`

export const AddVanTitle = styled.h1`
  margin-bottom: 3rem;
`

export const AddVanForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
`

export const AddVanLabel = styled.label`
  margin-bottom: -0.5rem;

  @media (max-width: 548px) {
    font-size: 0.9rem;
  }
`

export const AddVanImageLabel = styled.label`
  background-color: ${(props) => (props.imageuploaded ? '#ff8c38' : '#fff')};
  cursor: pointer;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 1rem;
  outline: none;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  margin: 0.5rem 0;

  @media (max-width: 548px) {
    font-size: 0.9rem;
  }
`

export const AddVanInput = styled.input`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #4d4d4d;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 1rem;
  outline: none;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);

  @media (max-width: 548px) {
    padding: 0.75rem;
  }
`

export const AddVanInputFile = styled.input`
  display: none;
`

export const AddVanTextarea = styled.textarea`
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

export const AddVanButton = styled.button`
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
  cursor: pointer;
  margin-bottom: 3rem;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: translate(1px, 1px);
  }

  @media (max-width: 548px) {
    padding: 1rem;
  }
`
