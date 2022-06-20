import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack } from "react-bootstrap";

const Tour = ({ tour }) => {
    const { id, price, title, description, location, image, owner } =
        tour;

    return (
        <Col key={id}>
            <Card className=" h-100">
                <Card.Header>
                    <Stack direction="horizontal" gap={2}>
                        <span className="font-monospace text-secondary">{owner}</span>
                    </Stack>
                </Card.Header>
                <div className=" ratio ratio-4x3">
                    <img src={image} alt={title} style={{ objectFit: "cover" }} />
                </div>
                <Card.Body className="d-flex  flex-column text-center">
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="flex-grow-1 ">{description}</Card.Text>
                    <Card.Text className="text-secondary">
                        <span>{location}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

Tour.propTypes = {
    tour: PropTypes.instanceOf(Object).isRequired,
};

export default tour;