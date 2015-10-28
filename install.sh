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

ln -s ${ROOT}/clean/node_modules/ ${ROOT}/$folder_name/

mkdir assets dist assets/template assets/scripts assets/images assets/styles assets/fonts

#touch gulpfile.js

#mkdir assets/template/includes assets/template/pages assets/template/components
#mkdir assets/sass/base assets/sass/components assets/sass/layout assets/sass/pages assets/sass/utils assets/sass/vendors assets/sass/includes

#touch assets/sass/base/_reset.scss assets/sass/base/_media.scss assets/sass/base/_typography.scss assets/sass/base/_retina.scss assets/sass/base/_fonts.scss
#touch assets/sass/components/_buttons.scss assets/sass/components/_carousel.scss assets/sass/components/_popup.scss
#touch assets/sass/layout/_navigation.scss assets/sass/layout/_grid.scss assets/sass/layout/_sidebar.scss assets/sass/layout/_header.scss assets/sass/layout/_footer.scss assets/sass/layout/_forms.scss
#touch assets/sass/utils/_variables.scss assets/sass/utils/_functions.scss assets/sass/utils/_mixins.scss assets/sass/utils/_helpers.scss

# Копируем файлы
cp -r ${ROOT}/clean/.gitignore ${ROOT}/$folder_name/.gitignore
cp -r ${ROOT}/clean/gulpfile.js ${ROOT}/$folder_name/gulpfile.js
cp -r ${ROOT}/clean/package.json ${ROOT}/$folder_name/package.json

# cp -r ${ROOT}/clean/assets/* ${ROOT}/$folder_name/assets/

cp -r ${ROOT}/clean/assets/favicon.ico ${ROOT}/$folder_name/assets/favicon.ico
cp -r ${ROOT}/clean/assets/robots.txt ${ROOT}/$folder_name/assets/robots.txt
cp -r ${ROOT}/clean/assets/humans.txt ${ROOT}/$folder_name/assets/humans.txt

cp -r ${ROOT}/clean/assets/template/* ${ROOT}/$folder_name/assets/template/
cp -r ${ROOT}/clean/assets/scripts/* ${ROOT}/$folder_name/assets/scripts/
cp -r ${ROOT}/clean/assets/styles/* ${ROOT}/$folder_name/assets/styles/

echo -e "Проект ${GREEN}$folder_name${NC} успешно создан"

cd ${ROOT}/$folder_name/

gulp build
gulp

exit 0