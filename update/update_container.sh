wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
source ~/.bashrc
pnpm build 
pnpm start
