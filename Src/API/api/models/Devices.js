/**
 * Devices.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {




  attributes: {
    SerialNo: {
      type: "string",
      required: true,
      unique: true,
    },
    IMEI: {
      type: "string",

    },

    FWVersion: {
      type: "string",
      required: true
    },
    ConfigVersion: {
      type: "string",
      required: true
    },
    ModifiedBy:{
      type: 'string',
      required: false,
      size:50
    },
    CreatedDate: {
      Type: 'DateTime'
    },
    UpdatedDate: {
      Type: 'DateTime'
    },
    Active: {
      type: 'boolean',
      required: false
    },

  },

}


