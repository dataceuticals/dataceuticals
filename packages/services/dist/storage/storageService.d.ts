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
export declare class StorageService {
    uploadFile(file: File, path: string, options?: UploadOptions): Promise<FileMetadata>;
    getDownloadURL(path: string): Promise<string>;
    deleteFile(path: string): Promise<void>;
    listFiles(directoryPath: string): Promise<string[]>;
    uploadImage(file: File, path: string, options?: {
        maxWidth?: number;
        maxHeight?: number;
        quality?: number;
        metadata?: Record<string, string>;
    }): Promise<FileMetadata>;
    uploadDocument(file: File, path: string, options?: {
        allowedTypes?: string[];
        metadata?: Record<string, string>;
    }): Promise<FileMetadata>;
    generateFilePath(fileName: string, userId: string, category?: string): string;
    formatFileSize(bytes: number): string;
}
export declare const storageService: StorageService;
//# sourceMappingURL=storageService.d.ts.map