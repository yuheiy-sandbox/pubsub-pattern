import React from 'react'
import { withFlux, connect } from './flux'

function App({ count, increment }) {
  return (
    <React.Fragment>
      <div>{count}</div>
      <button onClick={increment}>increment</button>
    </React.Fragment>
  )
}

export default withFlux({ count: 0 }, (state, action) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1,
      }
    default:
      break
  }
})(
  connect(
    ({ count }) => ({ count }),
    (dispatch) => ({ increment: () => dispatch({ type: 'increment' }) }),
  )(App),
)
