FROM node:16

WORKDIR usr/src/app/

COPY . .

RUN npm install -g prisma

RUN npm install

EXPOSE 4000

CMD npx prisma migrate dev && npx prisma generate && npx ts-node ./src/server.ts