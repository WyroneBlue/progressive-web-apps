// Express Setup
import express from 'express';

import path, { join} from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Load env variables
import dotenv from 'dotenv';
dotenv.config();

// Routes
import routes from "./routes/index.js";

// HBS Setup
import { engine } from 'express-handlebars';
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    // helpers: require('./utils/hbs-helpers')
}));
app.set('view engine', 'hbs');
app.set("views", "./views");
// app.use('/public', express.static(join(__dirname, 'public')));
app.use(express.static('public'))

// Use Routes
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});