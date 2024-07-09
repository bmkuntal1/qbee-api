const express = require('express');
const httpStatus = require('http-status');
const userService = require('../services/user.service');
const validate = require('../middlewares/validate.middleware');
const schema = require('../validations/user.validation');
const auth = require('../middlewares/auth.middleware');
const uploadFile = require('../utils/uploadFile');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');

const router = express.Router();

router.get('/profile', auth, async (req, res, next) => {
  try {
    const users = await userService.getProfile(req.user.id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/profile',
  auth,
  validate(schema.updateProfile),
  async (req, res, next) => {
    try {
      req.body.id = req.user.id;
      await userService.update(req.body);
      const user = await userService.getProfile(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/avatar',
  auth,
  uploadFile.single('file'),
  async (req, res, next) => {
    try {
      await userService.update({
        id: req.user.id,
        avatar: `static/avatar/${req.file.filename}`
      });
      const user = await userService.getProfile(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/change-password',
  auth,
  validate(schema.changePassword),
  async (req, res, next) => {
    try {
      //verify current password
      const user = await userService.findOneByEmail(req.user.email);
      const isMatch = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isMatch) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Current password is incorrect'
        );
      }
      //hash new password
      const passwordHash = bcrypt.hashSync(req.body.newPassword, 8);
      await userService.update({
        id: req.user.id,
        password: passwordHash
      });
      res
        .status(httpStatus.OK)
        .json({ message: 'Password changed successfully' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
