import { NextFunction } from "express";
import { Request } from "express";
import { Response } from "express";

export default (req: Request, res: Response , next: NextFunction) => {
    const exception = ['password']

    Object.keys(req.body).forEach(key => {
        if(typeof req.body[key] === 'string' && exception.includes[key]){
            req.body[key] = req.body[key].trim()
        }
    })

    next()
}