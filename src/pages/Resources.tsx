import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Resources: React.FC = () => {
  const resources = [
    { id: 1, title: 'React Docs', desc: 'Official React documentation', url: 'https://react.dev' },
    { id: 2, title: 'TypeScript Handbook', desc: 'Learn TypeScript deeply', url: 'https://www.typescriptlang.org/docs/' },
    { id: 3, title: 'MDN Web Docs', desc: 'Web platform documentation', url: 'https://developer.mozilla.org/' },
  ];

  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground">Curated learning materials and tools to accelerate your journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <Card key={res.id} className="shadow-elegant hover-lift">
            <CardHeader>
              <CardTitle className="text-lg">{res.title}</CardTitle>
              <CardDescription>{res.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <a className="text-sm underline text-primary" href={res.url} target="_blank" rel="noreferrer">Visit</a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Resources;
