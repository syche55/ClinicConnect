const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();


app.use(bodyParser.json());

app.use(isAuth);

app.use(
    '/graphql',
    graphqlHTTP({
        // when you call createEvent(), you return an event
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);

mongoose.connect(`${process.env.MONGO_URL}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
              }).then(() => {
            app.listen(3000);

        }).catch(err => {
            console.log(err);
        });


