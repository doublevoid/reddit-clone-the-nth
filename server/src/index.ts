import {
    MikroORM,
    RequestContext,
    EntityRepository,
    EntityManager,
} from '@mikro-orm/core';
import express from 'express';
import http from 'http';
import passport from 'passport';
import 'dotenv/config';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';
import userRouter from './routes/user.route';
import postRouter from './routes/post.route';
import authRouter from './routes/auth.route';
import { Comment, Post, Upvote, User } from './entities';
import { passportConfig } from './utils/passport';
const redisStore = connectRedis(session);
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);
// const userRouter = require('./routes/user.route')

export const DI = {} as {
    server: http.Server;
    orm: MikroORM;
    em: EntityManager;
    userRepository: EntityRepository<User>;
    postRepository: EntityRepository<Post>;
    commentRepository: EntityRepository<Comment>;
    upvoteRepository: EntityRepository<Upvote>;
};
export const app = express();
const port = process.env.PORT || 3000;
passportConfig();

export const main = (async () => {
    DI.orm = await MikroORM.init();
    DI.em = DI.orm.em;
    DI.userRepository = DI.orm.em.getRepository(User);
    DI.postRepository = DI.orm.em.getRepository(Post);
    DI.commentRepository = DI.orm.em.getRepository(Comment);
    DI.upvoteRepository = DI.orm.em.getRepository(Upvote);
    app.use(
        session({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            secret: process.env.COOKIE_SECRET!,
            store: new redisStore({ client: redisClient }),
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
            },
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.json());
    app.use((req, res, next) => {
        RequestContext.create(DI.orm.em, next);
    });
    app.use('/user', userRouter);
    app.use('/post', postRouter);
    app.use('/login', authRouter);

    DI.server = app.listen(port, () => {
        console.log(`MikroORM express started at http://localhost:${port}`);
    });
})();
