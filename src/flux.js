import PropTypes from 'prop-types'
import { mapProps, withReducer, withContext, getContext, compose } from 'recompose'

const keyNames = {
  state:
    '__flux-state-' +
    Math.random()
      .toString(36)
      .substring(7)
      .split('')
      .join('.') +
    '__',
  dispatch:
    '__flux-dispatch-' +
    Math.random()
      .toString(36)
      .substring(7)
      .split('')
      .join('.') +
    '__',
}

const fluxPropTypes = {
  [keyNames.state]: PropTypes.object.isRequired,
  [keyNames.dispatch]: PropTypes.func.isRequired,
}

export const withFlux = (initialState = {}, reducer = (state, _action) => state) => {
  return compose(
    withReducer(keyNames.state, keyNames.dispatch, reducer, initialState),
    withContext(fluxPropTypes, ({ [keyNames.state]: state, [keyNames.dispatch]: dispatch }) => ({
      [keyNames.state]: state,
      [keyNames.dispatch]: dispatch,
    })),
    mapProps(
      ({ [keyNames.state]: _state, [keyNames.dispatch]: _dispatch, ...childProps }) => childProps,
    ),
  )
}

export const connect = (
  mapStateToProps = (state) => ({ state }),
  mapDispatchToProps = (dispatch) => ({ dispatch }),
) => {
  return compose(
    getContext(fluxPropTypes),
    mapProps(({ [keyNames.state]: state, [keyNames.dispatch]: dispatch, ...ownerProps }) => ({
      ...ownerProps,
      ...mapStateToProps(state),
      ...mapDispatchToProps(dispatch),
    })),
  )
}
