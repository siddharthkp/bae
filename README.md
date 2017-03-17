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

Start the dev server with `npm run dev`. You just setup server rendering with hot module replacement and hot reload!

&nbsp;

### pages

Make pages like it's the 90s.
&nbsp;
- pages are routes: `pages/about` renders `/about` of your website

- pages are rendered on the server

- built in code splitting, each page gets it's own `page.js`

- code shared between pages is served as `common.js` for long term caching

- `pages/home.js` renders the homepage `/`

- [why, you ask?](https://rauchg.com/2014/7-principles-of-rich-web-applications#server-rendered-pages-are-not-optional)

&nbsp;

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

&nbsp;

### components

the usual, nothing special here.

&nbsp;

### styling

comes with [styled-components](https://github.com/styled-components/styled-components) which gets rendered on the server.

&nbsp;

### static assets

keep your images, fonts, etc. in a directory named `static`

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

### todo

- easy api for lazy loading components
- server worker support
- make first build faster

&nbsp;

### license

MIT © [siddharthkp](https://github.com/siddharthkp)
