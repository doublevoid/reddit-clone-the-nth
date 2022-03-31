import { MikroORM, RequestContext, EntityRepository, EntityManager } from "@mikro-orm/core";
require('dotenv').config();
import { env } from "process";
import config from './mikro-orm.config'
import express from 'express';
import http from 'http'
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route')

// const userRouter = require('./routes/user.route')

import { Comment, Post, Upvote, UserToken, User } from './entities';

export const DI = {} as {
    server: http.Server;
    orm: MikroORM,
    em: EntityManager,
    userRepository: EntityRepository<User>,
    postRepository: EntityRepository<Post>,
    commentRepository: EntityRepository<Comment>
}
export const app = express();
export const init = (async () => {

})();
const port = env.PORT || 3000;
const dbPWD = env.DB_PWD;

export const main = (async () => {
    DI.orm = await MikroORM.init();
    DI.em = DI.orm.em;
    DI.userRepository = DI.orm.em.getRepository(User);
    DI.postRepository = DI.orm.em.getRepository(Post);
    DI.commentRepository = DI.orm.em.getRepository(Comment);
    app.use(express.json());
    app.use((req, res, next) => {
        RequestContext.create(DI.orm.em, next);
      });
    app.use('/user', userRouter);
    app.use('/post', postRouter);

    DI.server = app.listen(port, () => {
        console.log(`MikroORM express started at http://localhost:${port}`);
    })
})();