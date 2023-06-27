import styled from "styled-components"
import {startTransition, useState, useContext} from "react" 
import abbreviation from "../../Services/NumberAbreviation";

import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";

import { GiBarefoot, GiMicrophone, GiFemaleLegs, GiBookmarklet, GiMagicLamp } from 'react-icons/gi';
import { BiFlag } from "react-icons/bi";

import PopUp from "../PopUps/PopUp";
import axios from "axios";
import { GlobalVars } from "../../App";


export default function IdolPreview({idol_id, image_url, era_url, cardName, cardGroup, cardEra, rarity, market})
{

    const globalVars = useContext(GlobalVars);

    const [showPopup, setShowPopup] = useState(false);
    const [modalId, setModalId] = useState(0);
    const [idolId, setIdolId] = useState(idol_id);
    const [price, setPrice] = useState();

    async function sellCard(){
        const priceNumber = Number(price);
        if(priceNumber < 50) return;

        await axios.post(`${import.meta.env.VITE_API_URL}/market/sell`, { idolId, price: priceNumber }, { headers: {authorization: `Bearer ${globalVars.cookies.get('usertoken')}`} })
        setShowPopup(false);
    }

    const modals = [
        <PopUp title="Sell" price={price} confirm={() => sellCard()} close={() => { setShowPopup(!showPopup);  }} input={true} inputValue={price} onChange={setPrice}>
        Digite o valor da venda</PopUp>,

    ];
    
    return (
        <STYLE>
            {showPopup && modals[modalId]}

            <div className="idol_infoProfile">
                <div className="idol_infoProfile_rarity">
                    <span>{rarity.icon}</span>
                    <span>{rarity.name}</span>
                </div>
                <div className="idol_infoProfile_image">
                    <img src={image_url} alt="logo" />
                </div>
            </div>
            <div className="idol_infoStatus">
                <div className="idol_infoStatus_era">
                    <img src={era_url} alt="image era" onError={ (e) => e.target.remove()} />
                    <span>{cardEra}</span>
                </div>
                <p className="idol_infoStatus_name">{cardGroup} {cardName}</p> 
            </div>
            <div className="idol_painel">
                {!market ? 
                <>
                    <p onClick={() => setShowPopup(!showPopup)}>Sell</p>
                </>
                :"On Market"}
            </div>
        </STYLE>
    )
}

const STYLE = styled.div`
    display: flex; flex-direction: column; align-items: center; justify-content: space-between;
    border-radius: 8px;
    background-color: #444;
    box-sizing: border-box;
    margin-bottom: 0; padding: 0;
    z-index: 0;

    @media (min-width: 762px) { height: 420px; width: 260px; }
    @media (max-width: 762px) { height: 210px; width: 130px; }
    .idol_infoProfile {
        padding: 0; margin: 0;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        
        @media (min-width: 762px) { height: 60%; width: 100%; }
        @media (max-width: 762px) { height: 50%; width: 100%; }

        .idol_infoProfile_rarity {
            padding: 0; margin: 0;
            &>span { font-weight: 300 }
        }
        .idol_infoProfile_image {
            @media (min-width: 762px) {
                height: 200px; width: 230px;
                img {
                    min-height: 200px; min-width: 100%; 
                    max-height: max-content; max-width: 100%; 
                    height: 100%; width: 100%; 
                    object-fit: cover;
                    border-radius: 6px;
                }
            }
            @media (max-width: 762px) {
                height: 100px; width: 130px;
                img {
                    min-height: 100px; min-width: 100px; 
                    max-height: 100px; max-width: 100px; 
                    height: 100%; width: 100%; 
                    object-fit: cover;
                    border-radius: 6px;
                }
            }
        }
    }
    .idol_infoStatus{
        display: flex; flex-direction: column;
        @media (min-width: 762px) {
            height: 30%; width: 100%;
        }
        @media (max-width: 762px) {
            height: 40%; width: 100%;
        }

        p {
            padding: 0;
            width: 100%;
            text-align: center;
        }
        .idol_infoStatus_era {
            padding: 0; margin: 0;
            display: flex; justify-content: space-around; align-items: center; 

            @media (min-width: 762px) { 
                img { width: 48px; height: 48px }
                span { font-size: 18px; font-weight: 200 }
            }
            @media (max-width: 762px) { 
                display: none;
                img { width: 32px; height: 32px }
                span { font-size: 12px; font-weight: 600 }
             }
            
        }
        .idol_infoStatus_name {
            padding: 0; margin: 0;
            
            @media (min-width: 762px) { font-size: 22px; font-weight: 400; }
            @media (max-width: 762px) { font-size: 14px; }
        }
    }
    .idol_painel {
        @media (min-width: 762px) { height: 10%; }
        @media (max-width: 762px) { grid-area: 4 / 2 / 5 / 3; }
        p { 
            cursor: pointer;
            background: dodgerblue;
            padding: 4px 6px; margin: 4px 
        }
    }
`;