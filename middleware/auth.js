const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
	try {
		const token = req.header("x-auth-token");

		if (!token) {
			return res.status(400).json({ msg: "No token, authorization denied" });
		}

		const verified = jwt.verify(token, process.env.JWT_SECRET);

		if (!verified) {
			return res.status(400).json({ msg: "Verification unsuccessful" });
		}

		res.user = verified.id;
		next();
	} catch (err) {
		res.status(500).json({ msg: err });
	}
};

module.exports = auth;
