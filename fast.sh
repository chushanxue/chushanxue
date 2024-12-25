# 一次搞定
cd WorkSpace
cd chushanxue
git config --global https.proxy 127.0.0.1:7891
git config --global http.proxy 127.0.0.1:7891
pnpm build:pre
git add . 
git commit -m "新增log函数" --no-verify
git push origin HEAD
git config --global --unset http.proxy  
git config --global --unset https.proxy  


