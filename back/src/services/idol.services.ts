import {
  idolsRepository,
} from "../repositories";

import { getByUserId } from ".";

import data from "../assets/idols.json";
import { config } from "dotenv";

config();

export async function getInventory(userId: number) {
  try {
    const account = await getByUserId(userId);
    if (account) {

      const query = await idolsRepository.getAllIdols(account.id);
      const inventory = [];

      if (query.result) {
        for (let q of query.result) {
          const cardInfos = await getDataIdolById(q.card_id, q.era_id);
          const data = {
            id: q.id,
            user_id: q.user_id,
            market: q.market,
            cardInfos
          };

          inventory.push(data);
        }
      }

      return inventory;
    }
    else throw new Error();
  } catch (err) {
    return null;
  }
}

export async function getDataIdolById(id: number, era: number) {
  const dataInfo = {
    idolId: 0,
    idolName: "No Name",
    groupName: "No Name",
    eraName: "No Name",
    rarity: {
      name: "",
      icon: ""
    },
    idolImageUrl: "",
    eraImageUrl: "",
  };

  for (let i of data.idols) {
    if (i.id === id) {

      for (let v of i.versions) {
        if (v.era_id === era) {

          const groupInfos = data.groups.find(el => el.id === i.group_id);
          if (!groupInfos) return;

          const eraInfos = groupInfos.eras.find(gl => gl.id === v.era_id);
          if (!eraInfos) return;

          const raritiesInfos = data.categories.rarities.find(rl => rl.id === eraInfos.rarity_id);
          if (!raritiesInfos) return;


          dataInfo.idolId = i.id;
          dataInfo.idolName = i.idol;
          dataInfo.groupName = groupInfos.name;
          dataInfo.eraName = eraInfos.name;
          dataInfo.rarity.name = raritiesInfos.rarity;
          dataInfo.rarity.icon = raritiesInfos.icon;
          dataInfo.idolImageUrl = v.image_url;
          dataInfo.eraImageUrl = eraInfos.image_era;
          return dataInfo;
        }
      }
    }
  }

}
export async function getDataIdolByIdolName(name: string) {
  const dataIdols = [];
  let filtered;

  if (name) {
    filtered = data.idols.filter(el => (el.idol.toLowerCase()).includes(name.toLowerCase()));
  } else {
    filtered = data.idols;
  }


  for (let i of filtered) {
    const dataInfo = {
      idolId: 0,
      idolName: "No Name",
      groupName: "No Name",
      eraName: "No Name",
      rarity: {
        name: "",
        icon: ""
      },
      idolImageUrl: "",
      eraImageUrl: "",
    };


    if ((i.idol.toLowerCase()).includes(name.toLowerCase())) {
      const groupInfos = data.groups.find(el => el.id === i.id);
      const raritiesInfos = data.categories.rarities.find(el => el.id === i.id);

      i.versions.forEach(el => {
        const eraInfos = groupInfos?.eras.find(gl => gl.id === el.era_id);

        if (!groupInfos) return;
        if (!eraInfos) return;
        if (!raritiesInfos) return;

        dataInfo.idolId = i.id;
        dataInfo.idolName = i.idol;
        dataInfo.groupName = groupInfos.name;
        dataInfo.eraName = eraInfos.name;
        dataInfo.rarity.name = raritiesInfos.rarity;
        dataInfo.rarity.icon = raritiesInfos.icon;
        dataInfo.idolImageUrl = el.image_url;
        dataInfo.eraImageUrl = eraInfos.image_era;

        dataIdols.push(dataInfo);
      }
      )
    }
  }
}
export async function getAllDataIdols() {
  const arrayData = [];

  for (let i of data.idols) {
    for (let v of i.versions) {
      const dataInfo = {
        idolId: 0,
        idolName: "No Name",
        groupName: "No Name",
        eraName: "No Name",
        rarity: {
          name: "",
          icon: ""
        },
        idolImageUrl: "",
        eraImageUrl: "",
      };
      const groupInfos = data.groups.find(el => el.id === i.group_id);
      if (!groupInfos) continue;

      const eraInfos = groupInfos.eras.find(gl => gl.id === v.era_id);
      if (!eraInfos) continue;

      const raritiesInfos = data.categories.rarities.find(rl => rl.id === eraInfos.rarity_id);
      if (!raritiesInfos) continue;

      dataInfo.idolId = i.id;
      dataInfo.idolName = i.idol;
      dataInfo.groupName = groupInfos.name;
      dataInfo.eraName = eraInfos.name;
      dataInfo.rarity.name = raritiesInfos.rarity;
      dataInfo.rarity.icon = raritiesInfos.icon;
      dataInfo.idolImageUrl = v.image_url;
      dataInfo.eraImageUrl = eraInfos.image_era;
      arrayData.push(dataInfo);
    }
  }
  return arrayData;
}