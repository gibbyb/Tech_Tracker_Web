sudo docker restart techtracker
cd ~/Documents/Web/Tech_Tracker_Web
git pull
sudo docker exec techtracker /home/node/.local/share/pnpm/pnpm build 
sudo docker exec techtracker /home/node/.local/share/pnpm/pnpm start &
