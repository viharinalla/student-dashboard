import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/Header';

type CourseDetailData = {
  id: number;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  description: string;
  syllabus: string[];
  instructors: { id: number; name: string }[];
};

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<CourseDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        if (!res.ok) throw new Error('Failed to load course');
        const json = await res.json();
        setData(json);
      } catch (e: any) {
        setError(e?.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    if (id) run();
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10 space-y-8">
        {loading && <p className="text-sm text-muted-foreground">Loading course...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {data && (
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">{data.title}</CardTitle>
              <CardDescription>Duration: {data.duration}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">About this course</h3>
                <p className="text-sm text-muted-foreground">{data.description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Syllabus</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {data.syllabus.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Instructors</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {data.instructors.map((ins) => (
                    <li key={ins.id}>• {ins.name}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
