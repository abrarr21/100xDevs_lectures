docker-compose up -d
echo 'Waiting for database to be ready....'
./scripts/wait-for-it.sh "postgresql://postgres:mysecretpassword@localhost:5432/postgres" --
echo 'Database is ready!!!!!!'
pnpm exec prisma migrate dev --name init
pnpm run test
docker-compose down
