import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import styled from "styled-components";

import TopStatus from "./Layout/TopStatus";
import Menu from "./Layout/Menu";
import Authentication from "./Pages/Authentication";
import Inventory from "./Pages/Inventory";
import Market from "./Pages/Market";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Cookies from "universal-cookie";
import Quiz from "./Pages/Quiz";
import Search from "./Pages/Search";


export const GlobalVars = createContext(); 

function App() 
{
	const [nickname, setNickname] = useState();
	const [accountName, setAccountName] = useState();
	const [diamonds, setDiamonds] = useState();
	const [peanuts, setPeanuts] = useState();
	
	const cookies = new Cookies();

    return (
		<GlobalVars.Provider value={{
			nickname, accountName, diamonds, peanuts,
			setNickname, setAccountName, setDiamonds, setPeanuts,
			cookies, 
		}}>
			<BrowserRouter>
				<STYLE>
					<div className="menu">
						<LinkMenu to="/menu">Abrir Menu</LinkMenu>
					</div>
					<div className="main">
						<Routes>
							<Route path="/authentication" element={<Authentication />} />
							<Route path="/" element={<Home />} />
							<Route path="/menu" element={<Menu />} />
							<Route path="/market" element={<Market />} />
							<Route path="/inventory" element={<Inventory />} />
							<Route path="/gacha" element={<Shop />} />
							<Route path="/quiz" element={<Quiz />} />
							<Route path="/search" element={<Search />} />
						</Routes>
					</div>
					<TopStatus />
				</STYLE>
			</BrowserRouter>
		</GlobalVars.Provider>
    );
}
const LinkMenu = styled(Link)`
	width: 100%;
	padding: 1rem;
	color: white;
	text-decoration: none;
`;
const STYLE = styled.div`
	display: flex;
	position: relative;
	height: 100vh;
	background-color: #444;
	color: white;
	overflow-y: auto; 

	flex-direction: column;
	.menu {
		width: 100%;
		height: 8%;
	}
	.main {
		width: 100%;
		height: 84%;
	}
`;

export default App;
