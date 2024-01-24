import ChatIcon from "@mui/icons-material/Chat";
import { Button } from "@mui/material";
import React, { useState } from "react";
import ChatModal from "./chatModal";

const ChatSwitchPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatModalClose = () => {
    setIsChatOpen(false);
  };
  return (
    <div style={{ position: "fixed", bottom: "16px", right: "16px" }}>
      <Button
        onClick={() => setIsChatOpen(true)}
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <ChatIcon style={{ marginRight: "8px" }} />
        CHAT
      </Button>
      <ChatModal isOpen={isChatOpen} onRequestClose={handleChatModalClose} />
    </div>
  );
};

export default ChatSwitchPage;
