const Listing = require('../models/Listing');

// @desc    Get all listings for logged in org (includes expired)
// @route   GET /api/listings/org/my-listings
// @access  Private/Organization
const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ organization: req.user._id })
      .populate('organization', 'companyName logo isVerified')
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    console.error('getMyListings error:', error.message);
    res.status(500).json({ message: 'Failed to fetch listings' });
  }
};

// @desc    Get all listings (with search & filters)
// @route   GET /api/listings
// @access  Public
const getListings = async (req, res) => {
  try {
    const { type, location, workType, keyword } = req.query;
    let query = { deadline: { $gte: new Date() } }; // Auto expire check

    if (type) query.type = type;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (workType) query.workType = workType;
    
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }

    let listings = await Listing.find(query)
      .populate('organization', 'companyName logo isVerified')
      .sort({ createdAt: -1 });

    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      // Also include listings where organization companyName matches keyword
      const matchCompany = await Listing.find({ deadline: { $gte: new Date() } })
          .populate('organization', 'companyName logo isVerified')
          .sort({ createdAt: -1 });
      
      const companyMatches = matchCompany.filter(l => l.organization?.companyName?.toLowerCase().includes(lowerKeyword));
      
      // merge results ensuring uniqueness
      const listingIds = new Set(listings.map(l => l._id.toString()));
      companyMatches.forEach(l => {
          if (!listingIds.has(l._id.toString())) {
              listings.push(l);
              listingIds.add(l._id.toString());
          }
      });
    }

    res.json(listings);
  } catch (error) {
    console.error('getListings error:', error.message);
    res.status(500).json({ message: 'Failed to fetch listings' });
  }
};

// @desc    Get listing by ID
// @route   GET /api/listings/:id
// @access  Public
const getListingById = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate('organization', 'companyName logo isVerified')
    .populate('applicants', 'name email avatar');

  if (listing) {
    res.json(listing);
  } else {
    res.status(404).json({ message: 'Listing not found' });
  }
};

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private/Organization
const createListing = async (req, res) => {
  const { title, type, location, workType, salary, deadline, description, applyLink } = req.body;

  const listing = new Listing({
    title,
    organization: req.user._id,
    type,
    location,
    workType,
    salary,
    deadline,
    description,
    applyLink
  });

  const createdListing = await listing.save();
  res.status(201).json(createdListing);
};

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private/Organization
const updateListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (listing) {
    if (listing.organization.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this listing' });
    }

    listing.title = req.body.title || listing.title;
    listing.type = req.body.type || listing.type;
    listing.location = req.body.location || listing.location;
    listing.workType = req.body.workType || listing.workType;
    listing.salary = req.body.salary || listing.salary;
    listing.deadline = req.body.deadline || listing.deadline;
    listing.description = req.body.description || listing.description;
    if(req.body.applyLink !== undefined) listing.applyLink = req.body.applyLink;

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } else {
    res.status(404).json({ message: 'Listing not found' });
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private/Organization
const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (listing) {
    if (listing.organization.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this listing' });
    }
    await listing.deleteOne();
    res.json({ message: 'Listing removed' });
  } else {
    res.status(404).json({ message: 'Listing not found' });
  }
};

// @desc    Apply to Listing
// @route   POST /api/listings/:id/apply
// @access  Private/User
const applyListing = async (req, res) => {
  if (req.role !== 'user') return res.status(401).json({ message: 'Only users can apply.' });

  const listing = await Listing.findById(req.params.id);
  
  if (listing) {
    if (listing.applicants.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already applied' });
    }

    listing.applicants.push(req.user._id);
    await listing.save();

    const User = require('../models/User');
    const user = await User.findById(req.user._id);
    user.appliedListings.push(listing._id);
    await user.save();

    res.json({ message: 'Successfully applied' });
  } else {
    res.status(404).json({ message: 'Listing not found' });
  }
};

// @desc    Save/Bookmark Listing
// @route   POST /api/listings/:id/save
// @access  Private/User
const saveListing = async (req, res) => {
    if (req.role !== 'user') return res.status(401).json({ message: 'Only users can save.' });
  
    const listing = await Listing.findById(req.params.id);
    const User = require('../models/User');
    const user = await User.findById(req.user._id);
    
    if (listing && user) {
        if (user.savedListings.includes(listing._id)) {
            user.savedListings = user.savedListings.filter(id => id.toString() !== listing._id.toString());
            await user.save();
            return res.json({ message: 'Unsaved listing', savedListings: user.savedListings });
        }
  
        user.savedListings.push(listing._id);
        await user.save();
        res.json({ message: 'Successfully saved', savedListings: user.savedListings });
    } else {
      res.status(404).json({ message: 'Listing not found' });
    }
  };

module.exports = { getListings, getMyListings, getListingById, createListing, updateListing, deleteListing, applyListing, saveListing };
