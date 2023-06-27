import styled from "styled-components"
import { useState, useContext } from "react" 
import axios from "axios";

import PopUp from "../PopUps/PopUp";

import { GlobalVars } from "../../App";

export default function IdolMarket({idol_id, image_url, cardName, cardGroup, cardEra, market_id, price}) {

    const globalVars = useContext(GlobalVars);

    const [showPopup, setShowPopup] = useState(false);
    const [modalId] = useState(0);

    const buyCard = () => {
        const priceNumber = Number(price);
        if(priceNumber < 50) return;

        axios.post(`${import.meta.env.VITE_API_URL}/market/buy`, { marketId: market_id }, { headers: {authorization: `Bearer ${globalVars.cookies.get('usertoken')}`} })
    }


    const modals = [
        <PopUp title="Sell" price={price} confirm={() => buyCard()} close={() => { setShowPopup(!showPopup);  }} input={true} inputValue={price}>
        Digite o valor da venda</PopUp>,

    ];
    
    return (
        <STYLE>

            {showPopup && modals[modalId]}

            <div className="idol_infoProfile">
                <img src={image_url} alt="logo" />
            </div>
            <div className="idol_infoStatus">
                <div>
                    <p className="idol_infoStatusName">Name: {cardEra} {cardGroup} {cardName}</p> 
                    <p className="idol_infoStatusName">ID: {idol_id}</p> 
                    <p className="idol_infoStatusName">MarketID: {market_id}</p> 
                </div>
                <div className="marketIdol_price">
                    <span>${price}</span>
                    <button onClick={buyCard}>Buy</button>
                </div>
            </div>
        </STYLE>
    )
}

const STYLE = styled.div`
    z-index: 0;
    border-radius: 8px;
    background-color: #444;
    height: 140px;
    margin-bottom: 1rem;
    display: flex;
    height: 100%;
    .idol_infoStatus{
        display: flex;
        flex-direction: column;
        height: 70%;
        .marketIdol_price {
            display: flex;
            justify-content: space-around;
            span { 
                font-weight: 300;
                font-size: 22px
            }
            button {
                color: white; background-color: dodgerblue;
                border: none; border-radius: 2px;
                padding: 2px 16px; 
                cursor: pointer;
            }
        }
    }
    .idol_infoStatusName{
        padding: 0; margin: 0;
        font-weight: 200;
        color: #f5f5f5
    }

    .idol_infoProfile
    {
        position: relative;
        padding: 0; margin: 0;
        width: 30%;
        span
        {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: -1rem;
            top: -1rem;
            font-size: 1rem;
        }
        img
        {
            height: 160px;
            width: 128px;
            border-radius: 6px;
        }
    }
    .idol_infos, .idol_infoStatusAttributes
    {
        display: flex;
    }
`;