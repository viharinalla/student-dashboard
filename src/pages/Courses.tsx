import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play } from 'lucide-react';
import { Header } from '@/components/Header';
import { Link, useSearchParams } from 'react-router-dom';

const Courses: React.FC = () => {
  type Course = {
    id: number;
    title: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    duration: string;
  };

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').toLowerCase();

  const filteredCourses = useMemo(() => {
    if (!q) return courses;
    return courses.filter((c) => c.title.toLowerCase().includes(q));
  }, [courses, q]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/courses/recent');
        if (!res.ok) throw new Error('Failed to load courses');
        const data = await res.json();
        setCourses(data);
      } catch (e: any) {
        setError(e?.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">Explore your current and recent courses.</p>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading courses...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover-lift shadow-elegant">
            <CardHeader>
              <CardTitle className="text-lg">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center">
                  <Play className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Duration: {course.duration}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="relative">
                  <Progress value={course.progress} className="h-2" />
                  <div className="absolute top-0 left-0 h-2 bg-gradient-progress rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                </div>
                <div className="text-xs text-muted-foreground">
                  {course.completedLessons}/{course.totalLessons} lessons
                </div>
              </div>
              <div className="flex justify-end">
                <Link to={`/courses/${course.id}`}>
                  <Button className="bg-gradient-accent text-white border-0">Continue</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Courses;
