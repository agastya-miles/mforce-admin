function getConfig() {
    switch(process.env.NODE_ENV){

        case 'development':
        default:
            return {
                mongodb_uri: "mongodb://localhost:27017/cvpartner",
                auth : {
                    clientID: '963538669701-gme2v6et0fs288454402qthgke4j20p1.apps.googleusercontent.com',
                    clientSecret: 'gG3E9bn7-9YYKzQj-aR_qSHl',
                    callbackURL: 'http://127.0.0.1:3001/auth/google/callback',
                    disable: true
                },
                synchSchedule: {
                    hour: 1,
                    second: 0
                }
            };

        case 'production':
            return {
                mongodb_uri: "mongodb://miles_user:miles_password@ds047030.mongolab.com:47030/heroku_app30746985",
                auth : {
                    clientID: '694346714586-0l2djhdvhrc09rhl2pc6s3mmpitmk4uf.apps.googleusercontent.com',
                    clientSecret: 'KAQZTd7C6EjMAiustuLrke6a',
                    callbackURL: 'https://cvpartner-admin.herokuapp.com/auth/google/callback'
                },
                synchSchedule: {
                    hour: 1
                }
            };
    }
}

module.exports = getConfig();