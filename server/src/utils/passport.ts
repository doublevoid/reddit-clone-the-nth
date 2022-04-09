import { Strategy } from 'passport-local';
import passport from 'passport';
import { DI } from '../index';
import { EntityManager } from '@mikro-orm/core';
import * as argon2 from 'argon2';
import { User } from '../entities';

async function passportConfig() {
    passport.use(
        new Strategy(
            { usernameField: 'name', passwordField: 'password' },
            async (name, password, done) => {
                const em = DI.orm.em.fork();
                const userRepository = em.getRepository(User);
                const user = await userRepository.findOne({ name: name });
                if (!user) {
                    return done(null, false, {
                        message: 'Invalid credentials.\n',
                    });
                }
                if (!(await argon2.verify(user.password, password))) {
                    return done(null, false, {
                        message: 'Invalid credentials.\n',
                    });
                }
                return done(null, user);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (id: any, done) => {
        const em = DI.orm.em.fork();
        const userRepository = em.getRepository(User);
        console.log('b', id);
        const user = await userRepository.findOne({ id: id.id });
        console.log(user);
        if (!user) {
            done('error', false);
        }
        done(null, user);
    });
}

export { passportConfig };
