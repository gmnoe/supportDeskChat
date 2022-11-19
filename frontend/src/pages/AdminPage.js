import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from "socket.io-client";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";


const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:4000"
    : window.location.host;

export default function AdminPage() {
  // State Hooks
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.scrollHeight,
        left: 0,
        behavior: "smooth"
      });
    }
    if (socket) {
      socket.on("message", (data) => {
        if (selectedUser.name === data.from) {
          setMessages([...messages, data]);
        } else {
          const existUser = users.find((user) => user.name === data.from);
          if (existUser) {
            setUsers(
              users.map((user) => 
                user.name === existUser.name ? { ...user, unread: true } : user
              )
            );
          }
        }
      });

      socket.on("updatedUser", (updatedUser) => {
        const existUser = users.find((user) => user.name === updatedUser.name);
        if (existUser) {
          setUsers(
            users.map((user) => 
              user.name === existUser.name ? updatedUser : user
            )
          );
        } else {
          setUsers([...users, updatedUser]);
        }
      });
      socket.on("listUsers", (updatedUsers) => {
        setUsers(updatedUsers);
      });
      socket.on("selectUser", (user) => {
        setMessages(user.message);
      });
    } else {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      sk.emit("onLogin", {
        name: "Admin"
      });
    }
  }, [messages, selectedUser, socket, users]);

  const selectUser = (user) => {
    setSelectedUser(user);
    const existUser = users.find((x) => x.name === user.name);
    if (existUser) {
      setUsers(
        users.map((x) => 
        x.name === existUser ? { ...x, unread: false } : x 
        )
      );
    }
    socket.emit("onUserSelected", user);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      setMessages([
        ...messages,
        { body: messageBody, from: "Admin", to: selectedUser.name }
      ]);
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          from: "Admin",
          to: selectedUser.name
        });
      }, 1000);
      setMessageBody("");
    }
  };

  return (
    <Row>
      <Col sm={3}>
        {users.filter((x) => x.name !== "Admin").length === 0 && (
          <Alert variant="info">No User Found</Alert>
        )}
        <ListGroup>
          {users
            .filter((x) => x.name !== "Admin")
            .map((user) => (
              <ListGroupItem 
              action 
              key={user.name} 
              variant={user.name === selectedUser.name ? "info" : ""} 
              onClick={() => selectUser(user)}
              >
                {user.name}
            </ListGroupItem>
            ))}
        </ListGroup>
      </Col>
    </Row>
  );
}