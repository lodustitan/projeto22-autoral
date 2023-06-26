
import styled from "styled-components";

import { useState, useEffect, useContext } from "react";

import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';
import IdolMarket from "../Components/P_Elenco/IdolMarket";
import axios from "axios";

import { GlobalVars } from "../App";

export default function Market()
{

    const globalVars = useContext(GlobalVars);
    const [searchInput, setSearchInput] = useState();

    const [search, setSearch] = useState();

    function searchIdol(){
        if(searchInput !== "") {

            axios
                .post(`${process.env.REACT_APP_API_URL}/market/search`, { 
                    searchString: searchInput,
                    category: 0,
                    orderBy: 0,
                    page: 1
                 }, {headers: { headers: {authorization: `Bearer ${globalVars.cookies.get('usertoken')}`} }})
                .then((res)=> {
                    setSearch(res.data.result);
                });
        }
    }
    useEffect(()=>{
        axios
            .post(`${process.env.REACT_APP_API_URL}/market/search`, { 
                searchString: searchInput,
                category: 0,
                orderBy: 0,
                page: 1
                }, { headers: {authorization: `Bearer ${globalVars.cookies.get('usertoken')}`} })
            .then((res)=> {
                setSearch(res.data);
            });
    }, [])

    return (
        <STYLE>
            <div className="home_news">
                <div className="home_newsRanking">
                    <div className="home_newsRankingHeader">
                        <input type="text" placeholder="Pesquisar Idol" value={searchInput} onChange={el => setSearchInput(el.target.value)}></input>
                        <button onClick={searchIdol}>Search</button>
                    </div>
                    <div>
                        {search && search.map( (el,i) =><IdolMarket 
                            key={i}
                            idol_id={el.id}
                            image_url={el.cardInfos.idolImageUrl}
                            cardName={el.cardInfos.idolName}
                            cardGroup={el.cardInfos.groupName}
                            cardEra={el.cardInfos.eraName}

                            market_id={el.market.id}
                            price={el.market.price}
                        />)}
                    </div>
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