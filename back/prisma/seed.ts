import prisma from "../src/database/database"

async function main ()  {
    let idols = await prisma.idols.findFirst();
    if(!idols){
        
    }
    
    let market = await prisma.market.findFirst();
    if(!market){
        
    }

    let users = await prisma.users.findFirst();
    if(!users){
        await prisma.users.createMany({
            data: [
                {
                    id: 1, account_name: "lodus", password: "$2b$10$yhqMnmeW7nLWXFQgfTMUo.RZ/jAeDzCq77bX/6LHfoENC5v7DfRiq",
                    diamonds: 0, peanuts: 1700, nickname: "BlackLotus"
                },
                {
                    id: 2, account_name: "lodusmaker", password: "$2b$10$yhqMnmeW7nLWXFQgfTMUo.RZ/jAeDzCq77bX/6LHfoENC5v7DfRiq", 
                    diamonds: 800, peanuts: 49700, nickname: "titanico"
                }
            ]
        })
    }

    return console.log({ idols, market, users });
}

main()
    .catch( err => console.error(err) )
    .finally( async () =>  await prisma.$disconnect() )