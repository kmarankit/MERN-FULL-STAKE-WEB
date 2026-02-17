import Visitor from '../modals/VisitorData.js';

// @desc    Track a new visit or session
// @route   POST /api/visitors/track
export const trackVisitor = async (req, res) => {
  const { visitorId, sessionData } = req.body;

  if (!visitorId || !sessionData) {
    return res.status(400).json({ message: 'Visitor ID and session data are required.' });
  }

  try {
    // We add the IP and User-Agent from the request headers for more accuracy
    const enrichedSession = {
      ...sessionData,
      ip: req.ip || req.headers['x-forwarded-for'],
      userAgent: req.headers['user-agent'],
      timestamp: new Date()
    };

    const updatedVisitor = await Visitor.findOneAndUpdate(
      { visitorId: visitorId },
      { 
        $push: { 
          sessions: { 
            $each: [enrichedSession], 
            $slice: -100 // Keep only the last 100 sessions to save DB space
          } 
        },
        $set: { lastVisit: new Date() }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, data: updatedVisitor });

  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all visitor stats (Admin only)
// @route   GET /api/visitors/all
export const getAllVisitors = async (req, res) => {
  try {
    // We can also calculate total unique visitors count
    const totalUnique = await Visitor.countDocuments();
    const visitors = await Visitor.find({}).sort({ lastVisit: -1 }); 

    res.status(200).json({
      success: true,
      totalUnique,
      visitors
    });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ message: 'Server error' });
  }
};