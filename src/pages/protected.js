import React from "react"
import { Router } from "@reach/router"
import { Link } from "gatsby"
import { login, isAuthenticated, getProfile, logout } from "../utils/auth"

const Home = ({ props }) => {
  return (
    <div>
      <p>Hi, "friend"!</p>
      <p>
        If you see your name and github profile pic above, you are logged in!
      </p>
    </div>
  )
}

const Other = props => {
  return (
    <div>
      <p>Hi, friend </p>
      <p>This is another route.</p>
    </div>
  )
}

const FallBack = () => <div>404</div>

const Protected = props => {
  if (!isAuthenticated()) {
    login(window.location.pathname)
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <div>
      <nav>
        <Link to="/protected">Home</Link>{" "}
        <a
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a>{" "}
        <Link to="/protected/other">Other</Link>
      </nav>
      <Router>
        <Home path="/protected" />
        <Other path="/protected/other" />
        <FallBack path="/protected/*" />
      </Router>
    </div>
  )
}
export default Protected
