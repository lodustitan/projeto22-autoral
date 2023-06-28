FROM node:16

WORKDIR usr/src/app/

COPY . .

RUN npm install -g prisma

RUN npm install

EXPOSE 4000

RUN npm run dev:build

CMD npx prisma migrate dev && npx prisma generate && npm start