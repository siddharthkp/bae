<p align="center">
  <img src="https://raw.githubusercontent.com/siddharthkp/reaqt/master/art/reaqt.png" height="100px"/>
  <br><br>
  react made easy
  <br><br>
</p>

&nbsp;

[![Build Status](https://travis-ci.org/siddharthkp/reaqt.svg?branch=master)](https://travis-ci.org/siddharthkp/reaqt)

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

- pages are `streamed` to the browser for quick `time-to-first-byte`

- built in code splitting, each page gets it's own _`page.js`_

- code shared between pages is served as `common.js` for long term caching

- `pages/home.js` renders the homepage `/`

- [why is this important?](https://rauchg.com/2014/7-principles-of-rich-web-applications#server-rendered-pages-are-not-optional)

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

### asyncComponentWillMount

React has a lifecycle method that get's called on the server `componentWillMount` that can be used to set data for server rendering. But, it [does not support](https://github.com/facebook/react/issues/1739) asynchronous data fetching before rendering the component.

reaqt introduces a new lifecycle method **to pages** that runs only on the server.

```js
import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {username: 'siddharthkp'}
  }
  asyncComponentWillMount () {
    /*
      Return a promise.
      It will get resolved on the server and passed as props to the component.
    */
    return axios.get(`https://api.github.com/users/${this.state.username}`)
  }
  render () {
    return <div>{this.props.bio}</div>
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

Check out the [example applications](https://github.com/siddharthkp/reaqt/tree/master/examples) to see how simple this is.

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
