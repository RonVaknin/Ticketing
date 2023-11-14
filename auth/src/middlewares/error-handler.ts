import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('An error occured: ', err);

    res.status(400).send({
        message: 'something went wrong'
    });
}