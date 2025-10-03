export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage?: string;
    author: {
        uid: string;
        displayName: string;
        photoURL?: string;
    };
    status: 'draft' | 'published' | 'archived';
    tags: string[];
    category: string;
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    seoTitle?: string;
    seoDescription?: string;
    readTime: number;
    viewCount: number;
}
export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    color?: string;
    createdAt: Date;
}
export interface BlogTag {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
}
export interface MediaFile {
    id: string;
    name: string;
    url: string;
    type: 'image' | 'video' | 'document';
    size: number;
    uploadedBy: string;
    uploadedAt: Date;
    altText?: string;
    caption?: string;
}
export interface BlogSettings {
    siteName: string;
    siteDescription: string;
    ownerInfo: {
        name: string;
        email: string;
        bio?: string;
        photoURL?: string;
        socialLinks?: {
            twitter?: string;
            linkedin?: string;
            github?: string;
        };
    };
    defaultCategory: string;
    allowComments: boolean;
    moderationRequired: boolean;
}
export interface CreateBlogPostData {
    title: string;
    content: string;
    excerpt: string;
    category: string;
    tags: string[];
    featuredImage?: string;
    seoTitle?: string;
    seoDescription?: string;
}
export interface UpdateBlogPostData extends Partial<CreateBlogPostData> {
    status?: 'draft' | 'published' | 'archived';
}
export interface BlogFilters {
    category?: string;
    tags?: string[];
    status?: 'draft' | 'published' | 'archived';
    author?: string;
    search?: string;
    page?: number;
    limit?: number;
}
//# sourceMappingURL=blog.d.ts.map