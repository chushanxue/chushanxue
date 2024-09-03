# 一次搞定
cd WorkSpace
cd chushanxue
git config --global https.proxy 127.0.0.1:7891
git config --global http.proxy 127.0.0.1:7891
git add . 
git commit -m "静态文件路径适配本地" --no-verify
git push origin HEAD
git config --global --unset http.proxy  
git config --global --unset https.proxy  


