// Use Gatsby API's onCreatePage
// this is called after each page is created

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  console.log(page)
  // if path matches /protected at the start of the string
  if (page.path.match(/^\/protected/)) {
    // page.matchPath is used for matching pages on the client side
    page.matchPath = "/protected/*"

    // Update the page
    createPage(page)
  } else if (page.path.match(/^\/test/)) {
    page.matchPath = "/test/*"
  }
}

exports.createPages = ({ actions }) => {
  const { createRedirect } = actions

  createRedirect({
    from: `/*`,
    to: `index.html`,
    statusCode: 200,
  })
}

// overriding server side config
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    //  Below from gatsby tutorial
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    // Summary: ignore auth-js during the build since in requires browser APIs
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
