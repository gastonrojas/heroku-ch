import pino from 'pino';

const logger = pino('pinoLogs/error.log')


import { MongoClient } from 'mongodb';

import mongoConectionStr from '../../config.js';


class MongodbContainer {
  constructor(uri, db, collection) {
    this.client = new MongoClient(uri)
    this.db = this.client.db(db)
    this.collection = this.db.collection(collection)
    this.options = {projection: { _id: 0, __v: 0}}
  };
  async getAll() {
    try {
      const all = this.collection.find({}, this.options).toArray();
      if(!all) throw new Error('error en base de datos')
      return await this.collection.find({}, this.options).toArray()
    } catch (error) {
      logger.error(error)
    }
  };
  async getUserbyUsername(username){
    try {
      const user = await this.collection.findOne({username}, this.options)
      if (!user) throw new Error('No se pudo acceder a la base de datos!')
      return user
    } catch (error) {
      logger.error(error)
      return null
    }
  }
  
  async getUserbyId(id){
    try {
      const user = await this.collection.findOne({id}, this.options)
      if (!user) throw new Error('NOT_FOUND: Datos incorrectos. Intente nuevamente.')
      return user
    } catch (error) {
      logger.error(error)
    }
  }
  async save(obj) {
    try{
      const allObjs = await this.getAll();
      if(!allObjs) throw new Error('No se pudo guardar en la base de datos!')
      const id = !allObjs.length ? 1 : parseInt(allObjs[allObjs.length - 1].id) + 1
      if (isNaN(id)) throw new Error('ID_ERR: No se pudo asignar id al documento. Por lo tanto su peticion no pudo ser guardada en la base de datos, por favor communiquese con soporte para solucionar el problema. support@mentirita.com')
      obj.id = id.toString()
      await this.collection.insertOne(obj);
    }catch(error){
      logger.error(error)
    }
  };
};

const users = new MongodbContainer(mongoConectionStr, 'ecommerce', 'users')

export const products = new MongodbContainer(mongoConectionStr, 'ecommerce', 'products')
export const messages = new MongodbContainer(mongoConectionStr, 'ecommerce', 'messages')

export default users;