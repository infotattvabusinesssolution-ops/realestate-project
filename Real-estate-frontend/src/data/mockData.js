export const mockProperties = [
  {
    id: 1,
    name: 'Serene Meadow Villa',
    price: '$1,250,000',
    type: 'Buy',
    address: '452 Meadow Lane, Beverly Hills, CA',
    beds: 4,
    baths: 3.5,
    area: '3,200 sqft',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    isFavorite: true,
    tag: 'Villa'
  },
  {
    id: 2,
    name: 'Modern Glass Penthouse',
    price: '$8,500 / mo',
    type: 'Rent',
    address: '789 Skyline Ave, New York, NY',
    beds: 3,
    baths: 3,
    area: '2,400 sqft',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    isFavorite: false,
    tag: 'Penthouse'
  },
  {
    id: 3,
    name: 'Whispering Pines Estate',
    price: '$2,890,000',
    type: 'Buy',
    address: '104 Redwood Dr, Aspen, CO',
    beds: 5,
    baths: 6,
    area: '5,800 sqft',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    isFavorite: true,
    tag: 'Estate'
  },
  {
    id: 4,
    name: 'Urban Loft Apartment',
    price: '$3,200 / mo',
    type: 'Rent',
    address: '502 Broadway St, Seattle, WA',
    beds: 2,
    baths: 2,
    area: '1,350 sqft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    isFavorite: false,
    tag: 'Apartment'
  },
  {
    id: 5,
    name: 'Sunset Waterfront Retreat',
    price: '$3,400,000',
    type: 'Buy',
    address: '88 Ocean Vista, Miami, FL',
    beds: 4,
    baths: 4.5,
    area: '4,100 sqft',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80',
    isFavorite: false,
    tag: 'Retreat'
  },
  {
    id: 6,
    name: 'Charming Tudor Cottage',
    price: '$795,000',
    type: 'Buy',
    address: '12 Forest Hill Rd, Portland, OR',
    beds: 3,
    baths: 2,
    area: '1,950 sqft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    isFavorite: true,
    tag: 'Cottage'
  }
];

export const mockProjects = [
  {
    id: 1,
    name: 'Aura Heights',
    builder: 'Luxe Developers',
    location: 'Downtown San Francisco, CA',
    units: '120 Units Available',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Infinity Bay Residences',
    builder: 'Vertex Infrastructure',
    location: 'Marina Bay, Boston, MA',
    units: '45 Units Left',
    status: 'Pre-launching',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Elysian Meadows',
    builder: 'Greenfield Homes',
    location: 'Austin Suburbs, TX',
    units: 'Sold Out 80%',
    status: 'Ready to Move',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
  }
];

export const mockAgents = [
  {
    id: 1,
    name: 'Leonard Bourne',
    role: 'Super Admin',
    email: 'leonard@estacy.com',
    properties: '14 Active',
    rating: '4.9★',
    experience: '12 Years',
    specialization: 'Commercial Real Estate',
    city: 'Los Angeles',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Oscar Eade',
    role: 'Vendor',
    email: 'oscar@estacy.com',
    properties: '32 Active',
    rating: '4.8★',
    experience: '8 Years',
    specialization: 'Residential Construction',
    city: 'New York',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Rendall Vance',
    role: 'Agent',
    email: 'rendall@estacy.com',
    properties: '18 Active',
    rating: '4.7★',
    experience: '5 Years',
    specialization: 'Luxury Properties',
    city: 'Miami',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    name: 'Sarah Jenkins',
    role: 'Customer',
    email: 'sarah.j@gmail.com',
    properties: '0 Active',
    rating: '4.9★',
    experience: 'N/A',
    specialization: 'First-time Buyers',
    city: 'Seattle',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: 'Clara Oswald',
    role: 'Home Buyer',
    text: 'Estacy made finding our new home in Miami a complete breeze. The UI was incredibly simple, and matching with the perfect agent was instantaneous!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'David Tennant',
    role: 'Real Estate Developer',
    text: 'As a builder, showcasing our Aura Heights project on Estacy increased our inquiry rates by 35% in just two weeks. Highly recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
  }
];

// Admin Dashboard Analytics
export const adminStats = {
  totalUsers: 1420,
  totalVendors: 11,
  totalAgents: 15,
  totalProperties: 840,
  monthlyRevenue: '$48,250',
  pendingApprovals: 6,
  revenueChart: [
    { month: 'Jan', value: 32000 },
    { month: 'Feb', value: 35000 },
    { month: 'Mar', value: 39000 },
    { month: 'Apr', value: 36000 },
    { month: 'May', value: 43000 },
    { month: 'Jun', value: 48250 }
  ],
  userGrowth: [
    { month: 'Jan', users: 800 },
    { month: 'Feb', users: 950 },
    { month: 'Mar', users: 1100 },
    { month: 'Apr', users: 1220 },
    { month: 'May', users: 1350 },
    { month: 'Jun', users: 1420 }
  ],
  recentActivities: [
    { id: 1, user: 'Oscar Eade', action: 'Uploaded new project "Infinity Bay"', time: '10 mins ago', type: 'project' },
    { id: 2, user: 'Sarah Jenkins', action: 'Inquired about "Serene Meadow Villa"', time: '45 mins ago', type: 'lead' },
    { id: 3, user: 'Rendall Vance', action: 'Updated pricing on "Urban Loft Apartment"', time: '2 hours ago', type: 'property' },
    { id: 4, user: 'Alex Rivier', action: 'Registered as a Vendor', time: '5 hours ago', type: 'user' }
  ],
  recentProperties: [
    { id: 1, name: 'Serene Meadow Villa', price: '$1,250,000', vendor: 'Oscar Eade', status: 'Approved' },
    { id: 2, name: 'Lakeside Manor', price: '$980,000', vendor: 'John Doe Ltd', status: 'Pending' },
    { id: 3, name: 'Oceanic Horizon Suite', price: '$2,100,000', vendor: 'Vanguard Realty', status: 'Approved' },
    { id: 4, name: 'Timberland Log Cabin', price: '$450,000', vendor: 'Pine Builders', status: 'Pending' }
  ],
  recentVendors: [
    { id: 1, name: 'Oscar Eade', business: 'Gold Coast Realty', properties: 12, rating: '4.8★' },
    { id: 2, name: 'Apex Builder Corp', business: 'Apex Premium Homes', properties: 4, rating: '4.5★' },
    { id: 3, name: 'Luxe Estates', business: 'Luxury living Inc', properties: 8, rating: '4.9★' }
  ]
};

