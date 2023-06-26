
import styled from "styled-components";

import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { GlobalVars } from "../App";

export default function Search() {

  const globalVars = useContext(GlobalVars);
  const [search, setSearch] = useState();

  const [filterType, setFilterType] = useState();
  const [filteredSearch, setFilteredSearch] = useState();

  const requestSearchIdol = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/idol/search`)
      .then((res) => {
        console.log(res.data.listIdols);
        setSearch(res.data.listIdols);
      });
  }
  const filterSearch = (el) => {
    let filterSearchVariable; 
    switch (filterType) {
      case "name":
        filterSearchVariable = search.filter(ely => ((ely.idolName).toLowerCase()).includes(el));
        break;
      case "era":
        filterSearchVariable = search.filter(ely => ((ely.eraName).toLowerCase()).includes(el));
        break;
      case "group":
        filterSearchVariable = search.filter(ely => ((ely.groupName).toLowerCase()).includes(el));
        break;
    }
    
    if(el.length === 0) return setFilteredSearch();

    setFilteredSearch(filterSearchVariable);
  }
  useEffect(() => { requestSearchIdol() }, [])

  return (
    <STYLE>
      <div className="search_findPanel">
        <select onChange={(el) => setFilterType(el.target.value)}>
          <option selected value="name">Name</option>
          <option value="era">Era</option>
          <option value="group">Group</option>
        </select>
        <input type="text" onChange={(el) => filterSearch(el.target.value)} />
        <button>🔎</button>
      </div>
      {filteredSearch ? 
      <div className="search_catalogo">
      {filteredSearch && filteredSearch.map((el, i) => {
        return (<div
          key={i}
          className="search_catalogo_card"
          >
          <div className="scc_left">
            <img src={el.idolImageUrl} alt="idolPerfil" />
          </div>
          <div className="scc_right">
            <span>{el.id}</span>
            <span>{el.idolName} - {el.groupName}</span>
            <span>Era {el.eraName}</span>
            <span>{el.rarity.name} {el.rarity.icon}</span>
          </div>
        </div>)
      })
      }
    </div>
      :<div className="search_catalogo">
        {search && search.map((el, i) => {
          return (<div
            key={i}
            className="search_catalogo_card"
            >
            <div className="scc_left">
              <img src={el.idolImageUrl} alt="idolPerfil" />
            </div>
            <div className="scc_right">
              <span>{el.id}</span>
              <span>{el.idolName} - {el.groupName}</span>
              <span>Era {el.eraName}</span>
              <span>{el.rarity.name} {el.rarity.icon}</span>
            </div>
          </div>)
        })
        }
      </div>
      }
    </STYLE>
  );
}

const STYLE = styled.div`
    box-sizing: border-box;
    width: 100%;
    .search_findPanel {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px;
      * { height: 26px }
      select {
        width: 15%;
      }
      input {
        width: 70%;
      }
      button {
        width: 10%;
      }
    }
    .search_catalogo {
      display: flex;
      flex-direction: column;
      align-items: center;

      .search_catalogo_card {
        display: flex;
        height: 100px; width: 96%;
        margin-bottom: 1rem;
        background-color: #444;
        .scc_left{
          display: flex; justify-content: center; align-items: center;
          height: 100%; width: 100px;
          img { height: 90px; width: 90px; object-fit: cover; }
        }
        .scc_right{
          display: flex; flex-direction: column; justify-content: center; align-items: flex-end;
          height: 100%; width: 100%;
          font-size: smaller;
        }
      }
    }
`;