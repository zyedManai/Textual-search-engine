const express =require('express');
const bodyParser = require('body-parser');
const photos = require('./routes/photos').router;
const map = require('./routes/map');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'view');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/',photos);
app.use('/map',map);

app.listen(3000);