import PropTypes from 'prop-types'

export default function MainSection({ children }) {
  return <main style={{ minHeight: 'calc(100vh - 200px)' }}>{children}</main>
}

MainSection.propTypes = {
  children: PropTypes.node,
}
