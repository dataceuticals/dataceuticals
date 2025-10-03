"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseService_1 = require("../database/databaseService");
const firestore_1 = require("firebase/firestore");
class BlogService {
    constructor() {
        this.BLOG_COLLECTION = 'blog_posts';
        this.CATEGORIES_COLLECTION = 'blog_categories';
        this.TAGS_COLLECTION = 'blog_tags';
        this.MEDIA_COLLECTION = 'media_files';
        this.SETTINGS_COLLECTION = 'blog_settings';
    }
    // Blog Posts
    async createPost(data, author) {
        const slug = this.generateSlug(data.title);
        const readTime = this.calculateReadTime(data.content);
        const post = {
            title: data.title,
            slug,
            content: data.content,
            excerpt: data.excerpt,
            featuredImage: data.featuredImage,
            author: {
                uid: author.uid,
                displayName: author.displayName || 'Anonymous',
                photoURL: author.photoURL || undefined,
            },
            status: 'draft',
            tags: data.tags,
            category: data.category,
            createdAt: new Date(),
            updatedAt: new Date(),
            seoTitle: data.seoTitle || data.title,
            seoDescription: data.seoDescription || data.excerpt,
            readTime,
            viewCount: 0,
        };
        const docId = await databaseService_1.databaseService.create(this.BLOG_COLLECTION, post);
        return { id: docId, ...post };
    }
    async updatePost(id, data) {
        const updateData = {
            ...data,
            updatedAt: new Date(),
        };
        if (data.content) {
            updateData.readTime = this.calculateReadTime(data.content);
        }
        await databaseService_1.databaseService.update(this.BLOG_COLLECTION, id, updateData);
        const updatedPost = await this.getPost(id);
        if (!updatedPost)
            throw new Error('Post not found after update');
        return updatedPost;
    }
    async getPost(id) {
        const post = await databaseService_1.databaseService.getById(this.BLOG_COLLECTION, id);
        return post;
    }
    async getPosts(filters) {
        let constraints = [];
        if (filters?.status) {
            constraints.push((0, firestore_1.where)('status', '==', filters.status));
        }
        if (filters?.category) {
            constraints.push((0, firestore_1.where)('category', '==', filters.category));
        }
        if (filters?.author) {
            constraints.push((0, firestore_1.where)('author.uid', '==', filters.author));
        }
        const posts = await databaseService_1.databaseService.query(this.BLOG_COLLECTION, constraints);
        return posts;
    }
    async deletePost(id) {
        await databaseService_1.databaseService.delete(this.BLOG_COLLECTION, id);
    }
    // Utility methods
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
    calculateReadTime(content) {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    }
}
//# sourceMappingURL=blogService.js.map