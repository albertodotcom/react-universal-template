import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'
import counterApp from './reducers';
import App from './containers/App';

const app = Express();
const port = 3000;

app.use('/dist', Express.static('dist'));
app.use(handleRender);

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;
};

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(counterApp);

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const initialState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, initialState));
}

app.listen(port);
