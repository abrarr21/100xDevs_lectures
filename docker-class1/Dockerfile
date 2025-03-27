FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package*.json .

RUN pnpm install

COPY . . 

RUN pnpm exec prisma generate
RUN pnpm run build

EXPOSE 6969

CMD ["npm", "run", "start:docker"]
