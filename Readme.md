# React Universal App
React with Redux and server side rendering

## Run the application
To run both the server and the client run the following script

```bash
npm run dev
```

## How does the server side rendering work?
Every route component that wants to fetch data need to implement a `fetchData` **static** method in the component. The method accepts a `dispatch` function that needs to be called with an action creator that returns a Promise.

```js
// actions/posts.js

export function fetchPosts() {
  return dispatch => {
    return fetch('/api/posts')
    .then(res => res.json())
    .then(posts => {
      return dispatch({
        type: 'RECEIVE_POSTS',
        payload: posts
      });
    });
  }
}
```

```js
// containers/Posts.js
class Posts extends React.Component {
  static fetchData(dispatch) {
    return dispatch(fetchPosts());
  }

  render() {
    ...
  }
}
```

## Redux DevTools
I've just discoverd a chrome extension that allows to use redux dev tools. I reccomend it:  [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension).
I've already enabled it in `src/client.js`.
```js
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

// Create Redux store with initial state
const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(
      thunkMiddleware // lets us dispatch() functions
    ),
    devTools
  )
);
```


## TODO
- [x] add history to router
- [x] add devTools
- [ ] remove todo example
- [x] add eslint
- [x] add css
- [ ] add pasta templates
- [ ] create script to ship production code
- [x] client hot reload
- [x] server hot reload
- [ ] add option for using only client side rendering
