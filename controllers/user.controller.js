const User = require("../models/User");
const bcrypt = require('bcrypt')

module.exports = {
  create: async (req, res) => {
    User?.exists({ email: req.body.email })
      .then(async (result) => {
        if (!result) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                ...req.body, password: hashedPassword
              });
              await user
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
            message: "User already Exist",
          });
        }
      })
      .catch((err) => console.error(err));
  },

  getAll: async (req, res, next) => {
    await User.find({})
      .lean()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(503).send(err));
  },

  getOne: async (req, res) => {
    try {
      await User.findOne({ _id: req.params.id })
        .lean()
        .then((result) => {
          if (result) {
            return res.status(200).json({ ...result });
          }
          return res.status(404).json({
            message: "User Not found",
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
        info: "Server Error. Error getting the User",
      });
      throw new Error(error);
    }
  },

  deleteOne: async (req, res) => {
    await User.deleteOne({ _id: req.params.id })
      .then((result) => {
        if (result.deletedCount == 1) {
           return res.status(200).send(result);   
        }
        res.status(404).json({
          message: "User Not found",
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
    User?.exists({ _id: req.params.id })
      .then(async (result) => {
        if (result) {
          try {
            await User.updateOne(
              { _id: req.params.id },
              {
                $set: req.body,
              }
            )
              .then((result) =>
                res.status(201).send({
                  ...result,
                  info: "successfully updated User",
                })
              )
              .catch((err) => res.status(409).send(err));
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(404).json({
            info: { message: "User not found.", valid: false },
          });
        }
      })
      .catch((err) => console.error(err));
  },
  login: require('../auth/auth').userLogin,
  logout: require('../auth/auth').logout
};