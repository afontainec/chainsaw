const FileCreator = require('./fileCreator');
const path = require('path');
const config = require('../.chainfile');

const samplePath = path.join(__dirname, '../', 'example', 'router.js');
const apiSample = path.join(__dirname, '../', 'example', 'routerApi.js');


const createFile = async(table_name, values) => {
  const p1 = createRoutes(table_name, values);
  const p2 = createAPIRoutes(table_name, values);
  await Promise.all([p1, p2]);
};

function createRoutes(table_name, values) {
  const filePath = path.join(config.routes.directory, `${values.MODELFILENAME}.js`);
  const Route = new FileCreator(samplePath, filePath);
  return Route.create(values);
}

function createAPIRoutes(table_name, values) {
  const filePath = path.join(config.routes.directory, `${values.MODELFILENAME}API.js`);
  const Route = new FileCreator(apiSample, filePath);
  return Route.create(values);
}


module.exports = {
  createFile,
};