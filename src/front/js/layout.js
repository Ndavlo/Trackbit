import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { PasswordRecovery } from "./pages/passwordRecovery";
import { Userprofile } from "./pages/userprofile";
import injectContext from "./store/appContext";
import { Blog } from "./pages/blog";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Dashboard } from "./pages/dashboard";
import { Signup } from "./pages/signup";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Userprofile />} path="/userprofile" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Blog />} path="/blog" />
                        <Route element={<PasswordRecovery />} path="/passwordrecovery" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
