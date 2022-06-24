import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddStep = ({ save }) => {
    const [name, setName] = useState("");
    const [show, setShow] = useState(false);
    const isFormFilled = () => name;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                onClick={handleShow}
                variant="dark"
                className="rounded-pill m-2"
            >
                Add Step
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Step</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <FloatingLabel
                            controlId="inputName"
                            label="Name of stage"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                placeholder="Enter the name of your walking tour"
                            />
                        </FloatingLabel>
                    
                    </Modal.Body>
                </Form>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="dark"
                        disabled={!isFormFilled()}
                        onClick={() => {
                            save({
                                name,
                            });
                            handleClose();
                        }}
                    >
                        Save stage
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

AddStep.propTypes = {
    save: PropTypes.func.isRequired,
};

export default AddStep;