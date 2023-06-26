import data from "../assets/idols.json";
import { config } from "dotenv";

config();


//! NEED REFACT SOON!!!
export async function getDataGacha() {
    let gachaList = [...data.gachas];
    let idolList = [...data.idols];
    let groupList = [...data.groups];

    const completeList = [];

    for ( let gacha of gachaList ) {
        type CardInfo = { idol_name: string, group_name: string, era_name: string }
        type GachaData = { id: number, name: string, price: number, loot: CardInfo[] }; 
        const responseGachaData: GachaData = {
            id: gacha.id,
            name: gacha.name,
            price: gacha.price,
            loot: []
        } 

        for ( let loot of gacha.loot ) {
            for ( let card of loot.cards_id ) {
                const idolInfos = idolList.find(el => el.id === card.idol_id);
                if(!idolInfos) continue;

                const groupInfos = groupList.find(el => el.id == idolInfos.group_id);
                if(!groupInfos) continue;

                const idolEra = groupInfos.eras.find(el => el.id === card.era_id);
                if(!idolEra) continue;

                const cardInfo: CardInfo = {
                    idol_name: idolInfos.idol,
                    group_name: groupInfos.name,
                    era_name: idolEra.name
                }
                responseGachaData.loot.push( cardInfo );
            }
        }
        completeList.push( responseGachaData );
    }
    return completeList;
}