const express = require('express');
const { getListings, getMyListings, getListingById, createListing, updateListing, deleteListing, applyListing, saveListing } = require('../controllers/listingController');
const { protect, organization } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/org/my-listings', protect, organization, getMyListings);

router.route('/')
  .get(getListings)
  .post(protect, organization, createListing);

router.route('/:id')
  .get(getListingById)
  .put(protect, organization, updateListing)
  .delete(protect, organization, deleteListing);

router.post('/:id/apply', protect, applyListing); 
router.post('/:id/save', protect, saveListing); 

module.exports = router;
