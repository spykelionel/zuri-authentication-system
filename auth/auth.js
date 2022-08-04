const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Staff = require("../models/Staff");
const Manager = require("../models/Manager");
const Admin = require("../models/Admin");

exports.userLogin = async (req, res) => {
  const client = req.body;
  await User.findOne({ email: client.email }).then((user) => {
    console.log(client);
    if (user) {
      console.log(user);
      // check password
      bcrypt.compare(client.password, user.password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: "Auth failed, Check your credentials",
            value: error,
          });
        }
        const token = jwt.sign({
            active_user: user.email,
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        }, )
        res.status(200).json({
          message: "Auth Successful",
          token,
          ACK: result,
        });
      });
    }
  });
};

exports.staffLogin = async (req, res) => {
  const client = req.body;
  await Staff.findOne({ email: client.email }).then((staff) => {
    console.log(client);
    if (staff) {
      console.log(staff);
      // check password
      bcrypt.compare(client.password, staff.password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: "Auth failed, Check your credentials",
            value: error,
          });
        }
        const token = jwt.sign({
            active_user:staff.email,
            id: staff._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        }, )
        res.status(200).json({
          message: "Auth Successful",
          token,
          ACK: result,
        });
      });
    }
  });
};

exports.managerLogin = async (req, res) => {
    const client = req.body;
    await Manager.findOne({ email: client.email }).then((manager) => {
      console.log(client);
      if (manager) {
        console.log(manager);
        // check password
        bcrypt.compare(client.password, manager.password, (error, result) => {
          if (error) {
            return res.status(401).json({
              message: "Auth failed, Check your credentials",
              value: error,
            });
          }
          const token = jwt.sign({
              active_user:manager.email,
              id: manager._id
          }, process.env.JWT_SECRET, {
              expiresIn: "1h"
          }, )
          res.status(200).json({
            message: "Auth Successful",
            token,
            ACK: result,
          });
        });
      }
    });
  };

exports.adminLogin = async (req, res) => {
    const client = req.body;
    await Admin.findOne({ email: client.email }).then((admin) => {
      console.log(client);
      if (admin) {
        console.log(admin);
        // check password
        bcrypt.compare(client.password, admin.password, (error, result) => {
          if (error) {
            return res.status(401).json({
              message: "Auth failed, Check your credentials",
              value: error,
            });
          }
          const token = jwt.sign({
              active_user:admin.email,
              id: admin._id
          }, process.env.JWT_SECRET, {
              expiresIn: "1h"
          }, )
          res.status(200).json({
            message: "Auth Successful",
            token,
            ACK: result,
          });
        });
      }
    });
  };