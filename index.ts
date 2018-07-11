const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const {makeExecutableSchema, addMockFunctionsToSchema, MockList } = require('graphql-tools');

const typeDefs = `
type Query {cards : [Card!]! }

type Card {
 id : String!
 name : String!
 lastname : String!
 role: String!
 age: String
 text: String
 tag: String
}
`;

const resolvers = { 
};

const schema = makeExecutableSchema({
typeDefs,
resolvers
});


const app = express();

app.use(cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

app.use('/graphiql', graphiqlExpress({endpointURL : '/graphql'}));

app.get('/', function(req, res){
 res.send('Hello Everyone');
});


app.listen(4000, ()=>{
console.log("server running: http://localhost:4000/graphiql");
});
