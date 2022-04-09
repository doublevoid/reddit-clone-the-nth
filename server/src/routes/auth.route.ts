'use strict';
import passport from 'passport';
import express from 'express';
const authRouter = express.Router();

authRouter.post(
    '',
    passport.authenticate('local', {
        failureRedirect: '/',
        successRedirect: '/home',
    }),
    function (req, res) {
        res;
    }
);

export default authRouter;
