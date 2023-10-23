import express from 'express';
import cors from 'cors';
import router from './router.js';

const app = express()
app.use(cors({
    origin: '*'
}));

// General app settings
app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded({ // to support URL-encoded bodies
		extended: true
	})
);


app.use('/api', router);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})