const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { isAuthenticated } = require('../middleware/auth');

router.post('/add', isAuthenticated, contactController.addContact);
router.get('/', isAuthenticated, contactController.getContacts);
router.put('/update/:id', isAuthenticated, contactController.updateContact);
router.delete('/delete/:id', isAuthenticated, contactController.deleteContact);

module.exports = router;