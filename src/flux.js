import PropTypes from 'prop-types'
import { mapProps, withReducer, withContext, getContext, compose } from 'recompose'

const FluxPropTypes = {
  state: PropTypes.any,
  dispatch: PropTypes.any,
}

export const withFlux = (initialState = {}, reducer = (state, _action) => state) => {
  return compose(
    withReducer('state', 'dispatch', reducer, initialState),
    withContext(FluxPropTypes, ({ state, dispatch }) => ({ state, dispatch })),
    mapProps(({ state: _state, dispatch: _dispatch, ...childProps }) => childProps),
  )
}

export const connect = (
  mapStateToProps = (state) => ({ state }),
  mapDispatchToProps = (dispatch) => ({ dispatch }),
) => {
  return compose(
    getContext(FluxPropTypes),
    mapProps(({ state, dispatch, ...ownerProps }) => ({
      ...ownerProps,
      ...mapStateToProps(state),
      ...mapDispatchToProps(dispatch),
    })),
  )
}
