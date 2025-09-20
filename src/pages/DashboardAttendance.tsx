import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const DashboardAttendance: React.FC = () => {
  const attendance = [
    { date: '2025-09-10', status: 'Present' },
    { date: '2025-09-11', status: 'Present' },
    { date: '2025-09-12', status: 'Absent' },
    { date: '2025-09-13', status: 'Present' },
  ];

  const stats = [
    { label: 'Days Present', value: 22 },
    { label: 'Days Absent', value: 3 },
    { label: 'Attendance %', value: '88%' },
  ];

  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard & Attendance</h1>
        <p className="text-muted-foreground">Your overall progress and attendance overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">{s.label}</CardTitle>
              <div className="text-2xl font-semibold">{s.value}</div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>Quick snapshot of your latest attendance entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {attendance.map((a) => (
              <div key={a.date} className="p-3 rounded-lg bg-secondary/50 flex items-center justify-between">
                <span className="text-muted-foreground">{a.date}</span>
                <span className={a.status === 'Present' ? 'text-green-600' : 'text-red-600'}>{a.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAttendance;
