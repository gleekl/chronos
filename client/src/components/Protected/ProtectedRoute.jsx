import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (user) {
    return children
  } else if (user === null) {
    return <Navigate to="/login" />
  } else {
    return <p>Loading..</p>
  }
}

export default ProtectedRoute