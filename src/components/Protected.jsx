import { useSelector } from "react-redux";

const Protected = ({ children }) => {
    const currentUser = useSelector((state) => state?.currentUser);
    return currentUser   ? <div>{children}</div> : <></>;
};

export default Protected;
