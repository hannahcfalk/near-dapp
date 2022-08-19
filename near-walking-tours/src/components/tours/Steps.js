import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddStep from "./AddStep";
import Step from "./Step";
import Loader from "../utils/Loader";
import { Col } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
    getSteps as getStepList,
    createStep,
} from "../../utils/steps";


const Steps = ({ title, tour }) => {
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(false);

    const getSteps = useCallback(async () => {
        try {
            setLoading(true);
            setSteps(await getStepList(tour.id));
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false);
        }
    });

    const addStep = async (data) => {
        try {
            data["tour_id"] = tour.id;
            setLoading(true);
            console.log("add step " + tour.id);
            createStep(data).then((resp) => {
                getSteps(tour.id);
            });
            toast(<NotificationSuccess text="Step added successfully." />);
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to create a step." />);
        } finally {
            setLoading(false);
        }
    };

    let addButton = null;
    const account = window.walletConnection.account();
    if (account.accountId === tour.owner) {
        addButton = <AddStep save={addStep} />;
    }

    useEffect(() => {
        getSteps();
    }, []);

    return (
        <>
            {!loading ? (
                <>
                    <h1>{title}</h1>
                    {steps.map((_step) => (
                        <Step
                            key={_step.id}
                            step={{
                                ..._step,
                            }}
                        />
                    ))}
                    {addButton}
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Steps;
