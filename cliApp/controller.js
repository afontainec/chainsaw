const path = require('path');
const fs = require('fs');
const configPath = require('./configPath');

const {
  promisify,
} = require('util');
const config = require('../.chainfile');

const samplePath = path.join(__dirname, '../', 'example', 'controller.js');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const createFile = async (table_name) => {
  table_name = table_name.toLowerCase();
  const string = await readFile(samplePath, 'utf-8');
  const values = getValues(table_name);
  const file = compileString(string, values);
  const filePath = path.join(config.controllers.directory, `${table_name}Controller.js`);
  await writeFile(filePath, file);
  return;
};

function getValues(table_name) {
  return {
    MODELNAME: getModelName(table_name),
    MODELPATH: path.relative(config.controllers.directory, path.join(config.models.directory, `${table_name}`)),
    TABLEPATH: path.relative(config.controllers.directory, configPath.TABLEPATH),
    HTTPRESPONSEPATH: path.relative(config.controllers.directory, configPath.HTTPRESPONSEPATH),

  };
}

function getModelName(table_name) {
  const parts = table_name.split('_');
  let name = '';
  for (let i = 0; i < parts.length; i++) {
    const elem = parts[i];
    name += elem.charAt(0).toUpperCase() + elem.substr(1);
  }
  return name;
}

const compileString = function (string, values) {
  const keys = Object.keys(values);
  for (let i = 0; i < keys.length; i++) {
    const inTextKey = '\\$' + keys[i] + '\\$'; // eslint-disable-line
    const search = new RegExp(inTextKey, 'g');
    string = string.replace(search, values[keys[i]]);
  }
  return string;
};


module.exports = {
  createFile,
};
