const jwt = require('jsonwebtoken')

const authAdmin = 
 async (req, res, next) => {

    try {

       const { AdminToken } = req.cookies;

  if(!AdminToken){

    return res.status(401).json({ error: "token not found" })
  }

  const verifiedToken = jwt.verify(AdminToken, process.env.JWT_SECRETE)
  if(!verifiedToken){

    return res.status(401).json({ error: "Admin not authorised" })
  }


  if(verifiedToken.role!=='admin'){

    return res.status(401).json({ error: "Access denied" })
  }


        req.admin = verifiedToken.id
        next()
    } 
    catch (error) {
        return res.json({ loginfail: true, status: false, message: "Please Login" })
    }
}