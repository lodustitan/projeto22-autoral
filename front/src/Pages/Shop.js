
import styled from "styled-components";

import Button from "react-bootstrap/Button"

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ShopItem from "../Components/P_Shop/ShopItem";

import { GlobalVars } from "../App.js";

export default function Shop() {
    const [shopList, setShopList] = useState();
    const [idolName, setIdolName] = useState("");
    const [shopResult, setShopResult] = useState(null);

    const globalVars = useContext(GlobalVars);

    const gacha = (id) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/user/gacha`, { gachaId: id }, { headers: { authorization: `Bearer ${globalVars.cookies.get('usertoken')}` } })
            .then((el) => {
                setShopResult(el.data);
            })
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/gachaList`)
            .then(el => {
                setShopList(el.data)
            })
    }, [])
    return (
        <STYLE>
            <div className="shop_idols">
                {shopList &&
                    shopList.map(el => <ShopItem
                        shopId={el.id}
                        packName={el.name}
                        price={el.price}
                        onClick={() => gacha(el.id)}
                    />)
                }
            </div>
            {shopResult && 
                <div>
                    Congratulations, reward of pack are an &nbsp;
                        <span style={{ color: "#E64747" }}>
                            {shopResult.idolName} ({shopResult.groupName})
                        </span> 
                    &nbsp; of era &nbsp;
                        <span style={{ color: "#E64747" }}>
                            {shopResult.eraName}
                        </span> 
                    &nbsp; [Rarity: {shopResult.rarity.name} {shopResult.rarity.icon}]
                </div>}
        </STYLE>
    );
}

const STYLE = styled.div`
    box-sizing: border-box;
    padding: 0 2rem;

    input {
        background-color: transparent;
        border: 2px solid #eee;
        border-radius: 4px;
        color: #eee;
        font-size: 1.2rem;
        padding: 0 1rem;
        margin: 1rem;
    }
    .shop_teams, .shop_idols
    {
        overflow-y: auto;
        margin-top: 1.5rem;
    }
    .shop_idols
    {
        display: flex;
        flex-wrap: wrap;
    }
    .shop_panel
    {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 64px;
        padding: 1rem;
        background-color: #333;
    }
`;