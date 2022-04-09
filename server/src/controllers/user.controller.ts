import { Request, Response } from 'express';
import { DI } from '../index';
import { User } from '../entities';
import * as argon2 from 'argon2';

async function list(req: Request, res: Response) {
    try {
        const users = await DI.userRepository.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
    }
}

async function show(req: Request, res: Response) {
    try {
        const user = await DI.userRepository.find({
            id: parseInt(req.params.id),
        });
        res.json(user);
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
}

async function store(req: Request, res: Response) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400);
        return res.json({ message: 'missing parameters' });
    }

    try {
        const user = new User();
        user.email = req.body.email;
        user.name = req.body.name;
        user.createdAt = new Date();
        user.updatedAt = new Date();
        user.password = await argon2.hash(req.body.password);
        await DI.userRepository.persist(user).flush();
        res.json(user);
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
}

async function update(req: Request, res: Response) {
    try {
        const user = await DI.userRepository.findOneOrFail(
            parseInt(req.params.id)
        );
        const newUser = new User();
        newUser.email = req.body.email;
        newUser.name = req.body.name;
        newUser.updatedAt = new Date();
        newUser.password = await argon2.hash(req.body.password);

        res.json(user);
    } catch (e: any) {
        return res.status(400).json({ message: e.message });
    }
}

export default { update, list, show, store };
