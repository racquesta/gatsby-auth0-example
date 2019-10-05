import auth0 from "auth0-js"
import { navigate } from "gatsby"

// check to see if the browser env is active
const isBrowser = typeof window !== "undefined"

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : {}

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}

let user = {}

export const isAuthenticated = () => {
  if (!isBrowser) {
    return
  }
  return localStorage.getItem("isLoggedIn") === "true"
}

// 1. this function is called from a component
export const login = () => {
  if (!isBrowser) {
    return
  }

  // calls the auth0 authorize function
  // the authize function will send the user to the callback
  // route given in .env.development
  // That route will call handleAuthentication
  auth.authorize()
}

export const setSession = (cb = () => {}) => (err, authResult) => {
  if (err) {
    navigate("/")
    cb()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    // sets all the tokes including the user object
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    localStorage.setItem("isLoggedIn", true)
    navigate("/account")
    cb()
  }
}

export const handleAuthentication = () => {
  if (!isBrowser) {
    return
  }

  // parseHash parses the tokens from the location hash ?
  // then calls setSession as a callback
  auth.parseHash(setSession())
}

// used to retrieve the user from a component
export const getProfile = () => {
  return user
}

// called in client side congif (gatsby-browser)
export const silentAuth = callback => {
  // if not authenticated -> callback
  if (!isAuthenticated()) return callback()
  // otherwise check login and set tokens and user data
  auth.checkSession({}, setSession(callback))
}

// Logout
export const logout = () => {
  localStorage.setItem("isLoggedIn", false)
  auth.logout()
}
