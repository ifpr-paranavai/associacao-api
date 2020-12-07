class Config{
    static createConfig(){
        global.config = {
            port: process.env.PORT || 3000,
            secret: "safsafsadf",
            jwt:{
                secret: "association-api",
                expiresIn: '3h'
            },
            db:{
                name: "association",
                url: "cluster0.try43.mongodb.net",
                username: "developer",
                password: "d3v3l0p3r"
            }
        }
    }
}


module.exports = Config.createConfig()