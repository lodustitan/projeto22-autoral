
import styled from "styled-components";

import { useState, useEffect, useContext } from "react";

import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';
import IdolPreview from "../Components/P_Elenco/IdolPreview";
import axios from "axios";

import { GlobalVars } from "../App";

export default function Home() {
  const globalVars = useContext(GlobalVars);
  const [page, setPage] = useState(1);

  return (
    <STYLE>
      <Title>
        Profile
      </Title>
      <Page>
        {(page === 1) && <div>
          <p>Nickname {globalVars.nickname}</p>
        </div>}
        {(page === 2) && <div>
          <p>Peanuts {globalVars.peanuts}</p>
          <p>Diamonds {globalVars.diamonds}</p>
        </div>}
      </Page>
      <Options>
        <span onClick={() => setPage(1)}>Infos</span>
        <span onClick={() => setPage(2)}>Balance</span>
      </Options>
    </STYLE>
  );
}

const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 2rem;
`;
const Page = styled.div`
  border: 2px solid white;
  border-radius: 4px;
  width: 100%;
  height: 300px;
  padding: 1rem;
`;
const Options = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
  width: 300px;

  span {
    font-size: x-large;
    padding: 4px 10px;
    border-radius: 4px;
    background-color: #338;
  }
`;
const STYLE = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
`;