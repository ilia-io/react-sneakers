import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={155}
    height={250}
    viewBox="0 0 155 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="155" height="150" />
    <rect x="0" y="160" rx="5" ry="5" width="155" height="15" />
    <rect x="-1" y="185" rx="5" ry="5" width="100" height="15" />
    <rect x="0" y="220" rx="5" ry="5" width="80" height="24" />
    <rect x="119" y="213" rx="10" ry="10" width="32" height="32" />
  </ContentLoader>
)

export default MyLoader

