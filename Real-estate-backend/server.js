import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import specRoutes from './routes/specRoutes.js';
import featuredRoutes from './routes/featuredRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import gatewayRoutes from './routes/gatewayRoutes.js';
import languageRoutes from './routes/languageRoutes.js';
import publicPackageRoutes from './routes/publicPackageRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

// Connect Database
connectDB();

const app = express();
const server = http.createServer(app);

// Configure CORS
const corsOriginSetting = process.env.CORS_ORIGIN || 'http://localhost:5173';
const corsOrigin = corsOriginSetting.includes(',')
  ? corsOriginSetting.split(',').map((origin) => origin.trim())
  : corsOriginSetting;

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

// Body Parser Middleware
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/specs', specRoutes);
app.use('/api/admin/featured', featuredRoutes);
app.use('/api/admin/projects', projectRoutes);
app.use('/api/admin/packages', packageRoutes);
app.use('/api/admin/menus', menuRoutes);
app.use('/api/admin/payments', paymentRoutes);
app.use('/api/admin/subscribers', subscriberRoutes);
app.use('/api/admin/gateways', gatewayRoutes);
app.use('/api/admin/languages', languageRoutes);
app.use('/api/packages', publicPackageRoutes);
app.use('/api/upload', uploadRoutes);

// Test Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Estaty Role-Based Backend API is running...' });
});

// 404 Fallback Handler
app.use((req, res) => {
  res.status(404).json({ message: 'API Route Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Socket.io Integration
const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Join a private user room for notifications and personal chats
  socket.on('join_user', (userId) => {
    socket.join(userId.toString());
    console.log(`User ${userId} joined their personal socket room`);
  });

  // Join support ticket room
  socket.on('join_ticket', (ticketId) => {
    socket.join(ticketId.toString());
    console.log(`Socket joined support ticket room: ${ticketId}`);
  });

  // Handle support ticket reply sending
  socket.on('ticket_reply', (data) => {
    const { ticketId, response } = data;
    // Broadcast ticket reply to all sockets joined in the ticket room, except sender
    socket.to(ticketId.toString()).emit('new_ticket_reply', response);
    console.log(`Ticket reply broadcasted in room: ${ticketId}`);
  });

  // Handle direct inquiry chat message sending
  socket.on('send_inquiry_message', (data) => {
    const { message } = data; // message contains receiver, sender, text, property, etc.
    const receiverId = message.receiver.toString();

    // Send message to the specific receiver room
    io.to(receiverId).emit('receive_inquiry_message', message);
    console.log(`Direct inquiry message forwarded to user room: ${receiverId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
