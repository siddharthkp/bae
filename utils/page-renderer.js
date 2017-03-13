module.exports = path => `
  import React from 'react'
  import {render} from 'react-dom'
  import Page from '${path}'

  render(
    <Page {...window.INITIAL_PROPS}/>,
    document.getElementById('root')
  );

  if (module.hot) {
    module.hot.accept('${path}', () => {
      render(<Page {...window.INITIAL_PROPS}/>, document.getElementById('root'))
    });
  }
`
