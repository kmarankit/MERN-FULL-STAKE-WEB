// controllers/visitorController.js

import Visitor from '../modals/VisitorData.js';

// Add the 'export' keyword before 'const'
export const trackVisitor = async (req, res) => {

    console.log('✅ Received visitor tracking request!');
  console.log('Payload:', req.body); // Log the data to see it

  const { visitorId, sessionData } = req.body;

  if (!visitorId || !sessionData) {
    return res.status(400).json({ message: 'Visitor ID and session data are required.' });
  }

  try {
    // Find the visitor by visitorId and push the new session into the sessions array.
    // The 'upsert: true' option creates a new document if no visitor matches the ID.
    const updatedVisitor = await Visitor.findOneAndUpdate(
      { visitorId: visitorId },
      { $push: { sessions: sessionData } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: 'Visitor data tracked successfully', data: updatedVisitor });

  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ message: 'Server error while tracking visitor.' });
  }
};
export const getAllVisitors = async (req, res) => {
  try {
    // Find all documents in the Visitor collection
    const visitors = await Visitor.find({}).sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.status(200).json(visitors);
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ message: 'Server error while fetching visitors.' });
  }
};