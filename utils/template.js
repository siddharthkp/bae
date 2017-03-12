module.exports = (body, page) => `
  <!DOCTYPE html>
  <html>
    <body>
      <div id="root">${body}</div>
    </body>
    <script src="build/common.js"></script>
    <script src="build/${page}.js"></script>
  </html>
`
