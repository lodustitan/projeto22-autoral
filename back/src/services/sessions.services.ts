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

import { getByUserId } from ".";

config();

export async function doSessionToken(userId: number) {
    try {
        const account = await getByUserId(userId);
        if(account) {
            const secret = process.env.JWT_PASS;
            if(!secret) return;
            
            const session = await sessionsRepository.getSessionByUserId(userId);

            if(session) {
                await sessionsRepository.deleteSessionByUserId(userId);
                const newToken = jwt.sign({ userId }, secret, { expiresIn: "2 days" });
                await sessionsRepository.createSession(newToken, account.id);
                return newToken;
            } else {
                const newToken = jwt.sign({ userId }, secret, { expiresIn: "2 days" });
                await sessionsRepository.createSession(newToken, account.id);
                return newToken;
            }

        }
    } catch (err) {
        console.error(err);
    }
}