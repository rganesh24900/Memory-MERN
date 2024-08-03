import jwt from 'jsonwebtoken';

const auth = (req ,res ,next)=>{
    try{

        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const isCustomAuth = token && token.length < 500;
         let decodedData;

         if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
         }
         else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
         }
         next();
    }
    catch(error){
      console.log("Error in middleware: ",error)
    }

}

export default auth;