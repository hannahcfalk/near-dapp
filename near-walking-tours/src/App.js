import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { getTours } from "./utils/tours";
import { login } from "./utils/near";

function App() {
    const account = window.walletConnection.account();
    const [tours, setTours] = useState([]);
    const fetchTours = useCallback(async () => {
        if (account.accountId) {
            setTours(await getTours());
        }
    });
    useEffect(() => {
        fetchTours();
    }, []);
    return (
        <>
            {account.accountId ? (
                <p>hi</p>
            ) : (
                <button onClick={login}>CONNECT WALLET</button>
            )}
        </>
    );
}

export default App;