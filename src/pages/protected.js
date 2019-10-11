import React from "react"
import { Router } from "@reach/router"
import { Link } from "gatsby"
import { login, isAuthenticated, getProfile, logout } from "../utils/auth"

const Home = ({ user, ...props }) => {
  return (
    <div>
      <p>Hi, {user.name ? user.name : "friend"}!</p>
      <img src={user.picture} alt="A picture of you!" />
      <p>
        If you see your name and github profile pic above, you are logged in!
      </p>
    </div>
  )
}

const Other = ({ user }) => {
  return (
    <div>
      <p>Hi, {user.name ? user.name : "friend"} </p>
      <p>This is another route.</p>
    </div>
  )
}

const Protected = props => {
  if (!isAuthenticated()) {
    login()
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
        <Home path="/" user={user} />
        <Other path="/other" user={user} />
      </Router>
    </div>
  )
}
export default Protected
