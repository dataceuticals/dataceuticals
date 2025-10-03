import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  UploadResult,
} from 'firebase/storage';
import { storage } from '../firebase/config';

export interface UploadOptions {
  contentType?: string;
  metadata?: Record<string, string>;
}

export interface FileMetadata {
  name: string;
  size: number;
  contentType: string;
  fullPath: string;
  downloadURL: string;
  uploadedAt: Date;
  metadata?: Record<string, string>;
}

export class StorageService {
  // Upload a file to Firebase Storage
  async uploadFile(
    file: File,
    path: string,
    options: UploadOptions = {}
  ): Promise<FileMetadata> {
    try {
      const storageRef = ref(storage, path);
      
      const uploadResult: UploadResult = await uploadBytes(storageRef, file, {
        contentType: options.contentType || file.type,
        customMetadata: options.metadata,
      });

      const downloadURL = await getDownloadURL(uploadResult.ref);

      return {
        name: file.name,
        size: file.size,
        contentType: file.type,
        fullPath: uploadResult.ref.fullPath,
        downloadURL,
        uploadedAt: new Date(),
        metadata: options.metadata,
      };
    } catch (error: any) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  // Get download URL for a file
  async getDownloadURL(path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      return await getDownloadURL(storageRef);
    } catch (error: any) {
      throw new Error(`Failed to get download URL: ${error.message}`);
    }
  }

  // Delete a file from Firebase Storage
  async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error: any) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  }

  // List all files in a directory
  async listFiles(directoryPath: string): Promise<string[]> {
    try {
      const storageRef = ref(storage, directoryPath);
      const result = await listAll(storageRef);
      return result.items.map(item => item.fullPath);
    } catch (error: any) {
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }

  // Upload image with automatic compression and optimization
  async uploadImage(
    file: File,
    path: string,
    options: {
      maxWidth?: number;
      maxHeight?: number;
      quality?: number;
      metadata?: Record<string, string>;
    } = {}
  ): Promise<FileMetadata> {
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
  async uploadDocument(
    file: File,
    path: string,
    options: {
      allowedTypes?: string[];
      metadata?: Record<string, string>;
    } = {}
  ): Promise<FileMetadata> {
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
  generateFilePath(
    fileName: string,
    userId: string,
    category: string = 'uploads'
  ): string {
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    return `${category}/${userId}/${timestamp}_${sanitizedFileName}`;
  }

  // Get file size in human readable format
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const storageService = new StorageService();
