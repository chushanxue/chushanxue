cd WorkSpace
cd chushanxue
git config --global https.proxy 127.0.0.1:7891
git config --global http.proxy 127.0.0.1:7891
pnpm build:pre
git add . 
git commit -m "新增404页面" --no-verify
# 只差git cz

