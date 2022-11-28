import { useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "./axios";
import { tempOrderData } from "./tempAssets/tempOrderData";
import OrderConfirmationPageComponents from "./OrderConfirmationPageComponents";


const OrderConfirmationPage = () => {
    // some kind of axios call here to fetch data from orderId
    // the response is simulated with tempOrderData
    // ******
    //
    // let { orderId } = useParams();
    //
    // useEffect(() => {
    //
    //     const fetch_squareOrder = async () => {
    //         try {
    //             const res = await axios.get("/order/orderId");
    //             const tempOrderData = res.data;
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     fetch_squareOrder();
    // }, []);
    //
    // ******

    return (
        <div className="orderOuterContainer">
            <div className="orderInnerContainer">
               <OrderConfirmationPageComponents tempOrderData={tempOrderData} /> 
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
