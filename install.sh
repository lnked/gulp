#!/bin/bash

# Название папки нового проекта
folder_name=$1

# Версия сборки которую нужно будет установить
project_type=$2 #

ROOT='/Applications/MAMP/htdocs/markup.dev'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

cd $ROOT

echo -e " "

# Создаем папку проекта если ее нет
#
if [ -d "$folder_name" ] ; then
	echo -e "${RED}Папка $folder_name существует${NC}\n"
else
	mkdir $folder_name
	echo -e "${GREEN}Создана папка $folder_name${NC} \n"
fi

# Переходим в папку
#
cd ./$folder_name

ln -s ${ROOT}/clean/gulpfile.js ${ROOT}/$folder_name/
ln -s ${ROOT}/clean/package.json ${ROOT}/$folder_name/
ln -s ${ROOT}/clean/gulp/ ${ROOT}/$folder_name/
ln -s ${ROOT}/clean/node_modules/ ${ROOT}/$folder_name/

mkdir frontend public_html frontend/template frontend/styles frontend/scripts
mkdir frontend/assets frontend/assets/images frontend/assets/sprite frontend/assets/favicon frontend/assets/fonts frontend/assets/json
mkdir gulp

# Копируем файлы
cp -r ${ROOT}/clean/.gitignore ${ROOT}/$folder_name/.gitignore

# cp -r ${ROOT}/clean/gulpfile.js ${ROOT}/$folder_name/gulpfile.js
# cp -r ${ROOT}/clean/package.json ${ROOT}/$folder_name/package.json
# cp -r ${ROOT}/clean/gulp/* ${ROOT}/$folder_name/gulp/

cp -R ${ROOT}/clean/frontend/* ${ROOT}/$folder_name/frontend/

# cp -r ${ROOT}/clean/frontend/assets/json/* ${ROOT}/$folder_name/frontend/assets/json/
# cp -r ${ROOT}/clean/frontend/assets/favicon/* ${ROOT}/$folder_name/frontend/assets/favicon/
# cp -r ${ROOT}/clean/frontend/assets/fonts/* ${ROOT}/$folder_name/frontend/assets/fonts/

# cp -r ${ROOT}/clean/frontend/assets/robots.txt ${ROOT}/$folder_name/frontend/assets/robots.txt
# cp -r ${ROOT}/clean/frontend/assets/humans.txt ${ROOT}/$folder_name/frontend/assets/humans.txt

# cp -r ${ROOT}/clean/frontend/template/* ${ROOT}/$folder_name/frontend/template/
# cp -r ${ROOT}/clean/frontend/scripts/* ${ROOT}/$folder_name/frontend/scripts/
# cp -r ${ROOT}/clean/frontend/styles/* ${ROOT}/$folder_name/frontend/styles/

echo -e "Проект ${GREEN}$folder_name${NC} успешно создан"

cd ${ROOT}/$folder_name/

gulp build
gulp

exit 0