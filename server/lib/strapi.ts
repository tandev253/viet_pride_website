/**
 * Strapi API Service
 * Proxy service to call Strapi backend from tRPC procedures
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://strapi.vietpride.online';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

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
    serverStatus: 'Active' | 'Inactive' | 'Archived';
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

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const response = await fetchStrapi<StrapiResponse<Category[]>>(
    `/categories?filters[slug][$eq]=${slug}`
  );
  return response.data[0] || null;
}

// ============================================================================
// Users (Members)
// ============================================================================

export interface User {
  id: number;
  username: string;
  email: string;
  provider?: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  displayName?: string;
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
  joinDate?: string;
  memberStatus?: 'Active' | 'Inactive' | 'Suspended' | 'Left';
  servers?: {
    data: Server[];
  };
  bio?: string;
  contributions?: number;
  joinedAt?: string;
  lastActive?: string;
  isVerified?: boolean;
}

export async function getUsers(): Promise<User[]> {
  const response = await fetchStrapi<User[]>(
    '/users?populate=avatar,tier,servers'
  );
  return response;
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const user = await fetchStrapi<User>(
      `/users/${id}?populate=avatar,tier,servers`
    );
    return user;
  } catch (error) {
    return null;
  }
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
      data: {
        id: number;
        attributes: {
          username: string;
          displayName?: string;
        };
      };
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
    postStatus: 'Draft' | 'Published' | 'Archived';
    views: number;
    likes: number;
    isFeatured: boolean;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export async function getPosts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  server?: string;
  featured?: boolean;
}): Promise<StrapiResponse<Post[]>> {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('pagination[page]', params.page.toString());
  if (params?.pageSize) queryParams.append('pagination[pageSize]', params.pageSize.toString());
  if (params?.category) queryParams.append('filters[category][slug][$eq]', params.category);
  if (params?.server) queryParams.append('filters[server][slug][$eq]', params.server);
  if (params?.featured) queryParams.append('filters[isFeatured][$eq]', 'true');
  
  queryParams.append('populate', 'author,category,server,thumbnail,images');
  queryParams.append('sort', 'createdAt:desc');
  
  const response = await fetchStrapi<StrapiResponse<Post[]>>(
    `/posts?${queryParams.toString()}`
  );
  return response;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const response = await fetchStrapi<StrapiResponse<Post[]>>(
    `/posts?filters[slug][$eq]=${slug}&populate=author,category,server,thumbnail,images`
  );
  return response.data[0] || null;
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
      data: {
        id: number;
        attributes: {
          username: string;
          displayName?: string;
        };
      };
    };
    startDate: string;
    endDate: string;
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
      data: Array<{
        id: number;
        attributes: {
          username: string;
          displayName?: string;
        };
      }>;
    };
    maxParticipants?: number;
    eventStatus: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
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
  page?: number;
  pageSize?: number;
  status?: string;
  server?: string;
  upcoming?: boolean;
}): Promise<StrapiResponse<Event[]>> {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('pagination[page]', params.page.toString());
  if (params?.pageSize) queryParams.append('pagination[pageSize]', params.pageSize.toString());
  if (params?.status) queryParams.append('filters[eventStatus][$eq]', params.status);
  if (params?.server) queryParams.append('filters[server][slug][$eq]', params.server);
  if (params?.upcoming) {
    queryParams.append('filters[startDate][$gte]', new Date().toISOString());
  }
  
  queryParams.append('populate', 'server,organizer,image,banner,participants');
  queryParams.append('sort', 'startDate:asc');
  
  const response = await fetchStrapi<StrapiResponse<Event[]>>(
    `/events?${queryParams.toString()}`
  );
  return response;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const response = await fetchStrapi<StrapiResponse<Event[]>>(
    `/events?filters[slug][$eq]=${slug}&populate=server,organizer,image,banner,participants`
  );
  return response.data[0] || null;
}

// ============================================================================
// Authentication
// ============================================================================

export interface AuthResponse {
  jwt: string;
  user: User;
}

export async function login(identifier: string, password: string): Promise<AuthResponse> {
  const response = await fetchStrapi<AuthResponse>(
    '/auth/local',
    {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    }
  );
  return response;
}

export async function register(
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetchStrapi<AuthResponse>(
    '/auth/local/register',
    {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }
  );
  return response;
}

export async function getMe(jwt: string): Promise<User> {
  const response = await fetchStrapi<User>(
    '/users/me?populate=avatar,tier,servers',
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
}
