sudo docker restart techtracker
cd ~/Documents/Web/Tech_Tracker_Web
git pull
sudo docker exec techtracker bash update/update_container.sh
