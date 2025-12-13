/**
 * Strapi API Integration Service
 * 
 * This file contains all the functions to interact with Strapi.io backend.
 * Configure your Strapi URL in the STRAPI_URL constant below.
 */

// Strapi configuration from environment variables
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://strapi.vietpride.online';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || '';

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
  };
}

interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
  avatar?: string;
  bio?: string;
  confirmed: boolean;
  blocked: boolean;
}

interface AuthResponse {
  jwt: string;
  user: User;
}

/**
 * Base fetch function for Strapi API
 */
async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error: StrapiError = await response.json();
      throw new Error(error.error.message || 'Strapi API Error');
    }

    return await response.json();
  } catch (error) {
    console.error('Strapi API Error:', error);
    throw error;
  }
}

// ============================================================================
// Member Tiers
// ============================================================================

export interface MemberTier {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    color: string;
    icon?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    permissions?: Record<string, boolean>;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export async function getMemberTiers(): Promise<MemberTier[]> {
  const response = await fetchStrapi<StrapiResponse<MemberTier[]>>(
    '/member-tiers?sort=order:asc&populate=icon'
  );
  return response.data;
}

export async function getMemberTierBySlug(slug: string): Promise<MemberTier | null> {
  const response = await fetchStrapi<StrapiResponse<MemberTier[]>>(
    `/member-tiers?filters[slug][$eq]=${slug}&populate=icon`
  );
  return response.data[0] || null;
}

// ============================================================================
// Servers
// ============================================================================

export interface Server {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    image?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    status: 'Active' | 'Inactive' | 'Archived';
    joinedDate?: string;
    leftDate?: string;
    memberCount?: number;
    achievements?: string;
    order: number;
    createdAt: string;
    updatedAt: string;
  };
}

export async function getServers(): Promise<Server[]> {
  const response = await fetchStrapi<StrapiResponse<Server[]>>(
    '/servers?sort=order:asc&populate=image'
  );
  return response.data;
}

export async function getServerBySlug(slug: string): Promise<Server | null> {
  const response = await fetchStrapi<StrapiResponse<Server[]>>(
    `/servers?filters[slug][$eq]=${slug}&populate=image`
  );
  return response.data[0] || null;
}

// ============================================================================
// Members
// ============================================================================

export interface Member {
  id: number;
  attributes: {
    username: string;
    displayName: string;
    email?: string;
    avatar?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    tier?: {
      data: MemberTier;
    };
    joinDate: string;
    status: 'Active' | 'Inactive' | 'Suspended' | 'Left';
    servers?: {
      data: Server[];
    };
    bio?: string;
    role?: string;
    contributions?: number;
    joinedAt: string;
    lastActive?: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export async function getMembers(): Promise<Member[]> {
  const response = await fetchStrapi<StrapiResponse<Member[]>>(
    '/members?populate=avatar,tier,servers&sort=joinDate:desc'
  );
  return response.data;
}

export async function getMemberByUsername(username: string): Promise<Member | null> {
  const response = await fetchStrapi<StrapiResponse<Member[]>>(
    `/members?filters[username][$eq]=${username}&populate=avatar,tier,servers`
  );
  return response.data[0] || null;
}

// ============================================================================
// Categories
// ============================================================================

export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    color?: string;
    order: number;
    createdAt: string;
    updatedAt: string;
  };
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetchStrapi<StrapiResponse<Category[]>>(
    '/categories?sort=order:asc'
  );
  return response.data;
}

// ============================================================================
// Posts
// ============================================================================

