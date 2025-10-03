import { 
  BlogPost, 
  BlogCategory, 
  BlogTag, 
  MediaFile, 
  BlogSettings, 
  CreateBlogPostData, 
  UpdateBlogPostData, 
  BlogFilters 
} from '../types/blog';
import { User } from '../types/auth';
import { databaseService } from '../database/databaseService';
import { storageService } from '../storage/storageService';
import { where } from 'firebase/firestore';

class BlogService {
  private readonly BLOG_COLLECTION = 'blog_posts';
  private readonly CATEGORIES_COLLECTION = 'blog_categories';
  private readonly TAGS_COLLECTION = 'blog_tags';
  private readonly MEDIA_COLLECTION = 'media_files';
  private readonly SETTINGS_COLLECTION = 'blog_settings';

  // Blog Posts
  async createPost(data: CreateBlogPostData, author: User): Promise<BlogPost> {
    const slug = this.generateSlug(data.title);
    const readTime = this.calculateReadTime(data.content);
    
    const post: Omit<BlogPost, 'id'> = {
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

    const docId = await databaseService.create(this.BLOG_COLLECTION, post);
    return { id: docId, ...post };
  }

  async updatePost(id: string, data: UpdateBlogPostData): Promise<BlogPost> {
    const updateData: any = {
      ...data,
      updatedAt: new Date(),
    };

    if (data.content) {
      updateData.readTime = this.calculateReadTime(data.content);
    }

    await databaseService.update(this.BLOG_COLLECTION, id, updateData);
    const updatedPost = await this.getPost(id);
    if (!updatedPost) throw new Error('Post not found after update');
    return updatedPost;
  }

  async getPost(id: string): Promise<BlogPost | null> {
    const post = await databaseService.getById(this.BLOG_COLLECTION, id);
    return post as BlogPost | null;
  }

  async getPosts(filters?: BlogFilters): Promise<BlogPost[]> {
    let constraints = [];
    
    if (filters?.status) {
      constraints.push(where('status', '==', filters.status));
    }
    if (filters?.category) {
      constraints.push(where('category', '==', filters.category));
    }
    if (filters?.author) {
      constraints.push(where('author.uid', '==', filters.author));
    }
    
    const posts = await databaseService.query(this.BLOG_COLLECTION, constraints);
    return posts as BlogPost[];
  }

  async deletePost(id: string): Promise<void> {
    await databaseService.delete(this.BLOG_COLLECTION, id);
  }

  // Utility methods
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}
