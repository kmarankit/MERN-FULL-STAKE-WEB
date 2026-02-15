// import Item from '../models/item.js'; // Ensure this path to your Mongoose model is correct

// /**
//  * Fetches a single item by its unique ID.
//  * @param {object} req - The Express request object.
//  * @param {object} res - The Express response object.
//  * @param {function} next - The next middleware function.
//  */
// export const getSingleItem = async (req, res, next) => {
//   try {
//     // Find the item in the database using the ID from the URL parameters
//     const item = await Item.findById(req.params.id);

//     // If no item is found with the provided ID, return a 404 Not Found error
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     // Construct the absolute URL for the image to ensure it displays correctly on the client-side
//     const host = `${req.protocol}://${req.get('host')}`;
//     const itemWithFullUrl = {
//       ...item.toObject(), // Convert the Mongoose document to a plain JavaScript object
//       imageUrl: item.imageUrl ? host + item.imageUrl : '',
//     };

//     // If the item is found, send it back as JSON with a 200 OK status
//     res.json(itemWithFullUrl);

//   } catch (err) {
//     // If any other server-side error occurs (e.g., database connection issue),
//     // pass it to the Express error handling middleware.
//     console.error("Error fetching single item:", err);
//     next(err);
//   }
// };

