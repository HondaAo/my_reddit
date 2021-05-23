import { isEmpty } from "class-validator";
import { Response } from "express";
import { Request } from "express";
import { Router } from "express";
import { getConnection, getRepository } from "typeorm";
import Sub from "../entity/Sub";
import User from "../entity/User";
import auth from '../middleware/me'
const createSub = async(req: Request, res: Response) => {
    const { name, title, description } = req.body

    const user: User = res.locals.user;

    try {
        let errors: any = []
        if(isEmpty(name)) errors.name = 'Name must not be empty.'
        if(isEmpty(title)) errors.title = 'Title must not be empty.'

        const sub = await getRepository(Sub)
            .createQueryBuilder('sub')
            .where('sub.name = :name', { name: name.toLowerCase() })
            .getOne()

        if(sub) errors.name = 'Sub already exists'

        if(Object.keys(errors).length > 0){
            return res.status(400).json(errors);
        }
    } catch (error) {
        return res.status(400).json(error)
    }

    try {
        const sub = await new Sub({ name, description, title, user }).save()

        return res.json(sub)
    } catch (error) {
        console.log(error)
    }
}

const router = Router()

router.post('/', auth, createSub)

export default router