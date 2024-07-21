wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
/home/node/.local/share/pnpm/pnpm build 
/home/node/.local/share/pnpm/pnpm start &
