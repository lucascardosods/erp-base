echo "script 2 started:"
cd ..
cd clients
echo "started copy"
cp -a erp-module-clients/. $1/
rm -r erp-module-clients
cd $1
npm update
cd routes
rm .DS_Store
cd ..
node app.js
echo "finished."