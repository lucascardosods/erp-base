cd ..
cp -r base ./clients/$1
chmod 777 clients/$1
cp erp-manager/public/upload/temp/$5 clients/$1/public/images
mv clients/$1/public/images/$5 clients/$1/public/images/logo_mini.png
cp erp-manager/public/upload/temp/$6 clients/$1/public/images
mv clients/$1/public/images/$6 clients/$1/public/images/logo.png
echo "{\"CLIENT_ID\" : \"$4\", \"PORT\" : \"$2\", \"NAME\" : \"$1\"}" >> clients/$1/base_config.json
cd clients
var1 = clients
var2 = financial
if [[ $3 == *"$var1"* ]]; then
    echo "Clients module - started clone"
    git clone https://github.com/lucascardosods/erp-module-clients.git
fi
if [[ $3 == *"$var2"* ]]; then
    echo "Financial module - started clone"
    git clone https://github.com/lucascardosods/erp-module-financial
fi