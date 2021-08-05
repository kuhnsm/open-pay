docker build . -t server_node
docker image prune -af
docker compose up