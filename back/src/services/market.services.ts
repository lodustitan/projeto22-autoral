import { newUser } from "../protocols/protocols";
import { 
    idolsRepository,
    marketRepository,
    sessionsRepository,
    usersRepository
} from "../repositories";
import data from "../assets/idols.json";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { addCashById, getByUserId, getDataIdolById, removeCashById } from ".";

config();

export async function getAllMarket(page: number) {
    try {
        const query = await marketRepository.getAll(page);
        const inventory = [];

            if(query.result){
                for ( let q of query.result ) {
                    const idol = await idolsRepository.getIdol(q.idol_id)

                    if(!idol.result) return false;
                    const cardInfos = await getDataIdolById(idol.result.card_id, idol.result.era_id);
                    const data = {
                        id: q.idol_id,
                        user_id: q.owner_id,
                        market: q,
                        cardInfos
                    };
                    
                    inventory.push(data);
                }
            }

            return inventory;
            
    } catch (err) {
        return null
    }
}
export async function buyMarket(userId: number, id: number) {
    try {
        
        const account = await getByUserId(userId);
        if(account) {
            const idolMarket = await marketRepository.getByMarketID(id);
            
            console.log(account.peanuts, idolMarket.result)
            if(idolMarket.result){
                if(idolMarket.result.id && account.peanuts >= idolMarket.result.price){
                    await removeCashById(account.id, idolMarket.result.price);
                    await addCashById(idolMarket.result.owner_id, idolMarket.result.price)
                    await idolsRepository.changeOwner(idolMarket.result.idol_id, account.id);
                    await marketRepository.removeMarket(idolMarket.result.id);
                    return true;
                } 
            }
            return false;
        }
        throw new Error();
    } catch (err) {
        return null
    }
}
export async function sellMarket(userId: number, id: number, price: number) {
    try {
        
        const account = await getByUserId(userId);
        if(account) {
            const idolMarket = await marketRepository.getByMarketByIdolID(id);
            
            if(!idolMarket.result){
                await marketRepository.addToMarket(account.id, id, price);
                return true;
            }
            return false;
        }
        throw new Error();
    } catch (err) {
        return null
    }
}