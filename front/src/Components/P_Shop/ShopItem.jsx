import styled from "styled-components"
import abbreviation from "../../Services/NumberAbreviation";

import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import { GlobalVars } from "../../App";
import axios from "axios";

export default function ShopItem({shopId, packName, price, onClick})
{
    const globalVars = useContext(GlobalVars);
    return (
        <STYLE>
            <div className="overhall">
                <div className="shopItem_name">{packName}</div>
                <div className="shopItem_price">{abbreviation(price, 3)}p</div>
            </div>
            <button disabled={!(globalVars.peanuts >= price)} onClick={onClick}>Comprar</button>
        </STYLE>
    )
}

const STYLE = styled.div`
    width: 180px;
    height: 80px;
    background-color: #333;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .overhall {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;