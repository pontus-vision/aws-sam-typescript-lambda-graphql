'use strict'
const apolloServer = require('./dist/src/aws-wrapper')
exports.handler = apolloServer.createHandler({
    cors: {
        origin: true,
        credentials: true,
    },
});
