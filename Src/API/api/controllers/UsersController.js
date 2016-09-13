/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
    console.log("This is the options", options);
    Users.find(options).populate('Role').populate('Printer').exec(function(err,users){

      if(users)
      {

        var usersFilteredBasedOnDataEntitlements=Authentication_AuthorizationService.filterCollectionBasedOnDataEntitlements(users,"ParentOrganization.id",req.userProfile.entitlements.dataEntitlements["parentOrganizationId"])

        return res.dimsJSON(usersFilteredBasedOnDataEntitlements,"Found Users","success");
      }
      else
      {
        return res.dimsJSON(null,"Sorry couldn't find any Users","error");
      }
    })
  },

  findOne: function(req,res)
  {
    var id = req.param("id");
    Users.findOne({id:id}).populate('Role').populate('Printer').exec(function(err,users){

      if(users)
      {
        return res.dimsJSON(users,"Found User","success");
      }
      else
      {
        return res.dimsJSON(null,"Sorry couldn't find any User","error");
      }
    })
  },
  create : function(req,res)
  {
    var user = req.body;
    if(!user)
    {
      res.badRequest("user is missing ");
    }
    user.Login = user.Login.toLowerCase();
    user.Email = user.Email.toLowerCase();
    delete user.id;

    user.ModifiedBy = req.userProfile.userID;

    // assigning default password


    user.Password = Authentication_AuthorizationService.encrypPassword(Authentication_AuthorizationService.generateRandomPassword(8));
    user.ResetPassword = true,
      Users.create(user).exec(function(err,user){

        if(err)
        {
          sails.log.error("failed to create a user "+err);
          return res.serverError(err);
        }

        if(user) {


          Users.findOne({id:user.id}).populate('Role').exec(function(err,user) {
            if (err) {
              sails.log.error("failed to create a user " + err);
              return res.serverError(err);
            }

            sails.log.info("user has been created  " + user);
            return res.dimsJSON(user, "User Added!", "success", "");
          });
        }
        else
        {
          res.serverError("Failed to create user");
        }
      })
  },


  update : function(req,res)
  {
    var id = req.param("id");

    if(!id)
    {
      return res.badRequest("Please provide the user id ");
    }
    var user = req.body;
    user.ModifiedBy = req.userProfile.userID;
    Users.update({id:id},{Name: user.Name,ParentOrganization:user.ParentOrganization,Role:user.Role.id,Email:user.Email,PhoneNumber:user.PhoneNumber,
      Printer: user.Printer != null ? user.Printer.id:undefined ,Active:user.Active}).exec(function afterwards(err, updated) {

      if (err) {
        // handle error here- e.g. `res.serverError(err);`
        sails.log.error("Failed to update user error " + err);
        return res.dimsJSON(null, "Failed to Update User!", "error");

      }
      if (updated.length > 0) {
        Users.findOne({id: id}).populate('Role').populate('Printer').exec(function (err, user) {
          if (err) {
            return
          }
          if (user) {
            return res.dimsJSON(user, "User Updated!", "success");
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
      return res.badRequest("Please provide the user");
    }
    user.ModifiedBy = req.userProfile.userID;
    Users.destroy({id:id}).exec(function (err){

      if(err)
      {
        sails.log.error(err);
        return res.serverError(err);
      }

      return res.dimsJSON(null,"User Deleted!","success");

    });
  },

};

