# React Universal App
React with Redux and server side rendering

## Run the application

```bash
npm run server # in one terminal instance
npm run client # in another terminal instance
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

## TODO

- [x] add history to router
- [ ] add devTools
- [ ] remove todo example
- [ ] add flow types
- [x] add eslint
- [ ] add css
- [ ] add pasta templates
- [ ] create script to ship production code
- [x] client hot reload
- [x] server hot reload
