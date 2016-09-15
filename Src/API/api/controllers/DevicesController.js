/**
 * DevicesController
 *
 * @description :: Server-side logic for managing Devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var lang = require("lodash/lang");
module.exports = {

  find : function(req,res)
  {
    var options ={};
    if(req.query)
    {
      var where = req.param('where');

      if (lang.isString(where)) {
        where = JSON.parse(where);
      }
      options = {
        limit: req.param('limit') || undefined,
        skip: req.param('skip')  || undefined,
        sort: req.param('sort') || undefined,
        where:  where || undefined
      };
    }

    Devices.find(options).exec(function(err,Devices){

      if(Devices)
      {


        return res.visionResponseJSON(Devices,"Found Devices","success");
      }
      else
      {
        return res.visionResponseJSON(null,"Sorry couldn't find any Devices","error");
      }
    })
  },

  findOne: function(req,res)
  {
    var id = req.param("id");
    Devices.findOne({id:id}).exec(function(err,Devices){

      if(Devices)
      {
        return res.visionResponseJSON(Devices,"Found Device","success");
      }
      else
      {
        return res.visionResponseJSON(null,"Sorry couldn't find any Device","error");
      }
    })
  },
  create : function(req,res)
  {
    var Device = req.body;
    if(!Device)
    {
      res.badRequest("Device is missing ");
    }




      Devices.create(Device).exec(function(err,Device){

        if(err)
        {
          sails.log.error("failed to create a Device "+err);
          return res.serverError(err);
        }

        if(Device) {


          Devices.findOne({id:Device.id}).exec(function(err,Device) {
            if (err) {
              sails.log.error("failed to create a Device " + err);
              return res.serverError(err);
            }

            sails.log.info("Device has been created  " + Device);
            return res.visionResponseJSON(Device, "Device Added!", "success", "");
          });
        }
        else
        {
          res.serverError("Failed to create Device");
        }
      })
  },


  update : function(req,res)
  {
    var id = req.param("id");

    if(!id)
    {
      return res.badRequest("Please provide the Device id ");
    }
    var Device = req.body;
    //Device.ModifiedBy = req.userProfile.userID;

    Devices.update({id:id},{SerialNo: Device.SerialNo,IMEI:Device.IMEI,CreatedDate:Device.CreatedDate,UpdatedDate:Device.UpdatedDate,FWVersion:Device.FWVersion,
      ConfigVersion: Device.ConfigVersion != null ? Device.ConfigVersion:undefined ,ModifiedBy: Device.ModifiedBy,Active:Device.Active}).exec(function afterwards(err, updated) {

      if (err) {
        // handle error here- e.g. `res.serverError(err);`
        sails.log.error("Failed to update Device error " + err);
        return res.visionResponseJSON(null, "Failed to Update Device!", "error");

      }
      if (updated.length > 0) {
        Devices.findOne({id: id}).exec(function (err, Device) {
          if (err) {
            return
          }
          if (Device) {
            return res.visionResponseJSON(Device, "Device Updated!", "success");
          }
        });

      }
    });
  },

  destroy : function(req, res)
  {
    var id = req.param("id");

    if(!id)
    {
      return res.badRequest("Please provide the Device");
    }
    Device.ModifiedBy = req.DeviceProfile.DeviceID;
    Devices.destroy({id:id}).exec(function (err){

      if(err)
      {
        sails.log.error(err);
        return res.serverError(err);
      }

      return res.visionResponseJSON(null,"Device Deleted!","success");

    });
  },

};

