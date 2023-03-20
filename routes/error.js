import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    const page = {
        title: "Not Found"
    };
    res.status(404).render('404.hbs', { page: page });
});


export default router;