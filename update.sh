sudo docker restart techtracker
cd ~/Documents/Web/Tech_Tracker_Web
git pull
#sudo docker exec techtracker wget -qO- https://get.pnpm.io/install.sh\
  #| ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
sudo docker exec techtracker /home/node/.local/share/pnpm/pnpm build 
sudo docker exec techtracker /home/node/.local/share/pnpm/pnpm start &
