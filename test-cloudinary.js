const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({
  cloud_name: 'dmtawirc8', // your cloud name
  api_key: '668871912167762', // your API key
  api_secret: 'XXID9hpgWcAus2_d7NdGvQo0wqg', // your secret
});

const testUpload = async () => {
  try {
    const filePath = path.join(__dirname, 'test.jpg'); // make sure test.jpg exists in this folder
    console.log('Uploading:', filePath);

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'rakshika-evidence',
    });

    console.log('✅ Upload success:', result.secure_url);
  } catch (error) {
    console.error('❌ Upload failed (full error):', error);
  }
};

testUpload();
