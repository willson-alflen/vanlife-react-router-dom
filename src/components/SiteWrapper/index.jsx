import PropTypes from 'prop-types'
import * as S from './styles'

export default function SiteWrapper({ children }) {
  return <S.Wrapper>{children}</S.Wrapper>
}

SiteWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}
