const { syncUserPhotos } = require('../services/googleDriveService');

exports.syncPhotos = async (req, res) => {
  try {
    const count = await syncUserPhotos(req.user);
    res.status(200).json({ message: `${count} photos synced.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to sync photos' });
  }
};

exports.getPhotos = async (req, res) => {
  const photos = await Photo.find({ userId: req.user._id }).sort({ createdTime: -1 });
  res.json(photos);
};
