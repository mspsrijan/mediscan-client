import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

import { Dna } from "react-loader-spinner";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper mx-auto min-h-[400px] md:min-h-[500px] flex items-center justify-center"
      />
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location.pathname }}></Navigate>;
};

export default PrivateRoutes;
