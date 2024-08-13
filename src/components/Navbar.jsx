import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase";
import { saveCurrentUserAction } from "../redux/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser);
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const handleGoogleSignIn = async () => {
        console.log("Hello");
        try {
            googleSignIn();
        } catch (error) {
            console.error(error);
        }
    };

    const logOut = () => {
        signOut(auth);
    };

    const handleSignOut = async () => {
        try {
            logOut();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unusubscribe = onAuthStateChanged(auth, (user) => {
            dispatch(saveCurrentUserAction(user?.providerData[0]));
        });

        return () => {
            unusubscribe();
        };
    }, []);

    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    {currentUser ? (
                        <p className="navbar-brand mb-0">
                            <img src={currentUser?.photoURL} alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
                            Welcome, <strong>{currentUser?.displayName}</strong>
                        </p>
                    ) : (
                        <div></div>
                    )}

                    <button className="btn btn-outline-success" onClick={!currentUser ? handleGoogleSignIn : handleSignOut}>
                        {currentUser ? "Logout" : "Login"}
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
