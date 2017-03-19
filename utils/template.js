module.exports = (body, styles, props, page) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script>window.INITIAL_PROPS = ${JSON.stringify(props)}</script>
      <style>${styles}</style>
    </head>
    <body>
      <div id="root">${body}</div>
    </body>
    <script src="build/common.js"></script>
    <script src="build/${page}.js"></script>
  </html>
`
