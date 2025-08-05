import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createMocks } from 'node-mocks-http';
import handler from '../src/pages/api/profile'; 
import User from '../src/models/User';


let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);

 
  await User.create([
    {
      name: "Basil Paner",
      city: "Berlin",
      roles: ["learner"],
      skills: ["Python", "Datenbanken"]
    },
    {
      name: "Maria Svendsen",
      city: "Berlin",
      roles: ["teacher"],
      skills: ["Chemie", "Erklären"]
    },
    {
      name: "Alex Beispiel",
      city: "Berlin",
      roles: ["learner", "teacher"],
      skills: ["Python", "MongoDB", "Erklären"]
    }
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

describe('System Test: /api/profile', () => {
  it('should return a list of users', async () => {
    const { req, res } = createMocks({ method: 'GET' });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);

    const json = JSON.parse(res._getData());

    expect(json.languages).toBeDefined();
    expect(Array.isArray(json.languages)).toBe(true);

    expect(json.learn).toBeDefined();
    expect(Array.isArray(json.learn)).toBe(true);

    expect(json.teach).toBeDefined();
    expect(Array.isArray(json.teach)).toBe(true);

    expect(json.preferences).toBeDefined();
    expect(Array.isArray(json.preferences)).toBe(true);
  });
});
