sudo docker restart techtracker
cd ~/Documents/Web/Tech_Tracker_Web
git pull
sudo docker exec techtracker /home/node/app/update/update_container.sh