export interface Post {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    author?: {
      data: Member;
    };
    category?: {
      data: Category;
    };
    server?: {
      data: Server;
    };
    thumbnail?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    images?: {
      data: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
    tags?: string[];
    publishedAt?: string;
    status: 'Draft' | 'Published' | 'Archived';
    views?: number;
    likes?: number;
    isFeatured: boolean;
    seoDescription?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export async function getPosts(params?: {
  serverId?: number;
  categoryId?: number;
  limit?: number;
}): Promise<Post[]> {
  let query = '/posts?populate=author,category,server,thumbnail,images&sort=publishedAt:desc';
  
  if (params?.serverId) {
    query += `&filters[server][id][$eq]=${params.serverId}`;
  }
  
  if (params?.categoryId) {
    query += `&filters[category][id][$eq]=${params.categoryId}`;
  }
  
  if (params?.limit) {
    query += `&pagination[limit]=${params.limit}`;
  }

  const response = await fetchStrapi<StrapiResponse<Post[]>>(query);
  return response.data;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const response = await fetchStrapi<StrapiResponse<Post[]>>(
    `/posts?filters[slug][$eq]=${slug}&populate=author,category,server,thumbnail,images`
  );
  return response.data[0] || null;
}

export async function getFeaturedPosts(limit: number = 3): Promise<Post[]> {
  const response = await fetchStrapi<StrapiResponse<Post[]>>(
    `/posts?filters[isFeatured][$eq]=true&populate=author,category,server,thumbnail&sort=publishedAt:desc&pagination[limit]=${limit}`
  );
  return response.data;
}

// ============================================================================
// Events
// ============================================================================

export interface Event {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    server?: {
      data: Server;
    };
    organizer?: {
      data: Member;
    };
    startDate: string;
    endDate?: string;
    location?: string;
    image?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    banner?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    participants?: {
      data: Member[];
    };
    maxParticipants?: number;
    status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
    type?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
    rewards?: string;
    rules?: string;
    registrationDeadline?: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export async function getEvents(params?: {
  serverId?: number;
  status?: string;
  limit?: number;
}): Promise<Event[]> {
  let query = '/events?populate=server,organizer,image,banner,participants&sort=startDate:desc';
  
  if (params?.serverId) {
    query += `&filters[server][id][$eq]=${params.serverId}`;
  }
  
  if (params?.status) {
    query += `&filters[status][$eq]=${params.status}`;
  }
  
  if (params?.limit) {
    query += `&pagination[limit]=${params.limit}`;
  }

  const response = await fetchStrapi<StrapiResponse<Event[]>>(query);
  return response.data;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const response = await fetchStrapi<StrapiResponse<Event[]>>(
    `/events?filters[slug][$eq]=${slug}&populate=server,organizer,image,banner,participants`
  );
  return response.data[0] || null;
}

export async function getUpcomingEvents(limit: number = 5): Promise<Event[]> {
  const response = await fetchStrapi<StrapiResponse<Event[]>>(
    `/events?filters[status][$eq]=Upcoming&populate=server,organizer,image&sort=startDate:asc&pagination[limit]=${limit}`
  );
  return response.data;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get full URL for Strapi media
 */
export function getStrapiMediaUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Format date from Strapi
 */
export function formatStrapiDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ============================================================================
// Authentication
// ============================================================================

/**
 * Register a new user
 */
export async function register(
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const url = `${STRAPI_URL}/api/auth/local/register`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error: StrapiError = await response.json();
      throw new Error(error.error.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

/**
 * Login user
 */
export async function login(
  identifier: string,
  password: string
): Promise<AuthResponse> {
  const url = `${STRAPI_URL}/api/auth/local`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier, // Can be email or username
        password,
      }),
    });

    if (!response.ok) {
      const error: StrapiError = await response.json();
      throw new Error(error.error.message || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Get current user profile
 */
export async function getMe(jwt: string): Promise<User> {
  const url = `${STRAPI_URL}/api/users/me`;
  
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return await response.json();
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  jwt: string,
  userId: number,
  data: Partial<User>
): Promise<User> {
  const url = `${STRAPI_URL}/api/users/${userId}`;
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: StrapiError = await response.json();
      throw new Error(error.error.message || 'Update failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
}
