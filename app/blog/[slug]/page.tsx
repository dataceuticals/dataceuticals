'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { blogService, BlogPost } from '../../../packages/services';
import { Calendar, Clock, User, Eye, Tag } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      loadPost(params.slug as string);
    }
  }, [params.slug]);

  const loadPost = async (slug: string) => {
    try {
      const postData = await blogService.getPostBySlug(slug);
      if (postData) {
        setPost(postData);
        // Increment view count
        await blogService.incrementViewCount(postData.id);
      } else {
        setError('Post not found');
      }
    } catch (error) {
      console.error('Failed to load post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.author.displayName}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime} min read
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              {post.viewCount} views
            </div>
          </div>

          {/* Category and Tags */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              {post.category}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                <Tag className="w-3 h-3 inline mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:dark:text-white prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-strong:text-gray-900 prose-strong:dark:text-white prose-a:text-blue-600 prose-a:dark:text-blue-400">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Post Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {post.author.photoURL && (
                <img
                  src={post.author.photoURL}
                  alt={post.author.displayName}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {post.author.displayName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Author
                </p>
              </div>
            </div>
            
            <div className="text-right text-sm text-gray-600 dark:text-gray-400">
              <p>Last updated: {new Date(post.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
