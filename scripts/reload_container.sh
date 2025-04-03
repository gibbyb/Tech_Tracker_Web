git pull
mv ./next.config.js ./scripts/next.config.default.js
cp ./scripts/next.config.build.js ./next.config.js
sudo docker compose -f docker/development/compose.yaml down
sudo docker compose -f docker/development/compose.yaml build
sudo docker compose -f docker/development/compose.yaml up -d
cp ./scripts/next.config.default.js ./next.config.js
