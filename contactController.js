const Contact = require('../models/Contact');

// CRUD Operations
// Add Contact
exports.addContact = async (req, res) => {
    const { name, phone, email, tags } = req.body;

    try {
        const contact = new Contact({ name, phone, email, tags, user: req.user.id });
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create contact' });
    }
};


// Get All Contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
};


// Update Contact
exports.updateContact = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedContact) return res.status(404).json({ error: 'Contact not found' });
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update contact' });
    }
};


// Delete Contact
exports.deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) return res.status(404).json({ error: 'Contact not found' });
        res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
};
exports.searchContacts = async (req, res) => {
    const { query } = req.query; // Get the search query from query parameters

    try {
        const contacts = await Contact.find({
            user: req.user.id,
            $or: [
                { name: { $regex: query, $options: 'i' } },  // Case-insensitive search
                { phone: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search contacts' });
    }
};



const vCard = require('vcf');

exports.importVCF = (req, res) => {
    const file = req.files.vcf; // Assuming you're using multer for file uploads
    const vCardData = new vCard();
    vCardData.parse(file.data.toString());

    const contacts = vCardData.toJSON().map(contact => ({
        name: contact.fn,
        phone: contact.tel[0].value,
        email: contact.email ? contact.email[0].value : ''
    }));

    Contact.insertMany(contacts);
    res.json({ message: 'Contacts imported successfully' });
};

exports.exportVCF = async (req, res) => {
    const contacts = await Contact.find({ user: req.user.id });
    const vCardData = new vCard();

    contacts.forEach(contact => {
        vCardData.add(contact.name, contact.phone, contact.email);
    });

    res.setHeader('Content-Disposition', 'attachment; filename="contacts.vcf"');
    res.send(vCardData.toString());
};