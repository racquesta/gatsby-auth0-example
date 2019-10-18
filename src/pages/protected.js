import React from "react"
import { Router } from "@reach/router"
import { Link } from "gatsby"
import { login, isAuthenticated, getProfile, logout } from "../utils/auth"

const Home = ({ user }) => {
  return (
    <div>
      <p>Hi, {user.name || "friend"}!</p>
      <img src={user.picture} alt="you" />
      <p>
        If you see your name and github profile pic above, you are logged in!
      </p>
    </div>
  )
}

const Other = ({ user }) => {
  return (
    <div>
      <p>Hi, {user.name || "friend"}!</p>
      <p>This is another route.</p>
    </div>
  )
}

// TODO: figure out fallback 404 pages with plugin
const FallBack = () => <div>404</div>

const Protected = props => {
  if (!isAuthenticated()) {
    login(window.location.pathname)
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()
  console.log(user)

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
        <Home path="/protected" user={user} />
        <Other path="/protected/other" user={user} />
        <FallBack path="/protected/*" />
      </Router>
    </div>
  )
}
export default Protected
