echo "Shell Calistiriliyor..."

echo "port yok ediliyor..."

kill $(lsof -t -i:3000)

git pull https://github.com/burakack/Drop-Note-Api.git master

docker compose build

docker compose up && echo "Basarili"