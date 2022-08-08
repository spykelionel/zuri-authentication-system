const Admin = require("../models/Admin");
const bcrypt = require('bcrypt')

module.exports = {
  create: async (req, res) => {
    Admin?.exists({ email: req.body.email })
      .then(async (result) => {
        if (!result) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const admin = new Admin({
                ...req.body, password: hashedPassword
              });
              await admin
                .save()
                .then((result) => {
                  return res.status(201).send(result);
                })
                .catch((err) => {
                  return res.status(501).send(err);
                });
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(409).json({
            message: "Admin already Exist",
          });
        }
      })
      .catch((err) => console.error(err));
  },

  getAll: async (req, res, next) => {
    await Admin.find({})
      .lean()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(503).send(err));
  },

  getOne: async (req, res) => {
    try {
      await Admin.findOne({ _id: req.params.id })
        .lean()
        .then((result) => {
          if (result) {
            return res.status(200).json({ ...result });
          }
          return res.status(404).json({
            message: "Admin Not found",
          });
        })
        .catch((err) => {
          return res.status(501).json({
            ...err,
            info: "Server Error",
          });
        });
    } catch (error) {
      res.status(501).json({
        ...error,
        info: "Server Error. Error getting the Admin",
      });
      throw new Error(error);
    }
  },

  deleteOne: async (req, res) => {
    await Admin.deleteOne({ _id: req.params.id })
      .then((result) => {
        if (result.deletedCount == 1) {
           return res.status(200).send(result);   
        }
        res.status(404).json({
          message: "Admin Not found",
        });
      }) 
      .catch((err) =>
       res.status(501).json({
          ...err,
          message: "Not found",
        })
      );
  },

  update: async (req, res) => {
    Admin?.exists({ _id: req.params.id })
      .then(async (result) => {
        if (result) {
          try {
            await Admin.updateOne(
              { _id: req.params.id },
              {
                $set: req.body,
              }
            )
              .then((result) =>
                res.status(201).send({
                  ...result,
                  info: "successfully updated Admin",
                })
              )
              .catch((err) => res.status(409).send(err));
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(404).json({
            info: { message: "Admin not found.", valid: false },
          });
        }
      })
      .catch((err) => console.error(err));
  },
  login: require('../auth/auth').adminLogin,
  logout: require('../auth/auth').logout
};