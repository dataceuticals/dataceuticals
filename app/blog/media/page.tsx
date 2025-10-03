'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { blogService, MediaFile } from '../../../packages/services';

export default function MediaPage() {
  const { user } = useAuth();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadMediaFiles();
  }, [user]);

  const loadMediaFiles = async () => {
    try {
      const files = await blogService.getMediaFiles(user?.uid);
      setMediaFiles(files);
    } catch (error) {
      console.error('Failed to load media files:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">Please log in</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Media Library</h1>
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaFiles.map((file) => (
              <div key={file.id} className="bg-white dark:bg-gray-800 rounded-lg border p-4">
                <h3 className="font-medium mb-2">{file.name}</h3>
                <p className="text-sm text-gray-500">{file.type}</p>
                <p className="text-sm text-gray-500">{file.size} bytes</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
