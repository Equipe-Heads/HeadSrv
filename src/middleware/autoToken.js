//Importar uma Instância "Biblioteca que Gera Token"
const jwt = require("jsonwebtoken");
//Resgata Chave Secreta
const { token } = require("../config/chaveSecreta");

exports.authenticate = async (req, res, next ) => {
	// Pega o Cabeçalho "authorization" da requisição
	const authHeader = req.headers.authorization;
	//
	if (!authHeader) { return res.json({message:"Token não definido"}); }
	//
	const [bearer, resultToken] = authHeader.split(" ");
	//
	try {
		// método "verify" da biblioteca jwt: Verifica o Token e
		// retorna do payload do token decodificado
		const payload = await jwt.verify(resultToken, token.secret);
		return next();
	} 
	catch (err){ return res.json({message:"Token Inválido!!"}); }
}