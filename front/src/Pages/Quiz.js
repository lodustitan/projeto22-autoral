
import styled from "styled-components";

import { useState, useEffect, useContext } from "react";
import IdolMarket from "../Components/P_Elenco/IdolMarket";
import axios from "axios";

import { GlobalVars } from "../App";

export default function Quiz()
{

    const globalVars = useContext(GlobalVars);
    const [imageUrl, setImageUrl] = useState();
    const [answer1, setAnswer1] = useState();
    const [answer2, setAnswer2] = useState();
    const [answer3, setAnswer3] = useState();
    const [answer4, setAnswer4] = useState();

    const [search, setSearch] = useState();

    function requestNewQuiz(){
        axios
            .post(`${process.env.REACT_APP_API_URL}/user/newquiz`, {}, { headers: {authorization: `Bearer ${globalVars.cookies.get('usertoken')}`} })
            .then((res)=> {
                console.log(res.data.result)
            });
    }

    return (
        <STYLE>
            <div className="home_news">
                <div className="home_newsRanking">
                    <div className="home_newsRankingHeader">
                        <button onClick={requestNewQuiz}>New Quiz</button>
                    </div>
                    {imageUrl && 
                    <div>
                        <div>
                            <img url={imageUrl} alt="quizImage" />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", width: "300px"}}>
                            <button style={{width: "50px"}}>{answer1}</button>
                            <button style={{width: "50px"}}>{answer2}</button>
                            <button style={{width: "50px"}}>{answer3}</button>
                            <button style={{width: "50px"}}>{answer4}</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </STYLE>
    );
}

const STYLE = styled.div`
    box-sizing: border-box;
    width: 100%;

    .home_news
    {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 520px;
        margin-top: 1rem;
        overflow-y: auto;
        .home_newsRanking{height: 100%} 
        .home_newsRanking, .home_newsChangelogs{
            overflow-y: auto;
            width: 100%;
            div {
                padding: 1rem 1rem;
            }
            .home_newsRankingHeader, .home_newsChangelogsHeader {
                z-index: 1;
                background-color: #111;
                position: sticky;
                top: 0;
            }
            .home_newsRankingItem, .home_newsChangelogsItem {
                background-color: #222;
                &>div { max-height: 100px }
                img { max-height: 48px; max-width: 48px}
                font-size: .8rem;
            }
        }
        
    }
    .elenco_panel
    {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 64px;
        padding: 1rem;
        background-color: #333;
    }
`;