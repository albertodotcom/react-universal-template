import Express from 'express';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import todosApp from './reducers';
import thunkMiddleware from 'redux-thunk';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import { syncHistoryWithStore } from 'react-router-redux';
import createMemoryHistory from 'history/lib/createMemoryHistory';

const app = Express();
const port = 3000;

app.use('/dist', Express.static('dist'));
app.use(Express.static('public'));
app.use(handlePageRequest);

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
        <link rel="icon" href="/favicon.ico" type="image/x-icon">
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
}

function handlePageRequest(req, res) {
  // Create a new Redux store instance
  const store = createStore(
    todosApp,
    applyMiddleware(
      thunkMiddleware,
    )
  );

  const history = syncHistoryWithStore(createMemoryHistory(req.url), store);

  match({ routes: routes({history}), location: req.url }, async (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      res.status(200).send(await handleRender(RouterContext, renderProps, store));
    } else {
      res.status(404).send('Not found');
    }
  });
}

async function handleRender(RouterContext, renderProps, store) {
  const dataFetching = renderProps.components
    .filter(c => c && typeof c.fetchData)
    .map(fetchDataComponent => {
      return fetchDataComponent.fetchData(store.dispatch);
    });

  await Promise.all(dataFetching);

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
  // Grab the initial state from our Redux store
  const initialState = store.getState();

  // Send the rendered page back to the client
  return renderFullPage(html, initialState);
}

app.listen(port);
