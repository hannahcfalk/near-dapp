import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddTour from "./AddTour";
import Tour from "./Tour";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
    getTours as getTourList,
    createTour,
} from "../../utils/tours";

const Tours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTours = useCallback(async () => {
        try {
            setLoading(true);
            setTours(await getTourList());
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false);
        }
    });

    const addTour = async (data) => {
        try {
            setLoading(true);
            createTour(data).then((resp) => {
                getTours();
            });
            toast(<NotificationSuccess text="Walking tour added successfully." />);
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to create a walking tour." />);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTours();
    }, []);


    return (
        <>
            {!loading ? (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="fs-4 fw-bold mb-0">NEAR Walking Tours</h1>
                        <AddTour save={addTour} />
                    </div>
       
                    <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                        {tours.map((_tour) => (
                            <Tour
                                tour={{
                                    ..._tour,
                                }}
                            />
                        ))}
                    </Row>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Tours;