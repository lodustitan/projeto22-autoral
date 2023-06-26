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
import { getDataIdolById } from "./idol.services";

config();

export async function createAccount(userAccountName: string, userPassword: string, userNickname: string) {
  try {
    const hashPassword = await bcrypt.hash(userPassword, 10);
    const verify_exist = await usersRepository.create(userAccountName, hashPassword, userNickname);

    return verify_exist;
  } catch (err) {
    return null;
  }
}

export async function doGacha(userId: number, gachaId: number) {
  try {
    const account = await getByUserId(userId);
    if (account) {
      const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

      for (let el of data.gachas) {
        if (el.id === gachaId) {
          for (let loot of el.loot) {
            if (randomNumber(1, 10000) <= loot.chance) {

              const random_idol = loot.cards_id[randomNumber(0, loot.cards_id.length)]
              const query = await idolsRepository.create(account.id, random_idol.idol_id, random_idol.era_id);
              await usersRepository.setCashById(account.id, account.peanuts - el.price);


              if (query.result) {
                const idolInfos = getDataIdolById(random_idol.idol_id, random_idol.era_id);
                return idolInfos;
              }
            }
          }
        }

      }

    }
    throw new Error();
  } catch (err) {
    return null;
  }
}
export async function doWork(userId: number) {
  try {
    const account = await getByUserId(userId);
    if (account) {
      await addCashById(account.id, 100);
      return true;
    }
    throw new Error();
  } catch (err) {
    return null;
  }
}
export async function newQuiz(userId: number) {
  try {
    const account = await getByUserId(userId);
    if (account) {
      const quizChallenge = await usersRepository.findQuizChallenge(account.id);
      if(quizChallenge.result){
        await usersRepository.deleteQuizChallenge(userId);
      }
      const quiz = await usersRepository.addQuizChallenge(userId);
      return quiz;
    }
  } catch (err) {
    return null;
  }
}

export async function completeQuiz(userId: number, answer: string) {
  try {
    const account = await getByUserId(userId);
    if (account) {
      const quizChallenge = await usersRepository.findQuizChallenge(userId);
      if(quizChallenge.result){
        if(!quizChallenge.result.points_gain) return;

        if(quizChallenge.result.correct_answer === answer){
          await usersRepository.addQuizPoints(userId, quizChallenge.result.points_gain);
        } else {
          await usersRepository.addQuizPoints(userId, -quizChallenge.result.points_gain);
        }
        
        await usersRepository.deleteQuizChallenge(userId);
      }
      return true;
    }
  } catch (err) {
    return null;
  }
} 

export async function getByUserId(userId: number) {
  try {
    const verify_exist = await usersRepository.getById(userId);
    if (verify_exist.status) {
      return verify_exist.result;
    } else {
      throw new Error();
    }
  } catch (err) {
    return null;
  }
}
export async function addCashById(userId: number, value: number) {
  try {
    if (value < 0) return null;

    const account = await getByUserId(userId);
    if (account) {
      const query = await usersRepository.setCashById(account.id, account.peanuts + value)
      if (query.result) {
        return query.result
      }
    }
    else {
      throw new Error();
    }
  } catch (err) {
    return null;
  }
}
export async function removeCashById(userId: number, value: number) {
  try {
    if (value < 0) return null;

    const account = await getByUserId(userId);
    if (account) {
      const query = await usersRepository.setCashById(account.id, account.peanuts - value)
      if (query.result) {
        return query.result
      }
    }
    else {
      throw new Error();
    }
  } catch (err) {
    return null;
  }
}