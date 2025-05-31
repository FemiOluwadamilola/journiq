const { google } = require('googleapis');
const Photo = require('../models/photoModel');

const getDriveClient = (accessToken) => {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return google.drive({ version: 'v3', auth });
};

async function syncUserPhotos(user) {
  const drive = getDriveClient(user.accessToken);

  const res = await drive.files.list({
    q: "mimeType contains 'image/' and trashed = false",
    fields: 'files(id, name, mimeType, createdTime, thumbnailLink, webViewLink)',
    pageSize: 50,
  });

  const files = res.data.files || [];

  for (const file of files) {
    await Photo.updateOne(
      { userId: user._id, fileId: file.id },
      {
        userId: user._id,
        fileId: file.id,
        name: file.name,
        mimeType: file.mimeType,
        createdTime: file.createdTime,
        thumbnailLink: file.thumbnailLink,
        webViewLink: file.webViewLink,
      },
      { upsert: true }
    );
  }

  return files.length;
}

module.exports = { syncUserPhotos };
