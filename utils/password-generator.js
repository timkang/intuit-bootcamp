var
	crypto = require("crypto")
	salt = "salt rocks!";

console.log(crypto.createHash("sha1").update(process.argv[2] + salt).digest("hex"));
