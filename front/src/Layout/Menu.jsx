
import styled from "styled-components"
import Division from "../Components/L_Menu/Division";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVars } from "../App";

import PopUp from "../Components/PopUps/PopUp";
import axios from "axios";

export default function Menu(){
    const globalVars = useContext(GlobalVars);

    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);

    const logout = () => {
        console.log ( globalVars.cookies.get('usertoken') );
        globalVars.cookies.remove('usertoken');
        navigate("/authentication");
    }

    const work = (event) => {
        event.stopPropagation();
        axios
            .post(`${import.meta.env.VITE_API_URL}/user/work`, {}, { headers: {authorization: `Bearer ${globalVars.cookies.get('usertoken')}`} })
            .then(() =>  setShowPopup(!showPopup))
    }

    function closeModal() {
        window.location.reload(false);
    }

    return (
        <STYLE>
            <Division name="Main">
                {(globalVars.accountName)&&<>
                    <MenuButton onClick={() => navigate("/")}>Home</MenuButton>
                    <MenuButton onClick={() => navigate("/inventory")}>Inventory</MenuButton>
                    <MenuButton onClick={work}>Work</MenuButton>
                    
                    {showPopup && <PopUp title="Work" close={() => { closeModal()  } }>
                        Seu trabalho gerou 100 peanuts
                    </PopUp>}

                    <MenuButton onClick={() => navigate("/gacha")}>Gacha</MenuButton>
                    <MenuButton onClick={() => navigate("/market")}>Market</MenuButton>
                    <MenuButton onClick={() => navigate("/search")}>Search Cards</MenuButton>
                </>}
            </Division>
            {(globalVars.accountName)&&
            <Division name="Mini-Game">
                <MenuButton onClick={()=>navigate("/quiz")}>Quiz</MenuButton>
            </Division>}
            {(globalVars.cookies.get('usertoken'))&&
            <Division name="System">
                <MenuButton onClick={logout}>Logout</MenuButton>
            </Division>}
        </STYLE>
    )
}

const STYLE = styled.div`
    z-index: 999;
    width: 100%;
    height: 100%;
    border-right: 1px solid #555;
    color: #eee; 
`;
const MenuButton = styled.div`
    padding: .4rem 1rem;
    border-radius: 5px;
    margin-bottom: 1rem;
`