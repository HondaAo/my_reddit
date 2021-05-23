import { Request } from "express";
import { NextFunction } from "express";
import { Response } from "express";
import User from "../entity/User";
import jwt from 'jsonwebtoken'
export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token
        if(!token) throw new Error('Unauthenticated')

        const { username }: any = jwt.verify(token, '4mt3i9ghbw9')
        const user = await User.findOne({ username })
        if(!user) throw new Error('Unauthenticated')

        res.locals.user = user

        return next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'I’m Unauthenticated'})
    }
}