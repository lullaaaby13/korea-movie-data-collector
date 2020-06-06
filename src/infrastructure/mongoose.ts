import * as mongoose from 'mongoose'
const { connection, connect, Promise:MongoosePromise } = mongoose;

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connect('mongodb+srv://test:test1234@cluster0-gajqu.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
);

