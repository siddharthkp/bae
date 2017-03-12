module.exports = (body, styles, page) => `
  <!DOCTYPE html>
  <html>
    <head>
      <style>${styles}</style>
    </head>
    <body>
      <div id="root">${body}</div>
    </body>
    <script src="build/common.js"></script>
    <script src="build/${page}.js"></script>
  </html>
`
