
const path = require('path');
const Printer = require('./printer');
const Model = require('./model');
const Controller = require('./controller');
const Views = require('./views');
const Router = require('./routes');
const config = require('../.chainfile');
const configPath = require('./configPath');


const newMVC = (table_name) => {
  if (typeof table_name !== 'string') {
    return Printer.error('Not valid model name');
  }
  const values = getValues(table_name);
  Model.createFile(table_name, values);
  Controller.createFile(table_name, values);
  Router.createFile(table_name, values);
  Views.createFile(table_name, values);
};

function getValues(table_name) {
  table_name = table_name.toLowerCase();
  const MODELNAME = Model.getName(table_name);
  const CONTROLLERNAME = Controller.getName(MODELNAME);
  const MODELFILENAME = Model.getFileName(MODELNAME);
  return {
    MODELFILENAME,
    MODELNAME,
    CONTROLLERNAME,
    CTRL2MODELPATH: path.relative(config.controllers.directory, path.join(config.models.directory, MODELFILENAME)),
    ROUTE2CTRL: path.relative(config.routes.directory, path.join(config.controllers.directory, CONTROLLERNAME)),
    CTRL2VIEWPATH: path.relative(config.controllers.directory, path.join(config.views.directory, MODELFILENAME)),
    TABLEPATH: path.relative(config.controllers.directory, configPath.TABLEPATH),
    HTTPRESPONSEPATH: path.relative(config.controllers.directory, configPath.HTTPRESPONSEPATH),
    TABLE_NAME: table_name,
    EXTENDPATH: path.relative(config.models.directory, config.models.superclass),
  };
}

module.exports = { new: newMVC };