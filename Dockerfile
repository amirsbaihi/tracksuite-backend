
# stage 1 building the code

FROM node:18-alpine as builder

WORKDIR /usr/app

COPY . .

RUN npm install --frozen-lockfile --prod --force
 




RUN npx prisma generate
RUN npm run build




# stage 2

FROM node:18-alpine

WORKDIR /usr/app  

COPY --from=builder /usr/app/dist ./dist

COPY --from=builder /usr/app/node_modules ./node_modules/

COPY --from=builder /usr/app/package*.json ./




EXPOSE 4000


CMD node dist/main.js
