import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { fetchHistory } from "app/flights/store/flights.actions";
import { selectChatMessages } from "app/flights/store/flights.selectors";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { userProfileSelector } from "../app/flights/store/flights.selectors";

interface Message {
  senderId: string;
  content: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onRequestClose }) => {
  const user = useSelector(userProfileSelector);
  const userId = user?.id;
  const messages1 = useSelector(selectChatMessages);

  console.log(messages1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = io("http://localhost:5001", {
    transports: ["websocket"],
    query: {
      userId: userId,
      isManager: false,
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchHistory(userId));
  }, [userId, dispatch, user]);

  useEffect(() => {
    socket.on(
      "message",
      ({ senderId, content }: { senderId: string; content: string }) => {
        setMessages((prevMessages) => [...prevMessages, { senderId, content }]);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const listRef = useRef<HTMLUListElement>(null);

  const handleSendMessage = () => {
    socket.emit("message", {
      senderId: userId,
      content: newMessage,
      roomId: userId,
    });
    setNewMessage("");
  };

  const handleClose = () => {
    onRequestClose();
  };

  const scrollToBottom = () => {
    if (listRef.current && listRef.current.lastElementChild) {
      listRef.current.lastElementChild.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Chat with manager</DialogTitle>
      <DialogContent>
        <div
          style={{
            height: 300,
            width: 300,
            overflowY: "auto",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <ul ref={listRef} style={{ width: "100%" }}>
            {messages &&
              messages.map((message, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: 2,
                    alignSelf:
                      message.senderId === userId ? "flex-end" : "flex-start",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "100%", padding: "10px" }}>
                    <span
                      style={{
                        textAlign:
                          message.senderId === userId ? "right" : "left",
                        color: message.senderId === userId ? "blue" : "green",
                      }}
                    >
                      {message.senderId === userId ? "You:" : "Manager:"}{" "}
                      {message.content}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <TextField
          style={{ width: "100%", marginTop: "10px" }}
          fullWidth
          variant="outlined"
          label="Enter your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          style={{ width: "100%", marginTop: "10px", padding: "10px" }}
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatModal;
