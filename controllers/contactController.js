const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

const updateContact = asyncHandler(async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!updatedContact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json({ message: `Updated contact ${req.params.id}` });
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res, next) => {
    const { name, email, phone } = req.body;
    if (!email || !name || !phone) {
        const error = new Error('All fields are mandatory');
        error.status = 400;
        return next(error);
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(contact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    await contact.deleteOne();
    res.status(200).json({ message: "Contact deleted successfully" });
  });
module.exports = { getContacts, getContact, updateContact, deleteContact, createContact };
