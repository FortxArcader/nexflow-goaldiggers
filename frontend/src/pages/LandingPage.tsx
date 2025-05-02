import React from "react";
import "../styles/LandingPage.css";
import NavBar from "../components/NavBar";
import ThreeScene from "../components/ParticleScene";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Bento from "../components/Bento";

function LandingPage() {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const [currentPlaceholder, setCurrentPlaceholder] = useState("");

    const placeholders = useMemo(
        () => [
            "Send a test email to example@gmail.com about pancakes",
            "Find me a job posting for Java Springboot developer on LinkedIn.",
            "What is the top news for today on hacker news.",
        ],
        []
    );

    useEffect(() => {
        let currentIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let timeoutId: NodeJS.Timeout;

        const animatePlaceholder = () => {
            const currentText = placeholders[currentIndex];

            if (!isDeleting) {
                if (currentCharIndex <= currentText.length) {
                    setCurrentPlaceholder(
                        currentText.substring(0, currentCharIndex)
                    );
                    currentCharIndex++;
                    timeoutId = setTimeout(animatePlaceholder, 50);
                } else {
                    isDeleting = true;
                    timeoutId = setTimeout(animatePlaceholder, 100);
                }
            } else {
                if (currentCharIndex > 0) {
                    setCurrentPlaceholder(
                        currentText.substring(0, currentCharIndex - 1)
                    );
                    currentCharIndex--;
                    timeoutId = setTimeout(animatePlaceholder, 50);
                } else {
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % placeholders.length;
                    timeoutId = setTimeout(animatePlaceholder, 500);
                }
            }
        };

        animatePlaceholder();

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [placeholders]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim()) {
            navigate("/chat", { state: { initialMessage: inputText } });
        }
    };

    return (
        <div className="App">
            <ThreeScene />
            <div className="flow-container"></div>

            <NavBar />

            <main className="main-content" id="home">
                <div className="hero-title">
                    <span className="nex-neon">Nex</span>
                    <span className="flow-neon">Flow</span>
                </div>
                <p
                    className="hero-paragraph"
                    style={{ fontFamily: "TeknafRegular, sans-serif" }}
                >
                    Command your{" "}
                    <span style={{ color: "#9455f4" }}>
                        <b>next</b>
                    </span>{" "}
                    vision. We execute the{" "}
                    <span style={{ color: "#9455f4" }}>
                        <b>flow</b>
                    </span>
                    .
                </p>

                <form onSubmit={handleSubmit} className="input-container">
                    <input
                        type="text"
                        className="landing-input"
                        placeholder={currentPlaceholder}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <button type="submit" className="landing-send-btn">
                        →
                    </button>
                </form>
            </main>

            <Bento />

            <section className="about-section" id="about">
                <h2>About Us</h2>
                <div className="about-content">
                    <p>
                        One Line Coders is a small team of developers who love
                        coding and learning new things. Their current project,
                        NexFlow, uses smart &nbsp;
                        <span style={{ color: "#854ddc" }}>AI agents</span>
                        &nbsp; and &nbsp;
                        <span style={{ color: "#854ddc" }}>MCP servers</span>
                        &nbsp; to help startups flow faster. NexFlow automates
                        tasks, adapts to changing needs, and removes roadblocks
                        so young companies can deliver products more quickly.
                    </p>
                </div>

                {/* founders section */}
                <div className="founders-section">
                    <div className="founders-container">
                        <div className="founder-card">
                            <img
                                src="https://i.postimg.cc/tgH99LTR/saisha.jpg"
                                alt="Founder 4"
                                className="founder-img"
                            />
                            <h4>Saisha Goel</h4>
                            <h1>Team Lead</h1>
                            <a
                                href="https://www.linkedin.com/in/saisha-goel/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/120px-LinkedIn_icon_circle.svg.png?20210301220643"
                                    alt="LinkedIn Logo"
                                    className="linkedin-logo"
                                />
                            </a>
                        </div>
                        <div className="founder-card">
                            <img
                                src="https://i.postimg.cc/SQ9SFTGS/Whats-App-Image-2025-04-18-at-21-53-49-11110282.jpg"
                                alt="Founder 1"
                                className="founder-img"
                            />
                            <h4>Mudit Garg</h4>
                            <h1>Frontend and Backend</h1>
                            <a
                                href="https://www.linkedin.com/in/mudditgarg/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/120px-LinkedIn_icon_circle.svg.png?20210301220643"
                                    alt="LinkedIn Logo"
                                    className="linkedin-logo"
                                />
                            </a>
                        </div>

                        <div className="founder-card">
                            <img
                                src="https://i.postimg.cc/x1nTPvM0/Whats-App-Image-2025-04-18-at-21-41-20-e8c99499.jpg"
                                alt="Kairav Mittal"
                                className="founder-img"
                            />
                            <h4>Kairav Mittal</h4>
                            <h1>Frontend and Backend</h1>
                            <a
                                href="https://www.linkedin.com/in/kairav-mittal/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/120px-LinkedIn_icon_circle.svg.png?20210301220643"
                                    alt="LinkedIn Logo"
                                    className="linkedin-logo"
                                />
                            </a>
                        </div>
                        <div className="founder-card">
                            <img
                                src="https://i.postimg.cc/L8db1vds/19b850b8e329493eab887da643e2eeb9-fotor-ai-art-effects-20250329135226.jpg"
                                alt="Founder 2"
                                className="founder-img"
                            />
                            <h4>Shlok Bhardwaj</h4>
                            <h1>Deployment</h1>
                            <a
                                href="https://www.linkedin.com/in/fortarcader/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/120px-LinkedIn_icon_circle.svg.png?20210301220643"
                                    alt="LinkedIn Logo"
                                    className="linkedin-logo"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider-canvas">
                <div className="neon-divider"></div>
            </div>

            {
                /* COntact Form */
                <section className="ContactPage" id="contact">
                    <h2 className="contact-form-title">Connect With Us</h2>
                    <form
                        className="contact-form"
                        action="https://formspree.io/f/mzzrdlgb"
                        method="POST"
                    >
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Your Message"
                                rows={5}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn">
                            Send Message
                        </button>
                    </form>
                </section>
            }
        </div>
    );
}

export default LandingPage;
