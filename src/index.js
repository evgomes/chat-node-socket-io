const express = require('express');

const app = express();
require('./startup/views')(app);
require('./startup/routes')(app);
require('./startup/db')();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('./startup/chat')(server);