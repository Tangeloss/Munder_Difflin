// adminController.js

const adminController = {
    uploadFile: async (req, res) => {
        try {
            // Code to handle file upload
            res.status(200).json({ message: 'File uploaded successfully' });
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = adminController;
