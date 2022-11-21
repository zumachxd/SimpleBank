import { Request, Response, NextFunction } from "express"

const handleAsyncError = (err: Error, req: Request, res: Response, next: NextFunction) =>{

    if(err instanceof Error) {
        return res.status(404).json({ message: err.message})
    }
}



export default handleAsyncError;