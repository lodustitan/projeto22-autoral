import prisma from "../database/database";

async function create(userAccountName: string, userPassword: string, userNickname: string) {
  try {

    const query = await prisma.users.create({
      data: {
        account_name: userAccountName,
        password: userPassword,
        nickname: userNickname
      }
    });
    return { status: true, result: query };

  } catch (err) {
    return { status: false, result: null };
  } finally { await prisma.$disconnect() }
}
async function deleteById(id: number) {
  try {

    const query = await prisma.users.delete({ where: { id } });
    return { status: true, result: query };

  } catch (err) {
    return { status: false, result: null };
  } finally { await prisma.$disconnect() }
}
async function getAll() {
  try {

    const query = await prisma.users.findMany({ select: { nickname: true } });
    return { status: true, result: query };

  } catch (err) {
    return { status: false, result: null };
  } finally { await prisma.$disconnect() }
}
async function getByAccountName(account_name: string) {
  try {

    const query = await prisma.users.findFirst({ where: { account_name } });
    return { status: true, result: query };

  } catch (err) {
    return { status: false, result: null };
  } finally { await prisma.$disconnect() }
}
async function getById(id: number) {
  try {

    const query = await prisma.users.findFirst({ where: { id } })
    return { status: true, result: query };

  } catch (err) {
    return { status: false, result: null };
  } finally { await prisma.$disconnect() }
}
async function getByNickname(name: string) {
  try {

    const query = await prisma.users.findFirst({ where: { nickname: name } });
    return { status: true, result: query };

  } catch (err) {
    return { status: false, result: null };
  } finally { await prisma.$disconnect() }
}
async function setCashById(id: number, value: number) {
  try {
    const query = await prisma.users.update({ data: { peanuts: value }, where: { id } });
    return { status: true, result: query };
  } catch (err) {
    return { status: false, result: null };
  } finally { await prisma.$disconnect() }
}
async function addQuizChallenge(userId: number) {
  const challengeTime = new Date().getTime() + (30 * 1000);
  try {
    const query = await prisma.quiz_challenge.create({
      data: {
        user_id: userId,
        points_gain: 20,
        end_time: challengeTime
      }
    });
    return { status: true, result: query };
  } catch (err) {
    return { status: false, result: null };
  } finally { await prisma.$disconnect() }
}
async function findQuizChallenge(userId: number) {
  try {
    const query = await prisma.quiz_challenge.findFirst({
      where: { user_id: userId }
    });
    return { status: true, result: query };
  } catch (err) {
    return { status: false, result: null };
  } finally { await prisma.$disconnect() }
}
async function deleteQuizChallenge(userId: number) {
  try {
    const query = await prisma.quiz_challenge.deleteMany({
      where: { user_id: userId }
    });
    return { status: true, result: query };
  } catch (err) {
    return { status: false, result: null };
  } finally { await prisma.$disconnect() }
}
async function addQuizPoints(userId: number, points: number){
  try {
    const query = await prisma.rank.upsert({
      where: { user_id: userId },
      update: { points: { increment: points } },
      create: { user_id: userId, points }
    });
    return { status: true, result: query };
  } catch (err) {
    return { status: false, result: null };
  } finally { await prisma.$disconnect() }
}
export const usersRepository = {
  create,
  deleteById,
  getAll,
  getByAccountName,
  getById,
  getByNickname,
  setCashById,
  addQuizChallenge,
  findQuizChallenge,
  deleteQuizChallenge,
  addQuizPoints
}