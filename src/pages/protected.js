import React from "react"
import { Router } from "@reach/router"
import { Link } from "gatsby"
import { login, isAuthenticated, getProfile, logout } from "../utils/auth"

const Home = ({ props }) => {
  console.log("HOME PROPS", props)
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
  console.log("OTHER PROPS", props)
  return (
    <div>
      <p>Hi, friend </p>
      <p>This is another route.</p>
    </div>
  )
}

const FallBack = () => <div>404</div>

const Protected = props => {
  console.log("Protected", props)
  // if (!isAuthenticated()) {
  //   login()
  //   return <p>Redirecting to login...</p>
  // }

  // const user = getProfile()

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
      </Router>
    </div>
  )
}
export default Protected
