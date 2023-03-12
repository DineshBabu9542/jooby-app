import {Redirect, Route} from 'react-router-dom'

import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const tokens = Cookies.get('jwt-token')

  if (tokens === undefined) {
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}

export default ProtectedRoute
