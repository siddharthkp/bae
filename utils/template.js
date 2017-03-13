module.exports = (body, styles, state, page) => `
  <!DOCTYPE html>
  <html>
    <head>
      <script>window.INITIAL_STATE = ${state}</script>
      <style>${styles}</style>
    </head>
    <body>
      <div id="root">${body}</div>
    </body>
    <script src="build/common.js"></script>
    <script src="build/${page}.js"></script>
  </html>
`
