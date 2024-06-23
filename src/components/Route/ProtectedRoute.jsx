import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';

// const ProtectedRoute = ({ isAdmin, element: element, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           element={(props) => {
//             if (isAuthenticated === false) {
//               return <Navigate to="/login" />;
//             }

//             if (isAdmin === true && user.role !== 'admin') {
//               return <Navigate to="/login" />;
//             }

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

const ProtectedRoute = (props) => {
  const { loading, isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const {Component} = props;
  useEffect(() => {
    if (loading === false && !isAuthenticated) {
      navigate('/login');
    }
    // if(isAdmin === true && user.role !== 'admin'){
    //   navigate('/login');
    // }
  }, [loading, isAuthenticated, navigate]);
  
  return(
    <>
    <div>
      {/* {...rest} */}
      <Component/>
    </div>
    </>
  )
}


export default ProtectedRoute;
