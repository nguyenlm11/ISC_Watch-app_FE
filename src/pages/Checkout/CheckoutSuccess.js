import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const CheckoutSuccessPage = () => {
    const navigate = useNavigate();

    const handleGoToProfile = () => {
        navigate('/myorders');
    };

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Checkout Success!</h2>
            <p>Your order has been placed successfully.</p>
            <Button type="primary" onClick={handleGoToProfile}>
                Go to My orders
            </Button>
        </div>
    );
};

export default CheckoutSuccessPage;
