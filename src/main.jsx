import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.jsx";
import Movie from "./components/Movie";
import Movies from "./components/Movies";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>Error</div>,
    },
    {
        path: "/movies",
        element: <Movies />,
        children: [
            {
                path: ":movieId",
                element: <Movie />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
