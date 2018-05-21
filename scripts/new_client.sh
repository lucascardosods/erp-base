cd ..
cp -r base ./clients/$1
chmod 777 clients/$1
cd clients/$1
echo "{\"CLIENT_ID\" : \"$4\", \"PORT\" : \"$2\", \"NAME\" : \"$1\"}" >> base_config.json
cd ..
echo $3
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