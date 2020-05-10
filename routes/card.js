const { Router } = require('express');
const Card = require('../models/card');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
    const card = await Card.fetch();

    res.render('card', {
        title: 'Корзина',
        courses: card.courses,
        price: card.price,
        isCard: true
    })
})

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id);
    const card = await Card.fetch();
    await Card.add(course);

    res.redirect('/card');
})

module.exports = router;