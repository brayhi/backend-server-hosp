const jwt = require('jsonwebtoken');

// ========================================
// Verificar Token
// ========================================

let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, '@este-es@-un-seed-dificil', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok:false,
                err:{
                    message: 'Token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    })
}


module.exports = {
    verificaToken
}