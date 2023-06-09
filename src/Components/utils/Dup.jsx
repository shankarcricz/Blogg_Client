import React from 'react'
import ContentLoader from 'react-content-loader'

const Dup = props => (
  <ContentLoader viewBox="0 160 500 580" height="100vh" width='100%' {...props}>
    <rect x="3" y="3" rx="10" ry="10" width="1000" height="180" />
    <rect x="6" y="190" rx="0" ry="0" width="292" height="20" />
    <rect x="4" y="215" rx="0" ry="0" width="239" height="20" />
    <rect x="4" y="242" rx="0" ry="0" width="274" height="20" />
  </ContentLoader>
)


export default Dup