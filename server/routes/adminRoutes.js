const express = require('express');
const { getUsers, getOrgs, approveOrg, verifyOrg, deleteEntity, getAdmins, createAdmin, deleteAdmin, toggleBlock, resetPassword } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect, admin);

router.get('/admins', getAdmins);
router.post('/admins', createAdmin);
router.delete('/admins/:id', deleteAdmin);

router.get('/users', getUsers);
router.get('/orgs', getOrgs);
router.put('/orgs/:id/approve', approveOrg);
router.put('/orgs/:id/verify', verifyOrg);
router.put('/entity/:type/:id/block', toggleBlock);
router.put('/entity/:type/:id/reset-password', resetPassword);
router.delete('/entity/:type/:id', deleteEntity);

module.exports = router;
