FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package*.json .

RUN pnpm install

COPY . . 

ENV DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/myfirstdb"

RUN pnpm exec prisma migrate dev
RUN pnpm exec prisma generate
RUN pnpm run build

EXPOSE 6969

CMD ["node", "dist/server.js"]
