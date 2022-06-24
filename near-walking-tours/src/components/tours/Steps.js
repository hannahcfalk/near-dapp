import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddStep from "./AddStep";
import Step from "./Step";
import Loader from "../utils/Loader";
import { Col } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";


const Steps = ({ title }) => {
    const [loading, setLoading] = useState(false);

    const addStep = async (data) => {
        try {
            setLoading(true);
            toast(<NotificationSuccess text="Walking tour added successfully." />);
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to create a walking tour." />);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {!loading ? (
                <>
                    <Step
                        number={1}
                        tour_id={"0"}
                        name={"Jamaica Wine House"}
                        description={"The Jamaica Wine House is almost impossible to find, unless you already know where it is! It was built on the site of London's first coffee house in the churchyard of a Dickensian church and, although it has historic links with the sugar trade and slave plantations of the West Indies, this is an atmospheric must-see, with the famous Todd's Wine Bar nested downstairs.?"}
                        location={"St. Michaels Alley, Cornhill, EC3V 9DS"}
                        image={"https://upload.wikimedia.org/wikipedia/commons/a/a2/Jamaica_Wine_House_20130323_049.jpg"}
                    />
                    <Step
                        number={2}
                        tour_id={"0"}
                        name={"The Globe"}
                        description={"The Globe is conveniently located a short stroll from Moorgate and Liverpool Street Underground Stations and the Barbican Centre. With its elegant rococo exterior, the pub runs along the line of a Roman Wall. It's situated close to the original site of notorious Bedlam (Bethlem) and the famous poet, John Keats, was also born in a stable next door."}
                        location={"83 Moorgate, EC2M 6SA"}
                        image={"https://upload.wikimedia.org/wikipedia/commons/7/77/Restaurante_The_Swan%2C_Londres%2C_Inglaterra%2C_2014-08-11%2C_DD_113.jpg"}
                    />
                    <AddStep save={addStep} />
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Steps;