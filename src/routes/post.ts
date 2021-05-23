import { Router } from "express";
import { Response } from "express";
import { Request } from "express";
import Post from "../entity/Post";
import auth from '../middleware/me'
const createPost = async(req: Request, res: Response) => {
    const { title, body, sub } = req.body;

    const user = res.locals.user
    if(title.trim() === '') return res.status(400).json({ title: 'Title must not be empty.'})

    try {
        const post = await new Post({ title, body, user, subName: sub }).save()
        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong'})
    }
}

const router = Router();

router.post('/', auth, createPost)

export default router