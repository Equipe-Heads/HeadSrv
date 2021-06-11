const jwt = require("jsonwebtoken");
const { token } = require("../config/chaveSecreta");

exports.authenticate = asunc (req, res, next ) => {

	// Pega o Cabeçalho "authorization" da requisição
	const authHeader = req.headeres.authorization;
	if (!authHeader) {
		return res.json({message:"Token não definido"});
	}

	const [, resultToken] = authHeader.split(" ");

	try {
		// método "verify" da biblioteca jwt: Verifica o Token e
		// retorna do payload do token decodificado
		const payload = await jwt.verify(resultToken. token.secret);
		return next();
	} catch (err){
		return res.json({message:"Token Inválido!!"});
	}
}