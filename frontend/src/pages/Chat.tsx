import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Chat.css";
import NavBar from "../components/NavBar";
import LoadingText from "../components/LoadingText";
import ParticleScene from "../components/ParticleScene";
import Sidebar from "../components/Sidebar";

interface Message {
    id: string;
    content: string;
    type: "User" | "Assistant";
    isTyping?: boolean;
}

const API_URL = "https://nexflow.onrender.com/process";

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // Sidebar should be closed by default on phones
    const [isSidebarOpen, setIsSidebarOpen] = useState(
        () => window.innerWidth > 500
    );
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const initialMessageProcessed = useRef(false);
    const location = useLocation();

    // Wrap simulateTyping in useCallback to avoid useEffect dependency warning
    const simulateTyping = useCallback(async (content: string) => {
        const newMessageId = Date.now().toString();

        setMessages((prev) => [
            ...prev,
            {
                id: newMessageId,
                type: "Assistant",
                content: "",
                isTyping: true,
            },
        ]);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        let displayedContent = "";
        for (let i = 0; i < content.length; i++) {
            const currentContent = displayedContent + content[i];
            displayedContent = currentContent;
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === newMessageId
                        ? { ...msg, content: currentContent, isTyping: true }
                        : msg
                )
            );
            await new Promise((resolve) => setTimeout(resolve, 5));
        }

        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === newMessageId
                    ? { ...msg, content: displayedContent, isTyping: false }
                    : msg
            )
        );
    }, []);

    // Add this function to clear all messages
    const handleNewChat = () => {
        setMessages([]);
        setInput("");
    };

    // Process initial message from navigation if it exists
    useEffect(() => {
        const state = location.state as { initialMessage?: string } | null;
        if (state?.initialMessage && !initialMessageProcessed.current) {
            initialMessageProcessed.current = true;

            // Treat as if user typed and submitted in chat input
            const userMessage: Message = {
                id: Date.now().toString(),
                type: "User",
                content: state.initialMessage,
            };
            const loadingMessage: Message = {
                id: Date.now().toString() + "-loading",
                type: "Assistant",
                content: "",
                isTyping: true,
            };
            setMessages((prev) => [...prev, userMessage, loadingMessage]);
            setInput("");
            setIsLoading(true);

            fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: state.initialMessage }),
            })
                .then(async (response) => {
                    if (!response.ok)
                        throw new Error(
                            `HTTP error! status: ${response.status}`
                        );
                    const data = await response.json();
                    setMessages((prev) =>
                        prev.filter((msg) => msg.id !== loadingMessage.id)
                    );
                    await simulateTyping(
                        data.final_response ||
                            "I apologize, but I'm currently unable to process your request."
                    );
                })
                .catch(async (error) => {
                    setMessages((prev) =>
                        prev.filter((msg) => msg.id !== loadingMessage.id)
                    );
                    await simulateTyping(
                        "I apologize, but I'm currently unable to process your request."
                    );
                })
                .finally(() => setIsLoading(false));
        }
    }, [location.state, isLoading, simulateTyping]);

    // Close sidebar automatically on small screens (phones) when window is resized
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 905) {
                setIsSidebarOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        // Initial check in case of SSR or navigation
        if (window.innerWidth <= 905) setIsSidebarOpen(false);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: "User",
            content: input.trim(),
        };

        // Create an initial loading message
        const loadingMessage: Message = {
            id: Date.now().toString() + "-loading",
            type: "Assistant",
            content: "",
            isTyping: true,
        };

        // Add both messages immediately
        setMessages((prev) => [...prev, userMessage, loadingMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: input }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Remove loading message before simulating typing
            setMessages((prev) =>
                prev.filter((msg) => msg.id !== loadingMessage.id)
            );

            await simulateTyping(
                data.final_response ||
                    "I apologize, but I'm currently unable to process your request."
            );
        } catch (error) {
            console.error("API Error:", error);
            // Remove loading message before simulating typing
            setMessages((prev) =>
                prev.filter((msg) => msg.id !== loadingMessage.id)
            );

            await simulateTyping(
                "I apologize, but I'm currently unable to process your request."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-page">
            <ParticleScene />

            <div
                className={`sidebar-container ${
                    isSidebarOpen ? "open" : "closed"
                }`}
            >
                <Sidebar
                    isOpen={isSidebarOpen}
                    onToggle={() => setIsSidebarOpen(false)}
                    onNewChat={handleNewChat} // Pass the handler as a prop
                />
                {!isSidebarOpen && (
                    <button
                        className="sidebar-arrow-toggle"
                        onClick={() => setIsSidebarOpen(true)}
                        aria-label="Expand sidebar"
                    >
                        <span>&#8594;</span>
                    </button>
                )}
            </div>

            <NavBar />

            <div
                className={`chat-interface ${
                    isSidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
            >
                <div className="chat-header">
                    <h1>
                        <span className="nex-neon">Nex</span>
                        <span className="flow-neon">Flow</span>
                        <span className="assistant flow-neon"> Assistant</span>
                    </h1>
                </div>

                <div className="messages-container" ref={chatContainerRef}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message-wrapper ${message.type}`}
                        >
                            <div
                                className={`message-bubble ${message.type}-bubble`}
                            >
                                <span className="message-type">
                                    {message.type}:
                                </span>
                                <div
                                    className={`message-content ${message.type}-content`}
                                >
                                    {message.isTyping && !message.content && (
                                        <LoadingText />
                                    )}
                                    {message.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="input-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message here..."
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="send-button"
                    >
                        {isLoading ? (
                            <span className="loading-indicator">
                                <span>.</span>
                                <span>.</span>
                                <span>.</span>
                            </span>
                        ) : (
                            "Send"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
