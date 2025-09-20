import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp, Users, Calendar, Play, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Dashboard = () => {
  type Course = {
    id: number;
    title: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    duration: string;
  };

  type Stat = {
    title: string;
    value: number | string;
    change: string;
  };

  type Assignment = {
    id: number;
    title: string;
    course: string;
    dueDate: string;
    status: 'pending' | 'in-progress' | 'completed';
  };

  const [recentCourses, setRecentCourses] = useState<Course[] | null>(null);
  const [stats, setStats] = useState<Stat[] | null>(null);
  const [upcomingAssignments, setUpcomingAssignments] = useState<Assignment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showClassmates, setShowClassmates] = useState(false);
  const classmates = [
    'Karthik', 'Lasya', 'Pranathi', 'Vijaya', 'Vihari', 'x', 'xx', 'xxx'
  ];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [coursesRes, statsRes, assignmentsRes] = await Promise.all([
          fetch('/api/courses/recent'),
          fetch('/api/stats'),
          fetch('/api/assignments/upcoming'),
        ]);

        if (!coursesRes.ok || !statsRes.ok || !assignmentsRes.ok) {
          throw new Error('Failed to load data');
        }

        const [courses, statsData, assignments] = await Promise.all([
          coursesRes.json(),
          statsRes.json(),
          assignmentsRes.json(),
        ]);

        setRecentCourses(courses);
        setStats(statsData);
        setUpcomingAssignments(assignments);
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? 'Unknown error');
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="container py-8 space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex! 👋</h1>
        <p className="text-muted-foreground">
          You're making great progress. Keep up the momentum!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(stats ?? []).map((stat, index) => (
          <Card key={index} className="hover-lift shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {/* Icons mapped by index to keep UI similar */}
              {index === 0 && <BookOpen className="h-5 w-5 text-muted-foreground" />}
              {index === 1 && <Clock className="h-5 w-5 text-muted-foreground" />}
              {index === 2 && <Award className="h-5 w-5 text-muted-foreground" />}
              {index === 3 && <TrendingUp className="h-5 w-5 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Continue Learning</h2>
            <Link to="/courses">
              <Button variant="outline" size="sm">
                View All Courses
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {(recentCourses ?? []).map((course) => (
              <Card key={course.id} className="hover-lift shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-accent flex items-center justify-center`}>
                      <Play className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {course.completedLessons}/{course.totalLessons} lessons
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Progress</span>
                          <span>{course.progress}% complete</span>
                        </div>
                        <div className="relative">
                          <Progress value={course.progress} className="h-2" />
                          <div 
                            className="absolute top-0 left-0 h-2 bg-gradient-progress rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                        
                        <Button className="bg-gradient-accent text-white border-0 hover:scale-105 transition-smooth">
                          Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Assignments */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Upcoming Assignments</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(upcomingAssignments ?? []).map((assignment) => (
                <div key={assignment.id} className="space-y-2 p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{assignment.title}</h4>
                    <Badge 
                      variant={assignment.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{assignment.course}</p>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Due {assignment.dueDate}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Study Groups */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Study Groups</span>
              </CardTitle>
              <CardDescription>
                Join collaborative learning sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => setShowClassmates(true)}>
                <Users className="mr-2 h-4 w-4" />
                Find Study Groups
              </Button>
            </CardContent>
          </Card>

          {/* Achievement */}
          <Card className="shadow-elegant bg-gradient-subtle">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-600" />
                <span>Latest Achievement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-4xl">🏆</div>
                <h3 className="font-semibold">React Master</h3>
                <p className="text-sm text-muted-foreground">
                  Completed 5 React courses with excellence
                </p>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
    {/* Classmates Modal */}
    {showClassmates && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowClassmates(false)} />
        <div className="relative w-full max-w-md mx-4 rounded-lg border bg-card shadow-card">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Classmates</h2>
            <button className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setShowClassmates(false)}>Close</button>
          </div>
          <div className="p-4">
            <ul className="space-y-2 text-sm">
              {classmates.map((name) => (
                <li key={name} className="p-2 rounded bg-secondary/50">{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )}
  </div>
);
};