const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const movieRouter = require("./routes/movies.routes");
const usersRouter = require("./routes/users.routes");
const swaggerUI = require('swagger-ui-express')

const apiDocs= require('./swagger.json')

const PORT = process.env.PORT || 8081;

dotenv.config();

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDocs))
app.use(morgan("dev"));
app.use(express.json());

app.use(movieRouter);
app.use(usersRouter);

// Healthcheck endpoint
app.get('/ping', (request, response) => {
    response.json({ message: 'Ping successfully' });
  });


app.listen(PORT, () => {
    console.log(`Application running at localhost:${PORT}`);
});