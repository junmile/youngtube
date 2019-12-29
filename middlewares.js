import routes from "./routes";

export const localsMiddlewares =  (req,res,next) =>{
    res.locals.siteName = "Young Tube";
    res.locals.routes = routes;
    next();
};