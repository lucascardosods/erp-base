cd ..
cp -r base clients/$1
echo "{ \"PORT\" : \"$2\"}" >> base_config.json
