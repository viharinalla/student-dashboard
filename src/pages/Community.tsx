import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

const Community: React.FC = () => {
  const groups = [
    { id: 1, name: 'Frontend Masters', members: 42, description: 'Deep dive into modern frontend tools and patterns.' },
    { id: 2, name: 'ML Study Jam', members: 27, description: 'Collaborative machine learning practice sessions.' },
    { id: 3, name: 'UI/UX Guild', members: 31, description: 'Design critiques, accessibility, and prototyping.' },
  ];

  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="text-muted-foreground">Connect with peers and instructors in study groups and discussions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((g) => (
          <Card key={g.id} className="shadow-elegant hover-lift">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{g.name}</span>
              </CardTitle>
              <CardDescription>{g.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{g.members} members</span>
              <Button variant="outline" size="sm">Join</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Community;
