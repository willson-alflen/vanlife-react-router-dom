import styled, { keyframes } from 'styled-components'

const moveVan = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(0);
  }
`

const AnimatedVanSVG = styled.svg`
  width: 100px;
  height: 100px;
  animation: ${moveVan} 3s linear infinite;
`

const VanLoadingSpinner = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <AnimatedVanSVG
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <rect x="10" y="30" width="80" height="40" fill="#ffd54f" />
        <circle cx="25" cy="70" r="10" fill="#f5f5f5" />
        <circle cx="75" cy="70" r="10" fill="#f5f5f5" />
        <rect x="20" y="40" width="10" height="20" fill="#444444" />
        <rect x="70" y="40" width="10" height="20" fill="#444444" />
      </AnimatedVanSVG>
    </div>
  )
}

export default VanLoadingSpinner
