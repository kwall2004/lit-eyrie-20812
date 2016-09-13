/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {


  attributes: {

    Name: {
      type: 'string',
      required: true,
      maxLength:100,
    },
    Role: {
      model: 'UserRoles',
      required: true
    },


    ParentOrganization: {
      type: 'json',
      required: false
    },
    Email: {
      type: 'string',
      required: false,
      minLength: 6,
      maxLength:50
    },
    PhoneNumber: {
      type: 'string',
      required: false,
      minLength: 6,
      maxLength:12
    },
    Login: {
      type: 'string',
      required: true,
      unique:true,
      minLength: 6,
      maxLength:25
    },
    Password: {
      type: 'string',
      required: false,
      defaultsTo : '904e28a39a4c1d5dd4cddee5603ab24e',
      minLength: 6,
      maxLength:25
    },
    ResetPassword :{
      type: 'boolean',

      defaultsTo : true
    },

    ModifiedBy:{
      type: 'string',
      required: false,
      size:50
    },
    Active: {
      type: 'boolean',
      required: false
    },
    LastLogin: {
      type: 'dateTime',
      required: false
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.Password;
      delete obj.ResetPassword;


      return obj;
    },


  }
};

