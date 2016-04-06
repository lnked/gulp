'use strict';

const fs            = require('fs');
const path          = require('path');

/**
 * Получаем дерево файлов в дирректории
 * @param dir
 * @param files_
 */
function getTree(dir, files_)
{
    files_ = files_ || [];
    let files = fs.readdirSync(dir), i = null, name;

    for (i in files)
    {
        name = dir + '/' + files[i];

        if (fs.statSync(name).isDirectory())
        {
            getTree(name, files_);
        } 
        else
        {
            files_.push(name);
        }
    }

    return files_;
};

/**
 * Получаем дерево папок в дирректории
 * @param dir
 * @param files_
 */
function getFolders(dir, files_)
{
    files_ = files_ || [];
    let files = fs.readdirSync(dir), i = null, name;

    for (i in files)
    {
        name = dir + '/' + files[i];

        if (fs.statSync(name).isDirectory())
        {
           files_.push({
                dir: name,
                cat: files[i]
           });
        }
    }

    return files_;
};

module.exports.getTree = getTree;
module.exports.getFolders = getFolders;