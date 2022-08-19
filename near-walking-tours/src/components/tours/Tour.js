import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { utils } from "near-api-js";
import { Card, Col, Button, Stack, Modal, Badge } from "react-bootstrap";
import Steps from "./Steps";
import {checkOwner} from "../../utils/tours";

const Tour = ({ tour, buy }) => {
    const { id, price, title, description, location, image, owner } =
        tour;
    const [ownedTours, setOwnedTours] = useState([]);
    const triggerBuy = () => {
        buy(id, price);
    }

    const account = window.walletConnection.account();

    const getOwned = useCallback(async () => {
        try {
            setOwnedTours(await checkOwner(account.accountId, id));
        } catch (error) {
            console.log({ error });
        }
    });

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    let badge = null;
    let buyButton = null;
    let steps = null;
    if (ownedTours || account.accountId === owner) {
        badge = <Badge bg="success" className="ms-auto">owned</Badge>;
        steps = <Steps title={title} tour={tour} />;
    } else {
        buyButton = (<Button
            variant="outline-dark"
            onClick={triggerBuy}
            className="w-100 py-3"
        >
            Buy for {utils.format.formatNearAmount(price)} NEAR
        </Button>);
        steps = <h5 className="text-center">Buy the walking tour to view the steps!</h5>
    }

    useEffect(() => {
        getOwned();
    }, []);

    return (
        <Col key={id}>
            <div onClick={handleShow}>
                <Card className=" h-100">
                    <Card.Header>
                        <Stack direction="horizontal" gap={2}>
                            <span className="font-monospace text-secondary">{owner}</span>
                            {badge}
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
                        {buyButton}
                    </Card.Body>
                </Card>
            </div>
            <Modal size="lg" show={show} onHide={handleClose}>
                {steps}
            </Modal>
        </Col>
    );
};

Tour.propTypes = {
    tour: PropTypes.instanceOf(Object).isRequired,
    buy: PropTypes.func.isRequired,
};

export default Tour;