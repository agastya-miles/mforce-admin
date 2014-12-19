function getConfig() {
    switch(process.env.NODE_ENV){

        case 'development':
        default:
            return {
                mongodb_uri: "mongodb://localhost:27017/cvpartner",
                disable_auth: true
            };

        case 'production':
            return {
                mongodb_uri: "mongodb://miles_user:miles_password@ds047030.mongolab.com:47030/heroku_app30746985"
            };
    }
}


module.exports = getConfig();