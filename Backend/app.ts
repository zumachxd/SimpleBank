import express from 'express';
import UserRouter from './Routes/User.router';
import 'express-async-errors';
import handleAsyncError from './Util/asyncError';


class App {
    public app: express.Express;
  
    constructor() {
      this.app = express();
  
      this.config();
  
      this.app.use('/', UserRouter );
      this.app.use(handleAsyncError);
    }
  
    private config():void {
      const accessControl: express.RequestHandler = (_req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
        res.header('Access-Control-Allow-Headers', '*');
        next();
      };
  
      this.app.use(express.json());
      this.app.use(accessControl);
    }
  
    public start(PORT: string | number):void {
      this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
  }
  
  export { App };
    