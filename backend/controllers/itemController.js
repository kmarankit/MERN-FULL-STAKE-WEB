// import Item from '../modals/item.js';

// export const createItem = async (req, res, next) => {
//     try {
//         const { name, description, category, price, rating, hearts } = req.body;
//         const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

//         // e.g. total might be price * hearts, or some other logic
//         const total = Number(price) * 1; // replace with your own formula

//         const newItem = new Item({
//             name,
//             description,
//             category,
//             price,
//             rating,
//             hearts,
//             imageUrl,
//             total,
//         });

//         const saved = await newItem.save();
//         res.status(201).json(saved);
//     } catch (err) {
//         if (err.code === 11000) {
//             res.status(400).json({ message: 'Item name already exists' });
//         } else next(err);
//     }
// };

// export const getItems = async (_req, res, next) => {
//     try {
//         const items = await Item.find().sort({ createdAt: -1 });
//         // Prefix image URLs with host for absolute path
//         const host = `${_req.protocol}://${_req.get('host')}`;
//         const withFullUrl = items.map(i => ({
//             ...i.toObject(),
//             imageUrl: i.imageUrl ? host + i.imageUrl : '',
//         }));
//         res.json(withFullUrl);
//     } catch (err) {
//         next(err);
//     }
// };

// export const deleteItem = async (req, res, next) => {
//     try {
//         const removed = await Item.findByIdAndDelete(req.params.id);
//         if (!removed) return res.status(404).json({ message: 'Item not found' });
//         res.status(204).end();
//     } catch (err) {
//         next(err);
//     }
// };
import Item from '../modals/item.js';
import mongoose from "mongoose";




export const createItem = async (req, res, next) => {
    try {
        const { name, description, category, price, rating, hearts, isVeg} = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        // e.g. total might be price * hearts, or some other logic
        const total = Number(price) * 1; // replace with your own formula

        const newItem = new Item({
            name,
            description,
            category,
            price,
            rating,
            hearts,
            imageUrl,
            isVeg,
            total,
        });

        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'Item name already exists' });
        } else next(err);
    }
};

export const getItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    const host = `${req.protocol}://${req.get('host')}`;

    const withFullUrl = items.map(i => {
      let imageUrl = i.imageUrl;

      // Only prepend host if it's a local upload path
      if (imageUrl && imageUrl.startsWith('/uploads')) {
        imageUrl = host + imageUrl;
      }

      return {
        ...i.toObject(),
        imageUrl,
      };
    });

    res.json(withFullUrl);
  } catch (err) {
    next(err);
  }
};


/**
 * Fetches a single item by its unique ID.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
export const getSingleItem = async (req, res, next) => {
  try {
    // Find the item in the database using the ID from the URL parameters
    const item = await Item.findById(req.params.id);

    // If no item is found, return a 404 error
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Construct the full image URL, consistent with the getItems function
    const host = `${req.protocol}://${req.get('host')}`;
    const itemWithFullUrl = {
      ...item.toObject(),
      imageUrl: item.imageUrl ? host + item.imageUrl : '',
    };
    
    // If the item is found, send it back as JSON with a 200 OK status
    res.json(itemWithFullUrl);

  } catch (err) {
    // If there's a server or database error, pass it to the error handler
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
    try {
        const removed = await Item.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ message: 'Item not found' });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

export const getItemsByCategory = async (req, res, next) => {
    try {
        // Find items that match the category name from the URL parameter
        const items = await Item.find({ category: req.params.categoryName });

        // This part is optional but recommended: it adds the full server URL to image paths
        const host = `${req.protocol}://${req.get('host')}`;
        const withFullUrl = items.map(i => ({
            ...i.toObject(),
            imageUrl: i.imageUrl ? host + i.imageUrl : '',
        }));

        res.json(withFullUrl);
    } catch (err) {
        next(err);
    }
};
export const getNotifications = async (req, res) => {
  try {
    console.log("🔍 PARAM RECEIVED:", req.params.userId);
    console.log("🔍 TYPE:", typeof req.params.userId);

    const notifications = await Notification.find({
      userId: req.params.userId,
    });

    console.log("✅ Notifications found:", notifications.length);

    res.json(notifications);

  } catch (error) {
    console.error("🔥 FULL ERROR OBJECT:", error);
    console.error("🔥 ERROR MESSAGE:", error.message);
    res.status(500).json({ error: error.message });
  }
};
