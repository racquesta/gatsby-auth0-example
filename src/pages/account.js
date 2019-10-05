import React from "react"
// User react router instead of reach router here
// TODO: research differences/pros/cons
import { BrowserRouter as Router } from "react-router-dom"
import { Link } from "gatsby"
import { login, isAuthenticated, getProfile, logout } from "../utils/auth"

const Home = ({ user }) => (
  <div>
    <p>Hi, {user.name ? user.name : "friend"}!</p>
    <p>If you see your name above, you are logged in!</p>
  </div>
)
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
        <a href="#logout" onClick={() => logout()}>
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
