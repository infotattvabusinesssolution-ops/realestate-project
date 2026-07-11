import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Property from './models/Property.js';
import Project from './models/Project.js';
import Ticket from './models/Ticket.js';
import Message from './models/Message.js';
import Category from './models/Category.js';
import Amenity from './models/Amenity.js';
import Country from './models/Country.js';
import State from './models/State.js';
import City from './models/City.js';
import FeaturedPricing from './models/FeaturedPricing.js';
import FeaturedRequest from './models/FeaturedRequest.js';
import ProjectType from './models/ProjectType.js';
import Package from './models/Package.js';
import Menu from './models/Menu.js';
import PaymentLog from './models/PaymentLog.js';
import Subscriber from './models/Subscriber.js';
import OnlineGateway from './models/OnlineGateway.js';
import OfflineGateway from './models/OfflineGateway.js';
import Language from './models/Language.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // 1. Clear existing data
    await User.deleteMany();
    await Property.deleteMany();
    await Project.deleteMany();
    await Ticket.deleteMany();
    await Message.deleteMany();
    await Category.deleteMany();
    await Amenity.deleteMany();
    await Country.deleteMany();
    await State.deleteMany();
    await City.deleteMany();
    await FeaturedPricing.deleteMany();
    await FeaturedRequest.deleteMany();
    await ProjectType.deleteMany();
    await Package.deleteMany();
    await Menu.deleteMany();
    await PaymentLog.deleteMany();
    await Subscriber.deleteMany();
    await OnlineGateway.deleteMany();
    await OfflineGateway.deleteMany();
    await Language.deleteMany();
    console.log('Database cleared!');

    // 2. Create Users
    const plainPassword = 'password123';

    const admin = new User({
      name: 'Leonard Bourne',
      email: 'leonard@estacy.com',
      password: plainPassword,
      role: 'admin',
      phone: '+1-555-0199',
      city: 'Los Angeles',
      state: 'California',
      zip: '90001',
      address: '742 Evergreen Terrace',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      rating: '4.9★',
      experience: '12 Years',
      specialization: 'Commercial Real Estate'
    });

    const vendor = new User({
      name: 'Oscar Eade',
      email: 'oscar@estacy.com',
      password: plainPassword,
      role: 'vendor',
      phone: '+1-555-0188',
      city: 'New York',
      state: 'New York',
      zip: '10001',
      address: '123 Broadway Ave',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      rating: '4.8★',
      experience: '8 Years',
      specialization: 'Residential Construction',
      businessName: 'Gold Coast Realty'
    });

    const agent = new User({
      name: 'Rendall Vance',
      email: 'rendall@estacy.com',
      password: plainPassword,
      role: 'agent',
      phone: '+1-555-0177',
      city: 'Miami',
      state: 'Florida',
      zip: '33101',
      address: '456 Ocean Blvd',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      rating: '4.7★',
      experience: '5 Years',
      specialization: 'Luxury Properties'
    });

    const customer = new User({
      name: 'Sarah Jenkins',
      email: 'sarah.j@gmail.com',
      password: plainPassword,
      role: 'customer',
      phone: '+880155879521',
      city: 'Seattle',
      state: 'Washington',
      zip: '98101',
      address: '15th Street 47 W',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      rating: '4.9★',
      experience: 'N/A',
      specialization: 'First-time Buyers'
    });

    await admin.save();
    await vendor.save();
    await agent.save();
    await customer.save();
    console.log('Default users seeded!');

    // 3. Create Properties
    const properties = [
      {
        name: 'Serene Meadow Villa',
        title: 'Serene Meadow Villa',
        price: '$1,250,000',
        type: 'Buy',
        propertyType: 'Residential',
        address: '452 Meadow Lane, Beverly Hills, CA',
        city: 'Beverly Hills',
        beds: 4,
        baths: 3.5,
        area: '3,200 sqft',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
        tag: 'Villa',
        status: 'Approved',
        isActive: true,
        isFeatured: true,
        vendor: vendor._id,
        assignedAgent: agent._id,
        views: 1420
      },
      {
        name: 'Modern Glass Penthouse',
        title: 'Modern Glass Penthouse',
        price: '$8,500 / mo',
        type: 'Rent',
        propertyType: 'Residential',
        address: '789 Skyline Ave, New York, NY',
        city: 'New York',
        beds: 3,
        baths: 3,
        area: '2,400 sqft',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
        tag: 'Penthouse',
        status: 'Approved',
        isActive: true,
        isFeatured: true,
        vendor: vendor._id,
        assignedAgent: agent._id,
        views: 890
      },
      {
        name: 'Whispering Pines Estate',
        title: 'Whispering Pines Estate',
        price: '$2,890,000',
        type: 'Buy',
        propertyType: 'Residential',
        address: '104 Redwood Dr, Aspen, CO',
        city: 'Aspen',
        beds: 5,
        baths: 6,
        area: '5,800 sqft',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
        tag: 'Estate',
        status: 'Approved',
        isActive: true,
        isFeatured: false,
        vendor: admin._id,
        assignedAgent: agent._id,
        views: 310
      },
      {
        name: 'Urban Loft Apartment',
        title: 'Urban Loft Apartment',
        price: '$3,200 / mo',
        type: 'Rent',
        propertyType: 'Commercial',
        address: '502 Broadway St, Seattle, WA',
        city: 'Seattle',
        beds: 2,
        baths: 2,
        area: '1,350 sqft',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        tag: 'Apartment',
        status: 'Approved',
        isActive: true,
        isFeatured: false,
        vendor: vendor._id,
        views: 450
      },
      {
        name: 'Sunset Waterfront Retreat',
        title: 'Sunset Waterfront Retreat',
        price: '$3,400,000',
        type: 'Buy',
        propertyType: 'Residential',
        address: '88 Ocean Vista, Miami, FL',
        city: 'Miami',
        beds: 4,
        baths: 4.5,
        area: '4,100 sqft',
        image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80',
        tag: 'Retreat',
        status: 'Pending',
        isActive: false,
        isFeatured: false,
        vendor: vendor._id,
        views: 140
      },
      {
        name: 'Charming Tudor Cottage',
        title: 'Charming Tudor Cottage',
        price: '$795,000',
        type: 'Buy',
        propertyType: 'Residential',
        address: '12 Forest Hill Rd, Portland, OR',
        city: 'Portland',
        beds: 3,
        baths: 2,
        area: '1,950 sqft',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        tag: 'Cottage',
        status: 'Approved',
        isActive: true,
        isFeatured: false,
        vendor: vendor._id,
        views: 290
      }
    ];

    const seededProperties = await Property.insertMany(properties);
    console.log('Properties seeded!');

    // Update customer wishlist with first 3 properties
    customer.wishlist = [
      seededProperties[0]._id,
      seededProperties[2]._id,
      seededProperties[5]._id
    ];
    await customer.save();

    // 4. Create Projects
    const projects = [
      {
        name: 'Aura Heights',
        builder: vendor._id,
        location: 'Downtown San Francisco, CA',
        units: '120 Units Available',
        status: 'Under Construction',
        approvalStatus: 'Approved',
        isFeatured: false,
        isActive: true,
        minPrice: '$2,500,000',
        maxPrice: '$5,000,000',
        description: 'Luxury high-rise condominiums in the heart of San Francisco.',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Infinity Bay Residences',
        builder: vendor._id,
        location: 'Marina Bay, Boston, MA',
        units: '45 Units Left',
        status: 'Pre-launching',
        approvalStatus: 'Approved',
        isFeatured: true,
        isActive: true,
        minPrice: '$1,800,000',
        maxPrice: '$3,200,000',
        description: 'Waterfront living with panoramic ocean views.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Elysian Meadows',
        builder: admin._id,
        location: 'Austin Suburbs, TX',
        units: 'Sold Out 80%',
        status: 'Complete',
        approvalStatus: 'Approved',
        isFeatured: true,
        isActive: true,
        minPrice: '$450,000',
        maxPrice: '$950,000',
        description: 'Family-friendly residential community with modern amenities.',
        image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Crown Jewel Estates',
        builder: vendor._id,
        location: 'Beverly Hills, CA',
        units: '30 Units Available',
        status: 'Under Construction',
        approvalStatus: 'Approved',
        isFeatured: false,
        isActive: true,
        minPrice: '$5,000,000',
        maxPrice: '$12,000,000',
        description: 'Ultra-luxury estate homes in Beverly Hills.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Central Plaza Mixed-Use',
        builder: vendor._id,
        location: 'Midtown Manhattan, NY',
        units: '200 Units Available',
        status: 'Under Construction',
        approvalStatus: 'Approved',
        isFeatured: true,
        isActive: true,
        minPrice: '$750,000',
        maxPrice: '$2,500,000',
        description: 'Mixed-use development combining retail and residential spaces.',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
      },
    ];

    await Project.insertMany(projects);
    console.log('Projects seeded!');

    // 5. Create Tickets
    const tickets = [
      {
        user: vendor._id,
        title: 'Cannot upload images larger than 5MB',
        urgency: 'High',
        status: 'Open',
        responses: [
          {
            sender: vendor._id,
            senderName: vendor.name,
            text: 'I get a server error when uploading property images larger than 5MB.',
            timestamp: new Date(Date.now() - 3600000 * 2)
          }
        ]
      },
      {
        user: customer._id,
        title: 'Need advice on mortgage rates calculation',
        urgency: 'Medium',
        status: 'In Progress',
        responses: [
          {
            sender: customer._id,
            senderName: customer.name,
            text: 'Hi support team, I want to calculate mortgage rates, but the rates shown on page seem slightly different from external sites.',
            timestamp: new Date(Date.now() - 3600000 * 5)
          },
          {
            sender: admin._id,
            senderName: admin.name,
            text: 'Hello Sarah! Our system pulls rates from a weekly aggregate. We will review our data feed.',
            timestamp: new Date(Date.now() - 3600000 * 4)
          }
        ]
      }
    ];

    await Ticket.insertMany(tickets);
    console.log('Tickets seeded!');

    // 6. Create Message Leads
    const messages = [
      {
        sender: customer._id,
        receiver: vendor._id,
        property: seededProperties[0]._id,
        text: 'Hi Oscar! I am very interested in the Serene Meadow Villa. Can we schedule a viewing this Friday?',
      },
      {
        sender: customer._id,
        receiver: agent._id,
        property: seededProperties[1]._id,
        text: 'Hello Rendall, I would like to inquire about the rental duration flexibility for the Glass Penthouse.',
      },
      {
        sender: customer._id,
        receiver: vendor._id,
        property: seededProperties[2]._id,
        text: 'Is the Whispering Pines Estate still available? I would like to know more about the neighborhood.',
      },
      {
        sender: customer._id,
        receiver: vendor._id,
        property: seededProperties[3]._id,
        text: 'Can you share the floor plan for the Urban Loft Apartment? Also is pet friendly?',
      },
      {
        sender: customer._id,
        receiver: vendor._id,
        property: seededProperties[4]._id,
        text: 'Hi, what is the HOA fee for the Sunset Waterfront Retreat? Any maintenance charges?',
      },
      {
        sender: customer._id,
        receiver: agent._id,
        property: seededProperties[5]._id,
        text: 'I love the Charming Tudor Cottage! Is the price negotiable? Can we set up a tour?',
      },
      {
        sender: customer._id,
        receiver: vendor._id,
        property: seededProperties[0]._id,
        text: 'Following up on the Serene Meadow Villa — is there underground parking available?',
      },
      {
        sender: customer._id,
        receiver: agent._id,
        property: seededProperties[1]._id,
        text: 'What utilities are included in the $8,500/mo rent for the Modern Glass Penthouse?',
      },
      {
        sender: customer._id,
        receiver: vendor._id,
        property: seededProperties[3]._id,
        text: 'Does the Urban Loft have an in-unit washer/dryer? Also, how far is the nearest metro?',
      },
      {
        sender: customer._id,
        receiver: vendor._id,
        property: seededProperties[4]._id,
        text: 'I have pre-approval for $3.5M. Can we discuss financing options for the Sunset Retreat?',
      },
    ];

    await Message.insertMany(messages);
    console.log('Message leads seeded!');

    // 7. Seed Property Specification Categories
    const categoriesList = [
      { type: 'Residential', name: 'Apartment', status: 'Active', serial: 1 },
      { type: 'Commercial', name: 'Hotel', status: 'Active', serial: 2 },
      { type: 'Residential', name: 'House', status: 'Active', serial: 3 },
      { type: 'Commercial', name: 'Floor', status: 'Active', serial: 4 },
      { type: 'Commercial', name: 'Building', status: 'Active', serial: 5 },
      { type: 'Residential', name: 'Pent House', status: 'Active', serial: 6 },
      { type: 'Commercial', name: 'Shop', status: 'Active', serial: 7 },
      { type: 'Residential', name: 'Duplex', status: 'Active', serial: 8 }
    ];
    await Category.insertMany(categoriesList);
    console.log('Categories seeded!');

    // 8. Seed Amenities
    const amenitiesList = [
      { iconName: 'Mosque', name: 'Mosque', status: 'Active', serial: 7 },
      { iconName: 'Zap', name: 'Backup Electricity', status: 'Active', serial: 6 },
      { iconName: 'Wind', name: 'Air conditioning', status: 'Active', serial: 5 },
      { iconName: 'Shield', name: 'Security', status: 'Active', serial: 4 },
      { iconName: 'Activity', name: 'Gym', status: 'Active', serial: 3 },
      { iconName: 'Swimming', name: 'Swimming pool', status: 'Active', serial: 2 },
      { iconName: 'Parking', name: 'Parking', status: 'Active', serial: 1 }
    ];
    await Amenity.insertMany(amenitiesList);
    console.log('Amenities seeded!');

    // 9. Seed Locations (Country -> State -> City)
    const usCountry = await Country.create({ name: 'United States', slug: 'united-states', status: 'Active', serial: 1 });
    const caCountry = await Country.create({ name: 'Canada', slug: 'canada', status: 'Active', serial: 2 });
    
    const caliState = await State.create({ country: usCountry._id, name: 'California', slug: 'california', status: 'Active', serial: 1 });
    const texasState = await State.create({ country: usCountry._id, name: 'Texas', slug: 'texas', status: 'Active', serial: 2 });

    await City.create({ country: usCountry._id, state: caliState._id, name: 'Los Angeles', slug: 'los-angeles', status: 'Active', serial: 1 });
    await City.create({ country: usCountry._id, state: texasState._id, name: 'Houston', slug: 'houston', status: 'Active', serial: 2 });
    console.log('Geographic locations seeded!');

    // 10. Seed Featured Pricing
    const pricingList = [
      { days: 30, cost: '$120.00', status: 'Active' },
      { days: 25, cost: '$100.00', status: 'Active' },
      { days: 20, cost: '$80.00', status: 'Active' },
      { days: 10, cost: '$50.00', status: 'Active' },
    ];
    const seededPricing = await FeaturedPricing.insertMany(pricingList);
    console.log('Featured pricing seeded!');

    // 11. Seed Featured Requests
    const featuredRequests = [
      {
        property: seededProperties[0]._id,
        vendor: vendor._id,
        pricing: seededPricing[0]._id,
        payVia: 'Toyyibpay',
        paymentStatus: 'Complete',
        featuredStatus: 'Featured',
      },
      {
        property: seededProperties[1]._id,
        vendor: vendor._id,
        pricing: seededPricing[1]._id,
        payVia: 'Toyyibpay',
        paymentStatus: 'Complete',
        featuredStatus: 'Featured',
      },
      {
        property: seededProperties[4]._id,
        vendor: vendor._id,
        pricing: seededPricing[2]._id,
        payVia: 'Xendit',
        paymentStatus: 'Pending',
        featuredStatus: 'Pending',
      },
      {
        property: seededProperties[5]._id,
        vendor: vendor._id,
        pricing: seededPricing[3]._id,
        payVia: 'Xendit',
        paymentStatus: 'Complete',
        featuredStatus: 'Rejected',
      },
    ];
    await FeaturedRequest.insertMany(featuredRequests);
    console.log('Featured requests seeded!');

    // 12. Seed Project Types
    const projectTypesList = [
      { name: 'Project Type One', minPrice: '$2,500.00', minArea: '1200', totalUnit: 12 },
      { name: 'Project Type Two', minPrice: '$5,212.00', minArea: '2546', totalUnit: 15 },
      { name: 'Project Type Three', minPrice: '$1,825.00', minArea: '1200', totalUnit: 5 },
    ];
    await ProjectType.insertMany(projectTypesList);
    console.log('Project types seeded!');

    // 13. Seed Packages
    const packagesList = [
      { title: 'Platinum', term: 'Lifetime', price: '$399.99', status: 'Active', agents: 10, properties: 25, galleryPerProp: 15, featuresPerProp: 10, projects: 5, typesPerProj: 5, galleryPerProj: 10, featuresPerProj: 8 },
      { title: 'Golden', term: 'Lifetime', price: '$199.99', status: 'Active', agents: 5, properties: 10, galleryPerProp: 10, featuresPerProp: 5, projects: 2, typesPerProj: 3, galleryPerProj: 5, featuresPerProj: 4 },
      { title: 'Free', term: 'Lifetime', price: 'Free', status: 'Active', agents: 1, properties: 2, galleryPerProp: 5, featuresPerProp: 2, projects: 0, typesPerProj: 0, galleryPerProj: 0, featuresPerProj: 0 },
      { title: 'Maturity', term: 'Yearly', price: '$299.99', status: 'Active', agents: 8, properties: 20, galleryPerProp: 12, featuresPerProp: 8, projects: 4, typesPerProj: 4, galleryPerProj: 8, featuresPerProj: 6 },
      { title: 'Growth', term: 'Yearly', price: '$169.99', status: 'Active', agents: 4, properties: 8, galleryPerProp: 8, featuresPerProp: 4, projects: 2, typesPerProj: 2, galleryPerProj: 4, featuresPerProj: 4 },
      { title: 'Startup', term: 'Yearly', price: '$99.99', status: 'Active', agents: 2, properties: 4, galleryPerProp: 4, featuresPerProp: 2, projects: 1, typesPerProj: 2, galleryPerProj: 2, featuresPerProj: 2 },
      { title: 'Maturity', term: 'Monthly', price: '$29.99', status: 'Active', agents: 8, properties: 20, galleryPerProp: 12, featuresPerProp: 8, projects: 4, typesPerProj: 4, galleryPerProj: 8, featuresPerProj: 6 },
      { title: 'Growth', term: 'Monthly', price: '$15.99', status: 'Active', agents: 4, properties: 8, galleryPerProp: 8, featuresPerProp: 4, projects: 2, typesPerProj: 2, galleryPerProj: 4, featuresPerProj: 4 },
      { title: 'Startup', term: 'Monthly', price: '$9.99', status: 'Active', agents: 2, properties: 4, galleryPerProp: 4, featuresPerProp: 2, projects: 1, typesPerProj: 2, galleryPerProj: 2, featuresPerProj: 2 }
    ];
    await Package.insertMany(packagesList);
    console.log('Packages seeded!');

    // 14. Seed Menu Items
    const menuItems = [
      { name: 'Home', url: '/', target: 'Self', isExpandable: true, isCustom: false, order: 0 },
      { name: 'Properties', url: '/properties', target: 'Self', isExpandable: false, isCustom: false, order: 1 },
      { name: 'Projects', url: '/projects', target: 'Self', isExpandable: false, isCustom: false, order: 2 },
      { name: 'Pricing', url: '/pricing', target: 'Self', isExpandable: false, isCustom: false, order: 3 },
      { name: 'Pages', url: '/pages', target: 'Self', isExpandable: true, isCustom: false, order: 4 },
      { name: 'Contact', url: '/contact', target: 'Self', isExpandable: false, isCustom: false, order: 5 },
    ];
    await Menu.insertMany(menuItems);
    console.log('Menu items seeded!');

    // 15. Seed Payment Logs
    const seededPackages = await Package.find();
    const paymentLogs = [
      { txn: 'd09bd2b7', user: vendor._id, amount: '$399.99', status: 'Success', method: 'Citibank', receipt: '-', package: seededPackages[0]._id, hasDropdown: true },
      { txn: '72371457', user: vendor._id, amount: '$399.99', status: 'Success', method: 'PayPal', receipt: '-', package: seededPackages[1]._id },
      { txn: 'da1cbff7', user: vendor._id, amount: '$399.99', status: 'Success', method: 'PayPal', receipt: '-', package: seededPackages[2]._id },
      { txn: '56a78860', user: vendor._id, amount: '$399.99', status: 'Success', method: 'PayPal', receipt: '-', package: seededPackages[3]._id },
      { txn: 'f359072f', user: vendor._id, amount: '$399.99', status: 'Success', method: 'PayPal', receipt: '-', package: seededPackages[4]._id },
      { txn: 'cba679ff', user: vendor._id, amount: '$399.99', status: 'Success', method: 'PayPal', receipt: '-', package: seededPackages[5]._id }
    ];
    await PaymentLog.insertMany(paymentLogs);
    console.log('Payment logs seeded!');

    // 16. Seed Subscribers
    const subscribersList = [
      { email: 'mknoveen.07@gmail.com' },
      { email: 'aaa@gmail.com' },
      { email: 'johncasas@gmail.com' },
      { email: 'asmaa.abdelwakeell@gmail.com' },
      { email: 'ordogan22@web.de' },
      { email: 'pembanama@gmail.com' },
      { email: 'memmabalinda@gmail.com' },
      { email: 'udemgbacift@gmail.com' },
      { email: 'abc@gmail.com' },
      { email: 'jmadvtn@gmail.com' },
    ];
    await Subscriber.insertMany(subscribersList);
    console.log('Subscribers seeded!');

    // 17. Seed Online Gateway
    await OnlineGateway.create({
      paypalStatus: 'Active',
      paypalTestMode: 'Active',
      paypalClientId: 'AVYKfEW63FLDl9aeYOe9biyifNl56s2Ik2F1Us11hWoY5GMuegip',
      paypalClientSecret: 'EJY0qOKlVg7wKsR3uPN7Ingr9rL1N7q1WV0FuiT1h4Fw3_eSItv1',
      instaStatus: 'Active',
      instaTestMode: 'Active',
      instaApiKey: 'test_172371aa837ae5cad6047dc3052',
      instaAuthToken: 'test_4ac5a785c25fc596b67dbc5c267',
      paytmStatus: 'Active',
      paytmEnv: 'Local',
      paytmMerchantKey: 'LhNGUUKE9xCQ9xY8',
      paytmMerchantMid: 'tkogux19985017638244',
      paytmWebsite: 'WEBSTAGING',
      paytmIndustry: 'Retail',
    });
    console.log('Online gateways seeded!');

    // 18. Seed Offline Gateways
    const offlineGateways = [
      { name: 'Bank of America', status: 'Active', serialNumber: 2, shortDescription: 'Direct bank transfer', instructions: 'Send money to account 123456789' },
      { name: 'Citibank', status: 'Active', serialNumber: 1, shortDescription: 'Direct bank transfer', instructions: 'Send money to account 987654321' }
    ];
    await OfflineGateway.insertMany(offlineGateways);
    console.log('Offline gateways seeded!');

    // 19. Seed Languages
    const languages = [
      { name: 'English', code: 'en', direction: 'LTR', isDefault: true, keywords: { 'dashboard': 'Dashboard', 'properties': 'Properties' } },
      { name: 'عربي', code: 'ar', direction: 'RTL', isDefault: false, keywords: { 'dashboard': 'لوحة القيادة', 'properties': 'عقارات' } }
    ];
    await Language.insertMany(languages);
    console.log('Languages seeded!');

    console.log('Database seeding successfully finished!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
