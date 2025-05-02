import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Function to check authentication status
        const checkAuthStatus = async () => {
            try {
                const response = await fetch("http://192.168.33.233:4000/");
                if (response.ok) {
                    const isAuthenticated = await response.text();
                    setIsAuthenticated(isAuthenticated === "true");
                } else {
                    console.error("Failed to fetch auth status");
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error checking auth status:", error);
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    const handleMenuToggle = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="navbar glass">
            <div className="navbar-logo">
                <span style={{ color: "#9455f4" }}>N</span>F
            </div>

            {/* Hamburger Icon */}
            <div
                className={`hamburger ${isMenuOpen ? "active" : ""}`}
                onClick={handleMenuToggle}
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* Links */}
            <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                <a href="/" className="nav-link">
                    Home
                </a>
                <a href="/integrations" className="nav-link">
                    Integrations
                </a>
                <a href="/chat" className="nav-link">
                    Chat
                </a>
                {isAuthenticated ? (
                    <a href="/logout" className="nav-link">
                        Logout
                    </a>
                ) : (
                    <>
                        <a href="/login" className="nav-link">
                            Login
                        </a>
                        <a href="/signup" className="nav-link">
                            Sign Up
                        </a>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
