import api from './api';

export default {
  /**
   * Get pre-signed URL for file upload
   * @param {Object} fileInfo - Information about the file to upload
   * @returns {Promise} - Response with upload URL
   */
  getUploadUrl(fileInfo) {
    return api.post('/files/upload-url', fileInfo);
  },

  /**
   * Upload a file directly to S3 using pre-signed URL
   * @param {string} presignedUrl - Pre-signed URL for upload
   * @param {File} file - File to upload
   * @param {string} contentType - Content type of the file
   * @returns {Promise} - Response
   */
  uploadToS3(presignedUrl, file, contentType) {
    return fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType
      },
      body: file
    });
  },

  /**
   * Complete the file upload process
   * @param {Object} fileData - Data about the uploaded file
   * @returns {Promise} - Response with file data
   */
  completeUpload(fileData) {
    return api.post('/files/complete', fileData);
  },

  /**
   * Get files for a specific form submission
   * @param {string} submissionId - Submission ID
   * @returns {Promise} - Response with files
   */
  getSubmissionFiles(submissionId) {
    return api.get(`/submissions/${submissionId}/files`);
  },

  /**
   * Get a download URL for a file
   * @param {string} fileId - File ID
   * @returns {Promise} - Response with download URL
   */
  getDownloadUrl(fileId) {
    return api.get(`/files/${fileId}/download-url`);
  },

  /**
   * Delete a file
   * @param {string} fileId - File ID
   * @returns {Promise} - Response
   */
  deleteFile(fileId) {
    return api.delete(`/files/${fileId}`);
  }
};