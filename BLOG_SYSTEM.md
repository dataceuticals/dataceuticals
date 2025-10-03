# Blog System Documentation

## Overview

The DataCeu Blog System is a comprehensive, low-code/no-code blog publishing platform similar to WordPress, designed for content writers and administrators. It provides a rich text editor, media management, and complete blog administration capabilities.

## Features

### 🎯 Core Features
- **Rich Text Editor**: Powered by TipTap with comprehensive formatting options
- **Media Management**: Upload, organize, and manage images, videos, and documents
- **Role-Based Access Control**: Different permission levels for users, content writers, admins, and owners
- **SEO Optimization**: Built-in SEO fields for titles and descriptions
- **Category & Tag System**: Organize content with categories and tags
- **Draft & Publishing Workflow**: Save drafts and publish when ready

### ✍️ Content Creation
- **Visual Editor**: What-you-see-is-what-you-get (WYSIWYG) editing experience
- **Formatting Tools**: Bold, italic, underline, strikethrough, headings, lists, quotes, code blocks
- **Text Alignment**: Left, center, right, and justify alignment options
- **Media Insertion**: Drag and drop or click to insert images
- **Link Management**: Add and remove hyperlinks easily
- **Undo/Redo**: Full editing history support

### 🖼️ Media Management
- **File Upload**: Support for images, videos, and documents
- **Storage Integration**: Firebase Storage for reliable file hosting
- **File Organization**: Categorize and search through media library
- **Image Optimization**: Automatic image handling and display

### 👥 User Management
- **User Roles**:
  - `user`: Basic access to read published posts
  - `content_writer`: Can create, edit, and manage their own posts
  - `admin`: Full access to all blog features and settings
  - `owner`: Complete control over the blog system

### ⚙️ Blog Settings
- **Site Configuration**: Customize site name, description, and branding
- **Owner Information**: Manage owner details and social media links
- **Blog Preferences**: Configure comment settings and moderation
- **Default Categories**: Set up initial blog categories

## Architecture

### Services Layer
```
packages/services/
├── src/
│   ├── blog/
│   │   └── blogService.ts      # Blog operations
│   ├── auth/
│   │   └── authService.ts      # Authentication
│   ├── database/
│   │   └── databaseService.ts  # Database operations
│   └── storage/
│       └── storageService.ts   # File storage
```

### Frontend Components
```
app/
├── components/
│   ├── BlogEditor.tsx          # Rich text editor
│   └── BlogAdminNav.tsx        # Admin navigation
├── blog/
│   ├── page.tsx                # Blog listing
│   ├── create/
│   │   └── page.tsx            # Create new post
│   ├── [slug]/
│   │   └── page.tsx            # Individual post view
│   ├── media/
│   │   └── page.tsx            # Media library
│   └── settings/
│       └── page.tsx            # Blog settings
```

## Setup Instructions

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Build Services
```bash
pnpm build:services
```

### 3. Start Development Server
```bash
pnpm dev
```

### 4. Access Blog System
- **Public Blog**: `/blog`
- **Create Post**: `/blog/create` (requires content_writer+ role)
- **Media Library**: `/blog/media` (requires content_writer+ role)
- **Settings**: `/blog/settings` (requires admin+ role)

## Usage Guide

### For Content Writers

#### Creating a New Blog Post
1. Navigate to `/blog/create`
2. Fill in the post title and excerpt
3. Use the rich text editor to write your content
4. Add formatting, images, and links as needed
5. Select a category and add relevant tags
6. Upload a featured image (optional)
7. Fill in SEO information
8. Save as draft or publish immediately

#### Using the Rich Text Editor
- **Text Formatting**: Use the toolbar buttons for bold, italic, underline, etc.
- **Headings**: Click H1, H2, or H3 buttons for different heading levels
- **Lists**: Create bulleted or numbered lists
- **Images**: Click the image button to upload and insert images
- **Links**: Select text and use the link button to add URLs
- **Alignment**: Use alignment buttons to position text

#### Managing Media
1. Go to `/blog/media`
2. Upload new files by clicking the upload button
3. View, download, or delete existing files
4. Search and filter files by type

### For Administrators

#### Managing Blog Settings
1. Navigate to `/blog/settings`
2. Update site information and description
3. Configure owner details and social media links
4. Set blog preferences (comments, moderation)
5. Save changes

#### User Management
- Monitor user roles and permissions
- Assign content writer roles to users
- Manage admin access

#### Content Moderation
- Review and approve comments (if enabled)
- Monitor published content
- Manage categories and tags

### For Site Owners

#### Complete Control
- All admin capabilities
- Blog system configuration
- User role management
- Analytics and reporting access

## Database Schema

### Blog Posts
```typescript
interface BlogPost {
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
```

### Media Files
```typescript
interface MediaFile {
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
```

### Blog Settings
```typescript
interface BlogSettings {
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
```

## Security Features

### Authentication
- Firebase Authentication integration
- Role-based access control
- Secure API endpoints

### Data Validation
- Input sanitization
- File type validation
- Size limits enforcement

### Permission System
- Granular role permissions
- Content ownership validation
- Admin-only operations protection

## Customization

### Styling
- Tailwind CSS for consistent design
- Dark/light theme support
- Responsive design for all devices

### Extensions
- Easy to add new TipTap extensions
- Custom media handlers
- Additional blog features

### Integration
- Firebase backend services
- Custom authentication providers
- Third-party media services

## Troubleshooting

### Common Issues

#### Editor Not Loading
- Check if TipTap dependencies are installed
- Verify browser console for errors
- Ensure proper import statements

#### Media Upload Fails
- Check Firebase Storage configuration
- Verify file size limits
- Check network connectivity

#### Permission Errors
- Verify user role assignments
- Check authentication state
- Ensure proper route protection

### Performance Tips
- Optimize images before upload
- Use appropriate image formats
- Implement lazy loading for media
- Cache frequently accessed content

## Future Enhancements

### Planned Features
- **Comments System**: User comments and moderation
- **Analytics Dashboard**: Post performance metrics
- **SEO Tools**: Advanced SEO optimization
- **Social Sharing**: Integrated social media sharing
- **Email Newsletters**: Subscriber management
- **Multi-language Support**: Internationalization
- **Advanced Media Library**: Better organization and search
- **Content Scheduling**: Publish posts at specific times

### API Extensions
- RESTful API for external integrations
- Webhook support for automation
- Third-party service integrations

## Support

For technical support or feature requests:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed information
4. Contact the development team

## License

This blog system is part of the DataCeu project and follows the same licensing terms.
