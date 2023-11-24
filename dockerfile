FROM node:18-alpine3.16

ENV DIR /app
# ENV DATABASE_URL="postgres://toolit:toolitdev@localhost:5432/toolit-dev?schema=public"

WORKDIR ${DIR}

COPY package*.json ${DIR}

RUN npm install
RUN npm i typescript
COPY tsconfig*.json ${DIR}
COPY prisma ${DIR}
COPY src ${DIR}/src

RUN npm run build
RUN npx prisma generate

# WORKDIR /app
# COPY . .

# RUN npm install
# RUN npm i typescript
# RUN npm run build
# RUN npx prisma generate

EXPOSE 3000

CMD ["node" , "dist/index.js"]