// Vendor Dashboard Analytics
export const vendorStats = {
  myProperties: 3,
  projects: 2,
  agents: 1,
  leads: 8,
  revenue: '$14,800',
  propertyViews: 2450,
  viewsChart: [
    { month: 'Jan', views: 800 },
    { month: 'Feb', views: 1200 },
    { month: 'Mar', views: 1500 },
    { month: 'Apr', views: 1800 },
    { month: 'May', views: 2200 },
    { month: 'Jun', views: 2450 }
  ],
  leadsChart: [
    { month: 'Jan', leads: 2 },
    { month: 'Feb', leads: 4 },
    { month: 'Mar', leads: 3 },
    { month: 'Apr', leads: 6 },
    { month: 'May', leads: 7 },
    { month: 'Jun', leads: 8 }
  ],
  recentLeads: [
    { id: 1, name: 'Sarah Jenkins', property: 'Serene Meadow Villa', email: 'sarah.j@gmail.com', date: 'Jul 6, 2026' },
    { id: 2, name: 'Michael Caine', property: 'Modern Glass Penthouse', email: 'mcaine@yahoo.com', date: 'Jul 4, 2026' },
    { id: 3, name: 'Rose Tyler', property: 'Sunset Waterfront Retreat', email: 'rose.t@outlook.com', date: 'Jul 1, 2026' }
  ],
  recentProperties: [
    { id: 1, name: 'Serene Meadow Villa', price: '$1,250,000', views: 1420, leads: 5, status: 'Active' },
    { id: 2, name: 'Modern Glass Penthouse', price: '$8,500 / mo', views: 890, leads: 2, status: 'Active' },
    { id: 3, name: 'Sunset Waterfront Retreat', price: '$3,400,000', views: 140, leads: 1, status: 'Pending Approval' }
  ]
};

// Agent Dashboard Analytics
export const agentStats = {
  assignedProperties: 18,
  newLeads: 5,
  appointments: 4,
  messages: 12,
  leadsChart: [
    { name: 'W1', value: 1 },
    { name: 'W2', value: 3 },
    { name: 'W3', value: 2 },
    { name: 'W4', value: 5 }
  ],
  visitsChart: [
    { name: 'W1', value: 10 },
    { name: 'W2', value: 15 },
    { name: 'W3', value: 18 },
    { name: 'W4', value: 22 }
  ],
  recentClients: [
    { id: 1, name: 'David Smith', status: 'Viewing Scheduled', interest: 'Whispering Pines Estate' },
    { id: 2, name: 'Emily Blunt', status: 'Contract Pending', interest: 'Charming Tudor Cottage' },
    { id: 3, name: 'Tom Hardy', status: 'Negotiating', interest: 'Urban Loft Apartment' }
  ],
  upcomingVisits: [
    { id: 1, client: 'David Smith', property: 'Whispering Pines Estate', date: 'Today, 2:30 PM' },
    { id: 2, client: 'Alice Cooper', property: 'Serene Meadow Villa', date: 'Tomorrow, 10:00 AM' },
    { id: 3, client: 'Arthur Dent', property: 'Urban Loft Apartment', date: 'Jul 9, 11:30 AM' }
  ]
};

// Customer Dashboard Analytics
export const customerStats = {
  wishlistCount: 3,
  savedPropertiesCount: 4,
  appointmentsCount: 2,
  messagesCount: 6,
  recommendedProperties: [
    { id: 1, name: 'Whispering Pines Estate', price: '$2,890,000', beds: 5, baths: 6, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80', score: '98% Match' },
    { id: 2, name: 'Sunset Waterfront Retreat', price: '$3,400,000', beds: 4, baths: 4.5, image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80', score: '94% Match' }
  ],
  recentInquiries: [
    { id: 1, property: 'Serene Meadow Villa', status: 'Agent Replied', date: 'Today, 10:14 AM' },
    { id: 2, property: 'Modern Glass Penthouse', status: 'Assigned to Agent', date: 'Yesterday, 4:32 PM' }
  ],
  upcomingVisits: [
    { id: 1, property: 'Serene Meadow Villa', agent: 'Rendall Vance', date: 'Tomorrow at 10:00 AM' },
    { id: 2, property: 'Modern Glass Penthouse', agent: 'Rendall Vance', date: 'Jul 12 at 4:00 PM' }
  ]
};
