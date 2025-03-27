## Steps to create docker image

1. Create a network
   `docker network create project-network`

2. Start a Postgres db locally
   `docker run --network project-network --name mypostgres_db -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`

3. Build the image of the project
   `docker build --network=host -t project-image .`

4. Start the image's container
   `docker urn -e DATABASE_URL=postgresql://postgres:mysecretpassword@mypostgres_db/myfirstdb --network project-network -p 6969:6969 project-image`

---

CLASS-2
Now, while creating docker-compose.yaml file this project I add this in package.json
script:
`start:docker": "pnpm exec prisma migrate dev && node dist/server.js`

And removed from Dockerfile cuz our Dockerfile was talking to the database while creating the image:

`ENV DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/myfirstdb"`

`RUN pnpm exec prisma migrate dev`
