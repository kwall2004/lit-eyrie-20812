/**
 * Vehicles.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {



    _id: {
      type: 'ObjectId',
      require: true
    },
    VIN: {
      type: 'string',
      required: true,
    },
    Make: {
      type: 'string',
      required: true,
    },
    Model: {
      type: 'string',
      required: true,
    },
    ModelYear: {
      type: 'string',
      required: true,
    },
    Alias: {
      type: 'string',
      required: true,
    },
    ODOReading: {
      type: 'string',
      required: true,
    },
    cutomerId: {
      type: 'string',
      required: true,
    },
    Created:{
      type: 'date',
      required: false
    },
    CreatedDate: {
      Type: 'DateTime'
    },
    UpdatedDate: {
      Type: 'DateTime'
    },
    Active :{
      type: 'boolean',
      required: false
    }


  }
};

