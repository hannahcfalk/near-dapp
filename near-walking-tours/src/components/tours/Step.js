import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const Step = ({ step }) => {
    const { name, description, location, image } =
        step;
    return (
        <Card className="m-1" style={{ border: "solid 2px black" }} >
            <Row>
                <Col style={{ borderRight: "solid 1px grey" }} >
                    <div className="ratio ratio-4x3">
                        <img src={image} alt={name} style={{ objectFit: "cover" }} />
                    </div>
                </Col>
                <Col>
                     <Card.Body className="d-flex  flex-column text-center">
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>{description}</Card.Text>
                        <Card.Text className="text-secondary">
                            <span>{location}</span>
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>

        </Card>
       );
};


export default Step;