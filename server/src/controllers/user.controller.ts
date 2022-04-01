
import { Request, Response } from 'express';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { DI } from '../index';
import { User } from '../entities';
const bcrypt = require('bcrypt');
import { EntityManager } from '@mikro-orm/mariadb';



export async function list(req: Request, res: Response) {
    try {
        const users = await DI.userRepository.findAll();
        res.json(users);
    }
    catch (err) {
        console.error(err);
    }
}

export async function show(req: Request, res: Response) {
    try {
        const user = await DI.userRepository.find({ id: parseInt(req.params.id) });
        res.json(user);
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
}

export async function store(req: Request, res: Response) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400);
        return res.json({ message: 'missing parameters' });
    }

    try {
        const user = new User;
        user.email = req.body.email;
        user.name = req.body.name;
        user.createdAt = new Date();
        user.updatedAt = new Date();
        let createdUser;
        await bcrypt.hash(req.body.password, 10, async function (err: any, hash: string) {
            user.password = hash;
            const createdUser = DI.userRepository.create(user);
            await DI.userRepository.persist(createdUser).flush();
        })

        res.json(createdUser);
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const user = await DI.userRepository.findOneOrFail(parseInt(req.params.id));
        const newUser = new User;
        newUser.email = req.body.email;
        newUser.name = req.body.name;
        newUser.updatedAt = new Date();
        await bcrypt.hash(req.body.password, 10, async function (err: any, hash: string) {
            newUser.password = hash;
            wrap(user).assign(newUser);
            await DI.userRepository.flush();
        })

        res.json(user);
    } catch (e: any) {
        return res.status(400).json({ message: e.message });
    }
}