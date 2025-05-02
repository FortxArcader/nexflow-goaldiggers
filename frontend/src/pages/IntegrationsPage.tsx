import React, { useEffect, useState, useRef } from "react";
import "../styles/fonts.css";
import NavBar from "../components/NavBar";
import "../styles/IntegrationsPage.css"; // We'll create this file next

interface Integration {
    id: string;
    name: string;
    description: string;
    logo: string;
    category: string;
    redirect: string;
}

function IntegrationsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categoriesScrollRef = useRef<HTMLDivElement>(null);

    const categories = [
        "All",
        "My Connections",
        "Popular",
        "Development",
        "Productivity",
        "Analytics",
        "Marketing",
        "Scraping",
        "Design",
        "Crypto",
        "Search",
        "AI",
        "Storage",
        "Knowledge",
    ];

    const integrations: Integration[] = [
        {
            id: "Gmail",
            name: "Gmail",
            description:
                "Connect Gmail, Outlook, Proton mail and other emails via SMTP and IMAP.",
            logo: "/pics/gmail.png",
            category: "Productivity",
            redirect: "https://www.veyrax.com/integrations/mail",
        },
        {
            id: "LinkedIn",
            name: "LinkedIn",
            description:
                "LinkedIn API integration for accessing profiles, connections, posts, and other LinkedIn data",
            logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
            category: "Productivity",
            redirect: "https://www.veyrax.com/integrations/linkedin",
        },
        {
            id: "PostgreSQL",
            name: "PostgreSQL",
            description:
                "Enterprise-grade relational database system with advanced SQL features.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/810px-Postgresql_elephant.svg.png",
            category: "Productivity",
            redirect: "https://www.veyrax.com/integrations/postgresql",
        },
        {
            id: "GitHub",
            name: "GitHub",
            description:
                "GitHub provider enables to retrieve repository details, list commits, and manage issues.",
            logo: "/pics/github.png",
            category: "Development",
            redirect: "https://www.veyrax.com/integrations/github",
        },
        {
            id: "21st-dev",
            name: "21st Dev",
            description:
                "21st Dev provides a library of UI components for AI-powered development.",
            logo: "/pics/stdev.png",
            category: "Development",
            redirect: "",
        },
        {
            id: "airbnb",
            name: "Airbnb",
            description:
                "Airbnb is a platform for booking accommodations and experiences.",
            logo: "/pics/airbnb.png",
            category: "Travel",
            redirect: "",
        },
        {
            id: "airtable",
            name: "Airtable",
            description:
                "Create flexible databases, manage records, and collaborate with team members in Airtable.",
            logo: "/pics/airtable.png",
            category: "Productivity",
            redirect: "",
        },
        {
            id: "amazon-affiliate",
            name: "Amazon Affiliate",
            description: "Search Amazon, get products, add affiliate links.",
            logo: "/pics/amazon.png",
            category: "Marketing",
            redirect: "",
        },
        {
            id: "apollo",
            name: "Apollo",
            description:
                "Apollo is a platform for finding and connecting with people and organizations.",
            logo: "/pics/apollo.png",
            category: "Marketing",
            redirect: "",
        },
        {
            id: "asana",
            name: "Asana",
            description:
                "Plan and manage work, projects, and tasks with Asana.",
            logo: "/pics/asana.png",
            category: "Productivity",
            redirect: "",
        },
        {
            id: "bannerbear",
            name: "Bannerbear",
            description:
                "Auto-generate social media visuals, ecommerce banners and more.",
            logo: "/pics/banner bear.png",
            category: "Design",
            redirect: "",
        },
        {
            id: "binance",
            name: "Binance",
            description:
                "Trade cryptocurrencies on the world's largest crypto exchange.",
            logo: "/pics/binance.png",
            category: "Crypto",
            redirect: "",
        },
        {
            id: "brave-search",
            name: "Brave Search",
            description:
                "Get web search results from Brave's independent search engine.",
            logo: "/pics/brave.png",
            category: "Search",
            redirect: "",
        },
        {
            id: "chatgpt",
            name: "ChatGPT",
            description:
                "Interact with OpenAI's ChatGPT for natural language processing tasks.",
            logo: "/pics/chatgpt.png",
            category: "AI",
            redirect: "",
        },
        {
            id: "dropbox",
            name: "Dropbox",
            description: "Store and share files in the cloud with Dropbox.",
            logo: "/pics/dropbox.png",
            category: "Storage",
            redirect: "",
        },
        {
            id: "notion",
            name: "Notion",
            description:
                "All-in-one workspace for notes, docs, and project management.",
            logo: "/pics/notion.png",
            category: "Knowledge",
            redirect: "",
        },
    ];

    useEffect(() => {
        document.body.classList.add("loaded");
        return () => {
            document.body.classList.remove("loaded");
        };
    }, []);

    const filteredIntegrations = integrations.filter((integration) => {
        const matchesSearch =
            integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            integration.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" ||
            integration.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="App">
            {/* <ThreeScene /> */}

            <NavBar />

            <div className="integrations-container">
                <h1 className="categories">
                    <span className="nex">Nex</span>
                    <span className="flow">Flow</span>
                    <span className="integration-text"> Integrations</span>
                </h1>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search integrations by name, description or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div style={{ position: "relative" }}>
                    <div
                        className="categories-scroll"
                        ref={categoriesScrollRef}
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`category-button ${
                                    selectedCategory === category
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="integrations-grid">
                    <div className="integration-request-card">
                        <div className="card-content">
                            <span className="question-mark">?</span>
                            <h3>Integration Request</h3>
                            <p>
                                Request any integration we missed, and we'll
                                work on adding!
                            </p>
                            <div className="card-actions">
                                <button className="request-button">
                                    Request
                                </button>
                            </div>
                        </div>
                    </div>

                    {filteredIntegrations.map((integration) => (
                        <div key={integration.id} className="integration-card">
                            <div className="card-content">
                                <img
                                    src={integration.logo}
                                    alt={integration.name}
                                    className="integration-logo"
                                />
                                <h3>{integration.name}</h3>
                                <p>{integration.description}</p>
                                <div className="card-actions">
                                    <button className="docs-button">
                                        Docs
                                    </button>
                                    <button
                                        className="connect-button"
                                        onClick={() => {
                                            if (integration.redirect) {
                                                window.open(
                                                    integration.redirect,
                                                    "_blank"
                                                );
                                            } else {
                                                alert(
                                                    "No redirect URL provided for this integration."
                                                );
                                            }
                                        }}
                                    >
                                        Connect
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default IntegrationsPage;
