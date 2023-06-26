import { Request, Response } from "express";
import { buyMarket, completeQuiz, createAccount, doGacha, doSessionToken, doWork, getAllMarket, getByUserId, getDataGacha, getAllDataIdols, getInventory, newQuiz, sellMarket } from "../services";

import { newUser } from "../protocols/protocols";
import { StatusCodes } from "http-status-codes";



function random(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

class Auth {
  async auth_register(req: Request, res: Response) {
    const { data } = res.locals;

    const newUserObj = data as newUser;
    const query = await createAccount(newUserObj.account_name, newUserObj.password, newUserObj.nickname);
    if (!query) throw Error();

    return res.status(StatusCodes.CREATED).send(query);
  }
  async auth_login(req: Request, res: Response) {
    const { data } = res.locals;
    const query = await doSessionToken(data.result.id)

    return res.status(StatusCodes.OK).send({
      token: query,
      userInfos: {
        account_name: data.result.account_name,
        nickname: data.result.nickname,
        diamonds: data.result.diamonds,
        peanuts: data.result.peanuts,
      }
    });
  }
  async auth_session(req: Request, res: Response) {
    const { user } = res.locals;
    const query = await getByUserId(user.userId);
    if (query) {
      const queryWhioutPassword = {
        id: query.id,
        account_name: query.account_name,
        diamonds: query.diamonds,
        peanuts: query.peanuts,
        nickname: query.nickname,
      }
      return res.status(StatusCodes.OK).send(queryWhioutPassword);
    }
  }
}
class Users {
  async user_getUserIdols(req: Request, res: Response) {
    const { user } = res.locals;

    try {
      const query = await getInventory(user.userId);
      if (query) {
        return res.status(StatusCodes.OK).send(query);
      }
      throw new Error();
    } catch (err) {
      console.error(err);
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
  async newQuiz(req: Request, res: Response) {
    const { user } = res.locals;

    try {
      const query = await newQuiz(user.userId);
      res.status(StatusCodes.OK).send(query);
    } catch (err) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
  async completeQuiz(req: Request, res: Response) {
    const { user } = res.locals;
    const { answer } = req.body;

    try {
      const query = await completeQuiz(user.userId, answer);
      res.status(StatusCodes.OK).send(query);
    } catch (err) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
}
class Gacha {
  async getGachaList(req: Request, res: Response) {
    try {
      const dataGacha = await getDataGacha();
      return res.status(StatusCodes.OK).send(dataGacha);
    } catch (err) {
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
  async doGacha(req: Request, res: Response) {
    const { user } = res.locals;
    const { gachaId } = req.body;

    try {
      const query = await doGacha(user.userId, gachaId);

      if (!query) {
        return res.sendStatus(StatusCodes.NOT_FOUND);
      }

      return res.status(StatusCodes.OK).send(query);
    } catch (err) {
      console.error(err);
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
}
class Tools {
  async doWork(req: Request, res: Response) {
    const { user } = res.locals;

    try {
      const query = await doWork(user.userId);

      if (!query) {
        return res.sendStatus(StatusCodes.NOT_FOUND);
      }

      return res.status(StatusCodes.OK).send(query);
    } catch (err) {
      console.error(err);
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
  async getAllIdols(req: Request, res: Response) {
    try {
      const query = await getAllDataIdols();
      const data = {listIdols: query}
      return res.status(StatusCodes.OK).send(data);
    } catch (err) {
      console.error(err);
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
}
class Market {
  async getMarket(req: Request, res: Response) {
    try {
      const { user } = res.locals;
      const { body } = req;

      const page: number = Number(body.page || 1);
      const idol_name: string = String(body.idol_name || "");

      const result = await getAllMarket(page);

      return res.status(StatusCodes.OK).send(result);

    } catch (err) {
      console.error(err);
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
  async buyIdolMarket(req: Request, res: Response) {

    const { user } = res.locals;
    const { marketId } = req.body;
    const idNumber: number = Number(marketId);

    try {
      if (isNaN(idNumber)) throw new Error("ID not is a Number");

      const result = await buyMarket(user.userId, marketId);

      if (result === null) throw new Error("Error on buy idol");
      if (result === false) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not enough peanuts");
      }
      return res.status(StatusCodes.OK).send(result);

    } catch (err) {
      console.error(err);
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
  async addIdolMarket(req: Request, res: Response) {

    const { user } = res.locals;
    const { idolId, price } = req.body;
    const idNumber: number = Number(idolId);

    try {
      if (isNaN(idNumber)) throw new Error("ID not is a Number");
      const result = await sellMarket(user.userId, idNumber, price);

      if (result === null) throw new Error("Error on sell idol");
      if (result === false) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).send("This card is already on the market");
      }
      return res.status(StatusCodes.OK).send(result);

    } catch (err) {
      console.error(err);
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }
}

const controller = {
  auth: new Auth(),
  users: new Users(),
  tools: new Tools(),
  market: new Market(),
  gacha: new Gacha(),
};

export default controller;