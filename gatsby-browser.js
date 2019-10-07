import React from "react"
import { silentAuth } from "./src/utils/auth"

// This is needed since Gatsby abstracts away the root element and
//  the root element must check to see if user is logged in and set the
// user information/tokens

class SessionCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  handleCheckSession = () => {
    console.log("setting loading to false")
    this.setState({ loading: false })
  }

  componentDidMount() {
    silentAuth(this.handleCheckSession)
  }

  render() {
    return this.state.loading === false && <>{this.props.children}</>
  }
}

export const wrapRootElement = ({ element }) => {
  return <SessionCheck>{element}</SessionCheck>
}
