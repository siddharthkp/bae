<p align="center">
  <img src="https://raw.githubusercontent.com/siddharthkp/reaqt/master/art/reaqt.png" height="100px"/>
  <br><br>
  react made easy
  <br><br>
</p>

&nbsp;

### minimal setup
```
npm install reaqt --save
```


Add these 2 lines in your `package.json`

```json
"scripts": {
  "dev": "reaqt dev",
  "start": "reaqt"
}
```

Start the dev server with `npm run dev`. You already have server rendering and hot module replacement.

&nbsp;

### pages

Make pages like it's the 90s.
&nbsp;
- pages are routes: `pages/about` renders the `/about` page

- pages are rendered on the server

- built in code splitting, each page gets it's own `page.js`

- code shared between pages is served as `common.js` for long term caching

&nbsp;

`pages/home.js` the homepage `/`

```js
import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {message: 'hello'} // rendered on the server
  }
  componentDidMount () {
    this.setState({message: 'hello world'}) // updated on the browser
  }
  render () {
    return <div>{this.state.message}</div>
  }
}

```

`/` defaults to `pages/home.js`

&nbsp;

### components

the usual, nothing special here.

&nbsp;

### styling

Comes with [styled-components](https://github.com/styled-components/styled-components) which gets rendered on the server.

&nbsp;

### assets/static

Create a `static` directory to serve images, fonts, etc.

&nbsp;

### production

`npm start` will compile, optimize and serve your app.

&nbsp;

### example

Check out the [example application](https://github.com/siddharthkp/reaqt/tree/master/example) to see how simple this is.

&nbsp;

### like it?

:star: this repo

&nbsp;

### license

MIT © [siddharthkp](https://github.com/siddharthkp)
