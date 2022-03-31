
import { Request, Response } from 'express';
import { DatabaseDriver, QueryOrder, wrap, RequestContext } from '@mikro-orm/core';
import { DI } from '../index';
import { Post } from '../entities';
const bcrypt = require('bcrypt');
import { EntityRepository, EntityManager } from '@mikro-orm/core';

// const postRepository = DI.orm.em.getRepository(Post);

export async function list(req: Request, res: Response) {
    try {
        const posts = await DI.postRepository.findAll()
        res.json(posts);
    }
    catch (err) {
        console.error(err);
    }
}

export async function show(req: Request, res: Response) {
    try {
        const post = await DI.postRepository.find({ id: parseInt(req.params.id) })
        res.json(post);
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
}

export async function store(req: Request, res: Response) {
    if (!req.body.userId || !req.body.body || !req.body.title) {
        res.status(400);
        return res.json({ message: 'missing parameters' });
    }

    try {
        const post = new Post;
        post.owner = req.body.userId;
        post.body = req.body.body;
        post.title = req.body.title;
        post.createdAt = new Date();
        post.updatedAt = new Date();
        const createdPost = DI.postRepository.create(post);
        await DI.postRepository.persist(createdPost).flush();

        res.json(createdPost);
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const post = await DI.postRepository.findOneOrFail(parseInt(req.params.id));
        const newPost = new Post;
        newPost.owner = req.body.postId;
        newPost.title = req.body.title;
        newPost.body = req.body.body;
        newPost.updatedAt = new Date();
        wrap(post).assign(newPost);
        await DI.postRepository.flush();

        res.json(post);
    } catch (e: any) {
        return res.status(400).json({ message: e.message });
    }
}

