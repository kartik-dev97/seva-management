import AppLayout from '@/components/layout/app-layout';
import { EmployeeCard } from '@/components/employees/employee-card';
import { users } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function EmployeesPage() {
    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
                        <p className="text-muted-foreground">
                            Manage team members and their information
                        </p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Employee
                    </Button>
                </div>

                {/* Employee Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {users.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
