function getConfig() {
    switch(process.env.NODE_ENV){

        case 'development':
        default:
            return {
                mongodb_uri:  process.env.MONGOLAB_URI || "mongodb://localhost:27017/cvpartner",
                auth : {
                    clientID: '963538669701-gme2v6et0fs288454402qthgke4j20p1.apps.googleusercontent.com',
                    clientSecret: 'gG3E9bn7-9YYKzQj-aR_qSHl',
                    callbackURL: 'http://127.0.0.1:3001/auth/google/callback',
                    disable: true
                },
                synchSchedule: {
                    hour: 0,
                    second: 1
                },
                sfAuth:{
                    loginUrl: 'https://eu1.salesforce.com', //'https://ap2.salesforce.com',
                    userName: 'kjartan.juvik@miles.no', //'mithun.ganatra@miles.in',
                    password: 'S567haka', //'Asdf1234',
                    accessToken: 'xQNuOeTcR50AvbSHQSVNbFsbW', //'moy8VY3vf0cjwLLiD7qnEApsH',
                    sfAutoSyncEnabled: true
                }
            };

        case 'production':
            return {
                mongodb_uri: process.env.MONGOLAB_URI,
                auth : {
                    clientID: '694346714586-0l2djhdvhrc09rhl2pc6s3mmpitmk4uf.apps.googleusercontent.com',
                    clientSecret: 'KAQZTd7C6EjMAiustuLrke6a',
                    callbackURL: 'https://cvpartner-admin.herokuapp.com/auth/google/callback'
                },
                synchSchedule: {
                    hour: 1
                },
                sfAuth:{
                    loginUrl: 'https://eu1.salesforce.com',
                    userName: 'kjartan.juvik@miles.no',
                    password: 'S567haka',
                    accessToken: 'xQNuOeTcR50AvbSHQSVNbFsbW',
                    sfAutoSyncEnabled: true
                }
            };
    }
}

module.exports = getConfig();
