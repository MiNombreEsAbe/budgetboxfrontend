import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { fetchUserFromLocalStorage } from './redux/users/operations';
import { getUser } from "./redux/users/selectors";
import LandingPage from "./containers/LandingPage";


export default function Router() {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const user = getUser(selector);
    const userId = user ? user.id : null;

    useEffect(() => {
        dispatch(fetchUserFromLocalStorage());
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<LandingPage />} />
                <Route path="/login" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    );
}