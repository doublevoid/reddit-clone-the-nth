import { Request, Response } from 'express';
import { wrap } from '@mikro-orm/core';
import { DI } from '../index';
import { Comment } from '../entities';

// const commentRepository = DI.orm.em.getRepository(Comment);
async function list(req: Request, res: Response) {
    try {
        const comments = await DI.commentRepository.findAll();
        res.json(comments);
    } catch (err) {
        console.error(err);
    }
}

async function show(req: Request, res: Response) {
    try {
        const comment = await DI.commentRepository.find({
            id: parseInt(req.params.id),
        });
        res.json(comment);
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
}

async function store(req: Request, res: Response) {
    if (!req.body.userId || !req.body.body || !req.body.title) {
        res.status(400);
        return res.json({ message: 'missing parameters' });
    }

    try {
        const comment = new Comment();
        comment.owner = req.body.userId;
        comment.body = req.body.body;
        comment.post = req.body.postId;
        comment.createdAt = new Date();
        comment.updatedAt = new Date();
        const createdComment = DI.commentRepository.create(comment);
        await DI.commentRepository.persist(createdComment).flush();

        res.json(createdComment);
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
}

async function update(req: Request, res: Response) {
    try {
        const comment = await DI.commentRepository.findOneOrFail(
            parseInt(req.params.id)
        );
        const newComment = new Comment();
        newComment.body = req.body.body;
        newComment.updatedAt = new Date();
        wrap(comment).assign(newComment);
        await DI.commentRepository.flush();

        res.json(comment);
    } catch (e: any) {
        return res.status(400).json({ message: e.message });
    }
}

export default { show, update, list, store };
