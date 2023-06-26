import prisma from "../database/database";

async function changeOwner (idol_id: number, new_owner: number) {
    try {

        const query = await prisma.idols.update({where: {id: idol_id} , data: {user_id: new_owner}}); 
        return {status: true, result: query};    
    
    } catch (err) { return {status: false, result: null};
    } finally { await prisma.$disconnect() }
}
async function create (user_id: number, card_id: number, era_id: number) {
    try {

        const query = await prisma.idols.create({data: {user_id, card_id, era_id}}); 
        return {status: true, result: query};    
    
    } catch (err) { return {status: false, result: null};
    } finally { await prisma.$disconnect() }
}
async function deleteById (id: number) {
    try {

        const query = await prisma.idols.delete({where: {id}}); 
        return {status: true, result: query};    
    
    } catch (err) {return {status: false, result: null};
    } finally { await prisma.$disconnect() }
}
async function getAllIdols (user_id: number) {
    try {
        const query = await prisma.idols.findMany({where: {user_id: user_id}, include: { market: true}});
        return {status: true, result: query};

    } catch (err) {return {status: false, result: null};
    } finally { await prisma.$disconnect() }
}
async function getIdol (id: number) {
    try {
        const query = await prisma.idols.findFirst({where: { id }})
        return {status: true , result: query};
    } catch (err) { return {status: false, result: null} 
    } finally { await prisma.$disconnect() }
}

export const idolsRepository = {
    changeOwner,
    create,
    deleteById,
    getAllIdols,
    getIdol,
} 