"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageService = exports.StorageService = void 0;
const storage_1 = require("firebase/storage");
const config_1 = require("../firebase/config");
class StorageService {
    // Upload a file to Firebase Storage
    async uploadFile(file, path, options = {}) {
        try {
            const storageRef = (0, storage_1.ref)(config_1.storage, path);
            const uploadResult = await (0, storage_1.uploadBytes)(storageRef, file, {
                contentType: options.contentType || file.type,
                customMetadata: options.metadata,
            });
            const downloadURL = await (0, storage_1.getDownloadURL)(uploadResult.ref);
            return {
                name: file.name,
                size: file.size,
                contentType: file.type,
                fullPath: uploadResult.ref.fullPath,
                downloadURL,
                uploadedAt: new Date(),
                metadata: options.metadata,
            };
        }
        catch (error) {
            throw new Error(`Upload failed: ${error.message}`);
        }
    }
    // Get download URL for a file
    async getDownloadURL(path) {
        try {
            const storageRef = (0, storage_1.ref)(config_1.storage, path);
            return await (0, storage_1.getDownloadURL)(storageRef);
        }
        catch (error) {
            throw new Error(`Failed to get download URL: ${error.message}`);
        }
    }
    // Delete a file from Firebase Storage
    async deleteFile(path) {
        try {
            const storageRef = (0, storage_1.ref)(config_1.storage, path);
            await (0, storage_1.deleteObject)(storageRef);
        }
        catch (error) {
            throw new Error(`Delete failed: ${error.message}`);
        }
    }
    // List all files in a directory
    async listFiles(directoryPath) {
        try {
            const storageRef = (0, storage_1.ref)(config_1.storage, directoryPath);
            const result = await (0, storage_1.listAll)(storageRef);
            return result.items.map(item => item.fullPath);
        }
        catch (error) {
            throw new Error(`Failed to list files: ${error.message}`);
        }
    }
    // Upload image with automatic compression and optimization
    async uploadImage(file, path, options = {}) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            throw new Error('File must be an image');
        }
        // For now, upload as-is. In production, you might want to add image compression
        return this.uploadFile(file, path, {
            contentType: file.type,
            metadata: options.metadata,
        });
    }
    // Upload document files (PDF, DOC, etc.)
    async uploadDocument(file, path, options = {}) {
        const allowedTypes = options.allowedTypes || [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
        ];
        if (!allowedTypes.includes(file.type)) {
            throw new Error(`File type ${file.type} is not allowed`);
        }
        return this.uploadFile(file, path, {
            contentType: file.type,
            metadata: options.metadata,
        });
    }
    // Generate a unique file path
    generateFilePath(fileName, userId, category = 'uploads') {
        const timestamp = Date.now();
        const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
        return `${category}/${userId}/${timestamp}_${sanitizedFileName}`;
    }
    // Get file size in human readable format
    formatFileSize(bytes) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
exports.StorageService = StorageService;
exports.storageService = new StorageService();
//# sourceMappingURL=storageService.js.map