cd ..
cp -r base ./clients/$1
chmod 777 clients/$1
cd clients/$1
echo "{ \"PORT\" : \"$2\"}" >> base_config.json
cd ..
echo $3
var1 = clients
if [[ $3 == *"$var1"* ]]; then
    echo "Clients module - started clone"
    pwd
    git clone https://github.com/lucascardosods/erp-module-clients.git
fi

