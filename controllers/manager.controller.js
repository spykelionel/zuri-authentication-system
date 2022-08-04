const Manager = require("../models/Manager");
const bcrypt = require('bcrypt')

module.exports = {
  create: async (req, res) => {
    Manager?.exists({ email: req.body.email })
      .then(async (result) => {
        if (!result) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const manager = new Manager({
                ...req.body, password: hashedPassword
              });
              await manager
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
            message: "Manager already Exist",
          });
        }
      })
      .catch((err) => console.error(err));
  },

  getAll: async (req, res, next) => {
    await Manager.find({})
      .lean()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(503).send(err));
  },

  getOne: async (req, res) => {
    try {
      await Manager.findOne({ _id: req.params.id })
        .lean()
        .then((result) => {
          if (result) {
            return res.status(200).json({ ...result });
          }
          return res.status(404).json({
            message: "Manager Not found",
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
        info: "Server Error. Error getting the Manager",
      });
      throw new Error(error);
    }
  },

  deleteOne: async (req, res) => {
    await Manager.deleteOne({ _id: req.params.id })
      .then((result) => {
        if (result.deletedCount == 1) {
           return res.status(200).send(result);   
        }
        res.status(404).json({
          message: "Manager Not found",
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
    Manager?.exists({ _id: req.params.id })
      .then(async (result) => {
        if (result) {
          try {
            await Manager.updateOne(
              { _id: req.params.id },
              {
                $set: req.body,
              }
            )
              .then((result) =>
                res.status(201).send({
                  ...result,
                  info: "successfully updated Manager",
                })
              )
              .catch((err) => res.status(409).send(err));
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(404).json({
            info: { message: "Manager not found.", valid: false },
          });
        }
      })
      .catch((err) => console.error(err));
  },
  login: require('../auth/auth').managerLogin
};