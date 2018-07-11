const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const {makeExecutableSchema, addMockFunctionsToSchema, MockList } = require('graphql-tools');
const casual = require('casual');


const typeDefs = `
type Query {cards : [Card!]! }

type Card {
 id : String!
 name : String!
 title : String!
 imgSrc: String!
 imgAlt: String
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

const mocks ={
Query: ()=> ({
   cards: () => new MockList([5, 30]),
}),
Card: () => ({
    id : casual.uuid,
    title : casual.title,
    name : casual.name,
    imgSrc: 'https://picsum.photos/600/300/?image='+casual.integer(900, 916),
    imgAlt: 'Image',
    tag : 'article',
    text: casual.sentense,
}),

};

addMockFunctionsToSchema({
  schema,
  mocks,
  preserveResolvers: true

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
