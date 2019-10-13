import React from "react"
import { Router } from "@reach/router"
import { Link } from "gatsby"
// import { login, isAuthenticated, getProfile, logout } from "../utils/auth"

const Home = () => {
  return (
    <div>
      <p>Hi, friend!</p>
      <p>
        If you see your name and github profile pic above, you are logged in!
      </p>
    </div>
  )
}

const Other = ({}) => {
  return (
    <div>
      <p>Hi, friend </p>
      <p>This is another route.</p>
    </div>
  )
}

const FallBack = () => <div>404</div>

const Protected = props => {
  return (
    <div>
      <nav>
        <Link to="/test">Home</Link> <Link to="/test/other">Other</Link>
      </nav>
      <Router>
        <Home path="/test" />
        <Other path="/test/other" />
      </Router>
    </div>
  )
}
export default Protected
