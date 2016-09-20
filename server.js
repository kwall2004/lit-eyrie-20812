const path = require('path');
const express = require('express');
const fallback = require('express-history-api-fallback');
const port = (process.env.PORT || 8080);

const app = express();
const publicPath = path.join(__dirname, './public');

app.use('/public', express.static(publicPath));
app.use(fallback('dist/index.html', { root: publicPath }));

app.listen(port);
console.log(`Listening at http://localhost:${port}`);
