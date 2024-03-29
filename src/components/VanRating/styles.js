import styled from 'styled-components'

export const RatingWrapper = styled.div``

export const AverageRating = styled.div``

export const CurrentUserRating = styled.div``

export const RatingButton = styled.button`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  background-color: transparent;
  color: inherit;
  font-size: 1rem;
  letter-spacing: 0.5px;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;

  &:hover {
    color: #007bff;
    font-weight: bold;
  }
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #fefefe;
`

export const ModalTitle = styled.h2`
  margin-bottom: 1.5rem;
`

export const ModalButtonRate = styled.button`
  color: #989898;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  padding: 0.7rem 0;
  width: 100%;
  cursor: pointer;
  margin-top: 2rem;
`

export const ModalButtonClose = styled.button`
  background: none;
  color: #fefefe;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 12px;
`
