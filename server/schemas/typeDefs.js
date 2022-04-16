// import the gql tagged template function
const { gql } = require('appollo-server-express');

// create our typeDefs, note: type Query is built into GraphQL
const typeDefs = gql`
    type Query {
        helloWorld: String
    }
`;

// export the typeDefs
module.exports = typeDefs;