import React from "react"
// User react router instead of reach router here
// TODO: research differences/pros/cons
import { BrowserRouter as Router } from "react-router-dom"
import { Link } from "gatsby"
import { login, isAuthenticated, getProfile, logout } from "../utils/auth"

const Home = ({ user }) => {
  console.log(user)
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
const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const Account = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <>
      <nav>
        <Link to="/account">Home</Link>{" "}
        <a
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a>
      </nav>
      <Router>
        <Home path="/account" user={user} />
      </Router>
    </>
  )
}
export default Account
