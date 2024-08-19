import jwt from 'jsonwebtoken'
export const verifyToken = (req,res,next)=>{
    const token = req.header['authorization'] && req.header['authorization'].split(' ')[1]
    if(!token){
        return res.status(403).json('A token is required for authentication')
    }

   jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
    if(err){
        return res.status(403).json('invalid token')
    }
    req.user= decoded
    next()
   }) 
}

export const verifyAdmin = (req,res,next )=> {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
    if(!token){
        return res.status(403).json('token is required')

    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decode)=>{
        if(err){
            return res.status(403).json('invalid token')
        }
        if(!decode.admin){
            return res.status(403).json('Access denied. Admins only')
        }
        req.user = decode
        next()
    })

}

export const verifyAuthorOrAdmin = (req,res,next )=> {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
    if(!token){
        return res.status(403).json('token is required')

    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decode)=>{
        if(err){
            return res.status(403).json('invalid token')
        }

        if(!decode.admin && !decode.author){
            return res.status(403).json('Access denied. Admins or Authors only')
        }
        req.user = decode
        next()
    })
}

