#!/usr/bin/env node

/**
 * Script to import sample data into Strapi
 * Usage: node import-sample-data.mjs
 */

const STRAPI_URL = 'http://strapi.vietpride.online';
const STRAPI_API_TOKEN = '437834b5d6e4f8e734888cf475e3a41c6d32fc27d68e8e0cb79d64d3716af896ac21ecb84fabf5de5644ce3510e8474dc7e14af7be4060e72d540a25b51aa1b53eddd618bbf0575ab5328260f063cc1303c05cc577463bb5e4f1eb139cb1f3c3dfe96b7e72b91db5e121ec82126ebf59644dedf290e83f66985d7f8e915b089b';

// Helper function to make API requests
async function apiRequest(endpoint, method = 'GET', data = null) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
  };

  if (data) {
    options.body = JSON.stringify({ data });
  }

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Error at ${endpoint}:`, error.message);
    throw error;
  }
}

// Sample data
const sampleData = {
  memberTiers: [
    {
      name: 'Admin',
      slug: 'admin',
      description: 'Quản trị viên cao nhất của bang hội',
      color: '#FFD700',
      order: 1,
      isActive: true,
    },
    {
      name: 'Quản Lý Gia Tộc',
      slug: 'quan-ly-gia-toc',
      description: 'Quản lý các hoạt động gia tộc',
      color: '#FF6B35',
      order: 2,
      isActive: true,
    },
    {
      name: 'Quản Lý Doanh Nghiệp',
      slug: 'quan-ly-doanh-nghiep',
      description: 'Quản lý các doanh nghiệp của bang',
      color: '#00F0FF',
      order: 3,
      isActive: true,
    },
    {
      name: 'VP Team',
      slug: 'vp-team',
      description: 'Thành viên chính thức của đội ngũ',
      color: '#DC143C',
      order: 4,
      isActive: true,
    },
    {
      name: 'Việt Pride',
      slug: 'viet-pride',
      description: 'Thành viên cơ bản',
      color: '#FFFFFF',
      order: 5,
      isActive: true,
    },
  ],

  servers: [
    {
      name: 'VietNam RolePlay',
      slug: 'vietnam-roleplay',
      description: 'Máy chủ roleplay chính của Việt Pride',
      serverStatus: 'Active',
      joinedDate: '2020-01-15',
      memberCount: 45,
      achievements: '🏆 Top 1 Gang War 2022\n🎖️ 500+ Heists Completed\n⭐ Community Leader Award',
      order: 1,
    },
    {
      name: 'Los Santos Life',
      slug: 'los-santos-life',
      description: 'Máy chủ roleplay phụ',
      serverStatus: 'Active',
      joinedDate: '2021-06-20',
      memberCount: 32,
      achievements: '🏁 15 Racing Championships\n💰 $100M+ Earned',
      order: 2,
    },
    {
      name: 'GTA V Online Vietnam',
      slug: 'gta-v-online-vietnam',
      description: 'Máy chủ cộng đồng Việt Nam',
      serverStatus: 'Active',
      joinedDate: '2022-03-10',
      memberCount: 28,
      achievements: '🎯 50+ Events Organized\n👥 Growing Community',
      order: 3,
    },
  ],

  categories: [
    {
      name: 'Tin Tức',
      slug: 'tin-tuc',
      description: 'Tin tức và thông báo mới nhất',
      icon: '📰',
      color: '#DC143C',
      order: 1,
    },
    {
      name: 'Hướng Dẫn',
      slug: 'huong-dan',
      description: 'Hướng dẫn chơi game và hoạt động',
      icon: '📚',
      color: '#00F0FF',
      order: 2,
    },
    {
      name: 'Sự Kiện',
      slug: 'su-kien',
      description: 'Thông tin về các sự kiện',
      icon: '🎉',
      color: '#FFD700',
      order: 3,
    },
    {
      name: 'Thành Tích',
      slug: 'thanh-tich',
      description: 'Các thành tích của bang hội',
      icon: '🏆',
      color: '#FF6B35',
      order: 4,
    },
  ],
};

// Import functions
async function importMemberTiers() {
  console.log('\n📊 Importing Member Tiers...');
  const imported = [];
  
  for (const tier of sampleData.memberTiers) {
    try {
      const result = await apiRequest('/member-tiers', 'POST', tier);
      console.log(`✅ Created: ${tier.name}`);
      imported.push(result.data);
    } catch (error) {
      console.log(`⚠️  Skipped: ${tier.name} (may already exist)`);
    }
  }
  
  return imported;
}

async function importServers() {
  console.log('\n🖥️  Importing Servers...');
  const imported = [];
  
  for (const server of sampleData.servers) {
    try {
      const result = await apiRequest('/servers', 'POST', server);
      console.log(`✅ Created: ${server.name}`);
      imported.push(result.data);
    } catch (error) {
      console.log(`⚠️  Skipped: ${server.name} (may already exist)`);
    }
  }
  
  return imported;
}

async function importCategories() {
  console.log('\n📁 Importing Categories...');
  const imported = [];
  
  for (const category of sampleData.categories) {
    try {
      const result = await apiRequest('/categories', 'POST', category);
      console.log(`✅ Created: ${category.name}`);
      imported.push(result.data);
    } catch (error) {
      console.log(`⚠️  Skipped: ${category.name} (may already exist)`);
    }
  }
  
  return imported;
}

async function importUsers(memberTiers, servers) {
  console.log('\n👥 Importing Users...');
  
  // Note: User creation requires admin JWT, not API token
  // We'll create users with register endpoint
  
  const users = [
    {
      username: 'vietpride_admin',
      email: 'admin@vietpride.com',
      password: 'Admin123!@#',
      displayName: 'Viet Pride Boss',
      tier: memberTiers.find(t => t.attributes.slug === 'admin')?.id,
      joinDate: '2020-01-15',
      memberStatus: 'Active',
      bio: 'Gang leader and founder of Viet Pride',
      contributions: 1000,
      isVerified: true,
    },
    {
      username: 'vp_manager',
      email: 'manager@vietpride.com',
      password: 'Manager123!@#',
      displayName: 'VP Manager',
      tier: memberTiers.find(t => t.attributes.slug === 'quan-ly-gia-toc')?.id,
      joinDate: '2020-03-20',
      memberStatus: 'Active',
      bio: 'Family operations manager',
      contributions: 750,
      isVerified: true,
    },
    {
      username: 'vp_member',
      email: 'member@vietpride.com',
      password: 'Member123!@#',
      displayName: 'VP Member',
      tier: memberTiers.find(t => t.attributes.slug === 'viet-pride')?.id,
      joinDate: '2021-06-15',
      memberStatus: 'Active',
      bio: 'Active gang member',
      contributions: 250,
      isVerified: true,
    },
  ];

  const imported = [];
  
  for (const user of users) {
    try {
      // Register user
      const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log(`✅ Created user: ${user.username}`);
      
      // Update user with additional fields
      try {
        await fetch(`${STRAPI_URL}/api/users/${result.user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${result.jwt}`,
          },
          body: JSON.stringify({
            displayName: user.displayName,
            tier: user.tier,
            joinDate: user.joinDate,
            memberStatus: user.memberStatus,
            bio: user.bio,
            contributions: user.contributions,
            isVerified: user.isVerified,
          }),
        });
        console.log(`✅ Updated user profile: ${user.username}`);
      } catch (error) {
        console.log(`⚠️  Could not update profile for: ${user.username}`);
      }
      
      imported.push(result.user);
    } catch (error) {
      console.log(`⚠️  Skipped: ${user.username} (may already exist)`);
    }
  }
  
  return imported;
}

async function importPosts(users, categories, servers) {
  console.log('\n📝 Importing Posts...');
  
  const posts = [
    {
      title: 'Chào Mừng Đến Với Viet Pride',
      slug: 'chao-mung-den-voi-viet-pride',
      content: `# Chào Mừng Đến Với Viet Pride

Viet Pride là một trong những bang hội mạnh nhất trong cộng đồng GTA V Online Việt Nam. Chúng tôi tự hào với:

- 🏆 Hơn 4 năm hoạt động liên tục
- 👥 100+ thành viên trên 10+ servers
- 💰 $500M+ kiếm được từ heists
- 🎯 500+ sự kiện đã tổ chức

Hãy tham gia cùng chúng tôi!`,
      excerpt: 'Giới thiệu về bang hội Viet Pride - một trong những bang hội mạnh nhất GTA V Online VN',
      author: users[0]?.id,
      category: categories.find(c => c.attributes.slug === 'tin-tuc')?.id,
      server: servers[0]?.id,
      postStatus: 'Published',
      views: 1250,
      likes: 89,
      isFeatured: true,
    },
    {
      title: 'Hướng Dẫn Hoàn Thành Heist Hiệu Quả',
      slug: 'huong-dan-hoan-thanh-heist-hieu-qua',
      content: `# Hướng Dẫn Hoàn Thành Heist Hiệu Quả

## Chuẩn Bị
1. Tập hợp đội ngũ 4 người
2. Chuẩn bị vũ khí và giáp
3. Lên kế hoạch chi tiết

## Thực Hiện
- Phân công vai trò rõ ràng
- Giao tiếp liên tục qua voice chat
- Hỗ trợ đồng đội khi cần

## Mẹo Hay
💡 Luôn có 1 người làm driver
💡 Mang theo snacks và armor
💡 Tránh đấu súng không cần thiết`,
      excerpt: 'Mẹo và chiến thuật để hoàn thành heist một cách hiệu quả nhất',
      author: users[1]?.id,
      category: categories.find(c => c.attributes.slug === 'huong-dan')?.id,
      server: servers[0]?.id,
      postStatus: 'Published',
      views: 856,
      likes: 67,
      isFeatured: false,
    },
  ];

  const imported = [];
  
  for (const post of posts) {
    try {
      const result = await apiRequest('/posts', 'POST', post);
      console.log(`✅ Created: ${post.title}`);
      imported.push(result.data);
    } catch (error) {
      console.log(`⚠️  Skipped: ${post.title} (may already exist)`);
    }
  }
  
  return imported;
}

async function importEvents(users, servers) {
  console.log('\n🎉 Importing Events...');
  
  const events = [
    {
      title: 'Gang War Championship 2024',
      slug: 'gang-war-championship-2024',
      description: `# Gang War Championship 2024

Giải đấu Gang War lớn nhất năm! Tham gia cùng Viet Pride để tranh tài với các bang hội mạnh nhất.

## Giải Thưởng
- 🥇 1st Place: $10M + Trophy
- 🥈 2nd Place: $5M
- 🥉 3rd Place: $2M

## Thể Lệ
- 5v5 Team Deathmatch
- Best of 3 rounds
- No explosives allowed`,
      server: servers[0]?.id,
      organizer: users[0]?.id,
      startDate: '2024-12-20T19:00:00.000Z',
      endDate: '2024-12-20T22:00:00.000Z',
      location: 'Los Santos Arena',
      maxParticipants: 10,
      eventStatus: 'Upcoming',
      type: 'PvP',
      difficulty: 'Hard',
      rewards: '$10M + Trophy + Gang Reputation',
      isPublic: true,
    },
    {
      title: 'Heist Marathon - Cayo Perico',
      slug: 'heist-marathon-cayo-perico',
      description: `# Heist Marathon - Cayo Perico

Thử thách hoàn thành Cayo Perico Heist nhiều lần nhất trong 4 giờ!

## Mục Tiêu
- Hoàn thành nhiều lần nhất
- Kiếm được nhiều tiền nhất
- Không được caught

## Giải Thưởng
Top 3 sẽ nhận được phần thưởng hấp dẫn!`,
      server: servers[0]?.id,
      organizer: users[1]?.id,
      startDate: '2024-12-25T15:00:00.000Z',
      endDate: '2024-12-25T19:00:00.000Z',
      location: 'Cayo Perico Island',
      maxParticipants: 20,
      eventStatus: 'Upcoming',
      type: 'Heist',
      difficulty: 'Medium',
      rewards: '$5M + Exclusive Items',
      isPublic: true,
    },
  ];

  const imported = [];
  
  for (const event of events) {
    try {
      const result = await apiRequest('/events', 'POST', event);
      console.log(`✅ Created: ${event.title}`);
      imported.push(result.data);
    } catch (error) {
      console.log(`⚠️  Skipped: ${event.title} (may already exist)`);
    }
  }
  
  return imported;
}

// Main function
async function main() {
  console.log('🚀 Starting Strapi Sample Data Import...');
  console.log(`📍 Target: ${STRAPI_URL}`);
  
  try {
    // Import in order (respecting relations)
    const memberTiers = await importMemberTiers();
    const servers = await importServers();
    const categories = await importCategories();
    const users = await importUsers(memberTiers, servers);
    const posts = await importPosts(users, categories, servers);
    const events = await importEvents(users, servers);
    
    console.log('\n✅ Import completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Member Tiers: ${memberTiers.length}`);
    console.log(`   - Servers: ${servers.length}`);
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Posts: ${posts.length}`);
    console.log(`   - Events: ${events.length}`);
    
    console.log('\n🎯 Next steps:');
    console.log('   1. Visit http://strapi.vietpride.online/admin to verify data');
    console.log('   2. Check frontend at https://3000-iefajlmyg7olhzxw7pmly-2853d326.manus-asia.computer');
    console.log('   3. Test login with:');
    console.log('      - Username: vietpride_admin');
    console.log('      - Password: Admin123!@#');
    
  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Run
main();
