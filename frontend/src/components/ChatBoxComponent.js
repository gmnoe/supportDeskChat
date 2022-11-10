import React, { useState } from 'react';
import { Button, Card, CardBody, Row, Col, ListGroup, ListGroupItem, InputGroup, Form, Input } from 'reactstrap';

export default function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [messageBody, setMessageBody] = useState('');

    const supportHandler = () => {
        setIsOpen(true);
    }

    const closeHandler = () => {
        setIsOpen(false);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!messageBody.trim()) {
            alert("Error. Please type message.");
        } else {

        }
    }

    return (
        <div className="chatbox">
            {!isOpen ?
            <Button onClick={supportHandler} variant="primary">
                Chat with us
            </Button> : (
                <Card>
                    <CardBody>
                        <Row>
                            <Col>
                                <strong>Support</strong>
                            </Col>
                            <Col>
                                <Button className="btn-sm btn-secondary" 
                                        type="button"
                                        onClick={closeHandler}>
                                    X
                                </Button>
                            </Col>
                        </Row>
                        <hr />
                        <ListGroup>
                            <ListGroupItem>no messages</ListGroupItem>
                        </ListGroup>
                        <Form onSubmit={submitHandler}>
                            <InputGroup className="col-6">
                                <Input value={messageBody}
                                        onChange={(e) => setMessageBody(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="type message"
                                        >
                                </Input>
                                <Button type="submit" variant="primary">Send</Button>
                            </InputGroup>
                        </Form>
                    </CardBody>
                </Card>
            )}
        </div>
    )
}