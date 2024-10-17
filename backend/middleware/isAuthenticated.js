import jwt from "jsonwebtoken";

///This is the middleware which will call on each and everey request whenever authentication is required
export const isAuthenticated = (req,res,next) => {
    try{
        // console.log(req.cookies);
        // const token = req.cookies.token;
        const token = req.headers.authorization?.split(' ')[1];
        console.log("token = ", token);
        if(!token)
        {
            return res.status(401).json({
                message : "Please login first",
                success : false
            })
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        // console.log(decode); //for learning purpose only

        if(!decode)
        {
            return res.status(401).json({
                message : "Please login",
                success : false
            })
        }

        req.id = decode.userId;
        next();

    }catch(error)
    {
        console.log(error);
        res.status(500).json({
            message :"Internal server error",
            success : false
        })
    }
}