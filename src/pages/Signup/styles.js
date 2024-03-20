import styled from 'styled-components'

export const SectionWrapper = styled.section`
  height: calc(100vh - 100px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    align-items: center;
  }
`

export const SignupMessage = styled.h2`
  color: red;
  margin-bottom: 5rem;
`

export const FormWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    row-gap: 5rem;
  }
`

export const SignupTitle = styled.h1`
  color: #161616;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0.25rem;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
`

export const SignupInput = styled.input`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #4d4d4d;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 1rem;
  outline: none;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);

  &:last-of-type {
    margin-bottom: 1.5rem;
  }
`

export const SignupButton = styled.button`
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
`
