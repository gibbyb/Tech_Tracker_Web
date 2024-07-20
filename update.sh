sudo docker restart tt_web
cd ~/Documents/Web/Tech_Tracker_Web
git pull
sudo docker exec tt_web /home/node/.local/share/pnpm/pnpm build 
sudo docker exec tt_web /home/node/.local/share/pnpm/pnpm start &
