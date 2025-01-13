git pull
mv ~/Documents/Web/Tech_Tracker_Web/next.config.js ~/Documents/Web/Tech_Tracker_Web/scripts/next.config.default.js
cp ~/Documents/Web/Tech_Tracker_Web/scripts/next.config.build.js ~/Documents/Web/Tech_Tracker_Web/next.config.js
sudo docker compose -f docker/development/compose.yaml down
sudo docker compose -f docker/development/compose.yaml build
sudo docker compose -f docker/development/compose.yaml up -d
cp ~/Documents/Web/Tech_Tracker_Web/scripts/next.config.default.js ~/Documents/Web/Tech_Tracker_Web/next.config.js
