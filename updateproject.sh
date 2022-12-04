#!C:\Users\burak\OneDrive\Masaüstü\api-drop-note

echo "Shell Calistiriliyor..."

echo "port yok ediliyor..."

kill $(lsof -t -i:3000)

git pull https://github.com/burakack/Drop-Note-Api.git master

docker image rm drop-note-api -f

docker compose up

echo "Basarili"