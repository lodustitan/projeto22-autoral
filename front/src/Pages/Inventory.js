
import styled from "styled-components";

import { useState, useEffect, useContext } from "react";

import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';
import IdolPreview from "../Components/P_Elenco/IdolPreview";
import axios from "axios";

import { GlobalVars } from "../App";

export default function Home() {

  const globalVars = useContext(GlobalVars);
  const [searchInput, setSearchInput] = useState();

  const [search, setSearch] = useState();
  const [inventory, setInventory] = useState();

  function searchIdol() {
    if (searchInput !== "") {
      let filter;
      if (isNaN(searchInput)) filter = "idol_name";
      else filter = "idol_id";

      const url = `${import.meta.env.REACT_APP_API_URL}/idols?${filter}=${searchInput}`;

      axios
        .get(url)
        .then((res) => {
          setSearch(res.data);
        });
    }
  }
  function refreshInv() {
    axios
      .get(`${import.meta.env.REACT_APP_API_URL}/user/inv`, { headers: { authorization: `Bearer ${globalVars.cookies.get('usertoken')}` } })
      .then(el => {
        setInventory(el.data)
      })
  }

  useEffect(() => {
    refreshInv();
  }, [])

  return (
    <STYLE>
      <div className="home_news">
        <div className="home_newsChangelogs">

          <div className="home_newsChangelogsItem">
            {inventory && inventory.map((el, i) => {
              return (<IdolPreview
                key={i}
                idol_id={el.id}
                image_url={el.cardInfos.idolImageUrl}
                era_url={el.cardInfos.eraImageUrl}
                cardName={el.cardInfos.idolName}
                cardGroup={el.cardInfos.groupName}
                cardEra={el.cardInfos.eraName}
                rarity={el.cardInfos.rarity}
                market={el.market}
                preview={false}
              />)
            })
            }
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
        overflow-y: auto;
        display: flex;
        height: 100vh;

        @media (min-width: 762px){
            height: 100%;
        }
        width: 100%;
        margin-top: 1rem;
        .home_newsRanking{height: 65%} 
        .home_newsChangelogs{height: 100%}
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
                box-sizing: border-box;
                display: grid;
                grid-column-gap: 64px;
                grid-row-gap: 64px;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                @media (max-width: 762px) {
                    grid-template-columns: repeat(auto-fill, minmax(130px, 2fr));
                    grid-column-gap: 8px;
                    grid-row-gap: 12px;
                }
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