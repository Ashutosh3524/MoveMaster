const Contact = require('../models/contactModel.js');

const submitContactForm = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while submitting form' });
  }
};

const fetchContactForm = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ timestamp: -1 });
    res.status(200).json({ message: 'Fetched successfully', data: contacts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch', error: error.message });
  }
};

const updateEnquiryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const allowedStatuses = ['new', 'read'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updated = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({ message: 'Status updated', data: updated });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteEnquiry = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({ message: 'Enquiry deleted successfully'});
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({ message: 'Server error during deletion' });
  }
};

module.exports = {submitContactForm, fetchContactForm, updateEnquiryStatus, deleteEnquiry};
