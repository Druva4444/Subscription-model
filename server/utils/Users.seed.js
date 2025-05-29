import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import user from '../models/User.model.js';
dotenv.config();

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'));

    console.log('MongoDB connected');

    const users = [];

    for (let i = 0; i < 20; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
        role: 'user'
      });
    }

    await user.insertMany(users);
    console.log(' 20 users seeded successfully');
  } catch (error) {
    console.error(' Seeding failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedUsers();
