import React, { useState } from "react";
import "../styles/Sidebar.css";

interface Chat {
  id: string;
  title: string;
  timestamp: Date;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat?: () => void; // Add this prop
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onNewChat }) => {
  const [chats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);


  // Call the parent handler to clear messages
  const handleNewChatClick = () => {
    if (onNewChat) onNewChat();
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <button className="toggle-button" onClick={onToggle}>
          {isOpen ? "✕" : "≡"}
        </button>
        {isOpen && (
          <button className="new-chat-button" onClick={handleNewChatClick}>
            New Chat
          </button>
        )}
      </div>

      {isOpen && (
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${
                selectedChat === chat.id ? "selected" : ""
              }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <span className="chat-title">{chat.title}</span>
              <span className="chat-timestamp">
                {chat.timestamp.toLocaleDateString()}
              </span>
            </div>
          ))}
          {/* Footnote with integrations button */}
          <div className="sidebar-footnote">
            <span>
              Don&apos;t know how to improve workflow? Check out&nbsp;
            </span>
            <a className="integrations-btn" href="/integrations">
              integrations!
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
