import express from 'express';
import cors from 'cors';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

// Mock data
const recentCourses = [
  { id: 1, title: 'Advanced React Patterns', progress: 75, totalLessons: 24, completedLessons: 18, duration: '8h 30m' },
  { id: 2, title: 'Machine Learning Fundamentals', progress: 45, totalLessons: 32, completedLessons: 14, duration: '12h 15m' },
  { id: 3, title: 'UI/UX Design Principles', progress: 90, totalLessons: 16, completedLessons: 14, duration: '6h 45m' },
];

const stats = [
  { title: 'Courses Enrolled', value: 12, change: '+2 this month' },
  { title: 'Hours Learned', value: 127, change: '+15 this week' },
  { title: 'Certificates Earned', value: 8, change: '+1 this week' },
  { title: 'Current Streak', value: '15 days', change: 'Keep it up!' },
];

const assignments = [
  { id: 1, title: 'React Component Architecture', course: 'Advanced React Patterns', dueDate: '2025-01-25', status: 'pending' },
  { id: 2, title: 'Linear Regression Analysis', course: 'Machine Learning Fundamentals', dueDate: '2025-01-28', status: 'in-progress' },
  { id: 3, title: 'User Journey Mapping', course: 'UI/UX Design Principles', dueDate: '2025-01-30', status: 'completed' },
];

const groups = [
  { id: 1, name: 'Frontend Masters', members: 42 },
  { id: 2, name: 'ML Study Jam', members: 27 },
];

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Courses
app.get('/api/courses/recent', (_req, res) => {
  res.json(recentCourses);
});

app.get('/api/courses/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = recentCourses.find((c) => c.id === id);
  if (!found) return res.status(404).json({ message: 'Course not found' });
  // Return a bit more detail for demo purposes
  res.json({
    ...found,
    description: `Deep dive into ${found.title} with hands-on lessons and projects.`,
    syllabus: [
      'Introduction and setup',
      'Core concepts',
      'Applied patterns and best practices',
      'Capstone project',
    ],
    instructors: [
      { id: 1, name: 'Dr. Smith' },
      { id: 2, name: 'Alex Johnson' },
    ],
  });
});

// Stats
app.get('/api/stats', (_req, res) => {
  res.json(stats);
});

// Assignments
app.get('/api/assignments/upcoming', (_req, res) => {
  res.json(assignments);
});

// Groups
app.get('/api/groups', (_req, res) => {
  res.json(groups);
});

// Auth (mock)
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ message: 'Email is required' });
  return res.json({
    token: 'mock-token',
    user: { id: 1, name: 'Alex', email },
  });
});

// 404 handler for unknown API routes
app.use('/api', (_req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server only if this module is the entry point
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
  });
}

export default app;
