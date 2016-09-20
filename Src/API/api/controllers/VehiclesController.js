/**
 * VehiclesController
 *
 * @description :: Server-side logic for managing Vehicles
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

    Vehicles.find(options).exec(function(err,Vehicles){

      if(Vehicles)
      {


        return res.visionResponseJSON(Vehicles,"Found Vehicles","success");
      }
      else
      {
        return res.visionResponseJSON(null,"Sorry couldn't find any Vehicles","error");
      }
    })
  },

  findOne: function(req,res)
  {
    var id = req.param("id");
    Vehicles.findOne({id:id}).exec(function(err,Vehicles){

      if(Vehicles)
      {
        return res.visionResponseJSON(Vehicles,"Found Vehicle","success");
      }
      else
      {
        return res.visionResponseJSON(null,"Sorry couldn't find any Vehicle","error");
      }
    })
  },
  create : function(req,res)
  {
    var Vehicle = req.body;
    if(!Vehicle)
    {
      res.badRequest("Vehicle is missing ");
    }




    Vehicles.create(Vehicle).exec(function(err,Vehicle){

      if(err)
      {
        sails.log.error("failed to create a Vehicle "+err);
        return res.serverError(err);
      }

      if(Vehicle) {


        Vehicles.findOne({id:Vehicle.id}).exec(function(err,Vehicle) {
          if (err) {
            sails.log.error("failed to create a Vehicle " + err);
            return res.serverError(err);
          }

          sails.log.info("Vehicle has been created  " + Vehicle);
          return res.visionResponseJSON(Vehicle, "Vehicle Added!", "success", "");
        });
      }
      else
      {
        res.serverError("Failed to create Vehicle");
      }
    })
  },


  update : function(req,res)
  {
    var id = req.param("id");

    if(!id)
    {
      return res.badRequest("Please provide the Vehicle id ");
    }
    var Vehicle = req.body;
    //Vehicle.ModifiedBy = req.userProfile.userID;

    Vehicles.update({id:id},Vehicle).exec(function afterwards(err, updated) {

      if (err) {
        // handle error here- e.g. `res.serverError(err);`
        sails.log.error("Failed to update Vehicle error " + err);
        return res.visionResponseJSON(null, "Failed to Update Vehicle!", "error");

      }
      if (updated.length > 0) {
        Vehicles.findOne({id: id}).exec(function (err, Vehicle) {
          if (err) {
            return
          }
          if (Vehicle) {
            return res.visionResponseJSON(Vehicle, "Vehicle Updated!", "success");
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
      return res.badRequest("Please provide the Vehicle");
    }
    Vehicle.ModifiedBy = req.VehicleProfile.VehicleID;
    Vehicles.destroy({id:id}).exec(function (err){

      if(err)
      {
        sails.log.error(err);
        return res.serverError(err);
      }

      return res.visionResponseJSON(null,"Vehicle Deleted!","success");

    });
  },

};

