import { FC } from "react";
import { Navigate } from "react-router-dom";
import LocalStorageService from "services/LocalStorageService";
const RestrictedWrapper:FC<{children: JSX.Element}> = ({children}) => {
    if ( LocalStorageService.get('user') ) {
        return children;
    } else {
        return <Navigate to='/login' replace/>;
    }
};

export default RestrictedWrapper;