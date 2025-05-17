
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ChartComponent from '@/components/ChartComponent';
import VehicleForm from '@/components/VehicleForm';
import StatCard from '@/components/StatCard';
import { getLogsByVehicleId, getVehicleById, getVehicleStats } from '@/utils/mockData';
import { toast } from '@/hooks/use-toast';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Get vehicle data
  const vehicle = getVehicleById(id || '');
  const logs = getLogsByVehicleId(id || '');
  const stats = getVehicleStats(id || '');
  
  if (!vehicle) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 overflow-auto p-6">
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
              <p className="text-muted-foreground mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link to="/dashboard">Return to Dashboard</Link>
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  // Format data for charts
  const chartData = logs.map(log => ({
    name: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    fuelConsumption: log.fuelConsumption,
    co2Emissions: log.co2Emissions,
    mileage: log.mileage,
    distanceCovered: log.distanceCovered,
    engineTemp: log.engineTemp,
    engineRpm: log.engineRpm,
  })).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  const handleEditVehicle = (updatedVehicle: any) => {
    toast({
      title: 'Vehicle updated',
      description: `${updatedVehicle.year} ${updatedVehicle.make} ${updatedVehicle.model} has been updated.`,
    });
    setIsEditDialogOpen(false);
    // In a real app, this would update the vehicle in the database
  };

  const handleDeleteVehicle = () => {
    toast({
      title: 'Vehicle deleted',
      description: `${vehicle.year} ${vehicle.make} ${vehicle.model} has been deleted.`,
    });
    setIsDeleteDialogOpen(false);
    navigate('/dashboard');
    // In a real app, this would delete the vehicle from the database
  };

  const getFuelTypeColor = (fuelType: string): string => {
    switch (fuelType) {
      case 'Electric':
        return 'bg-green-500';
      case 'Hybrid':
        return 'bg-blue-500';
      case 'Gasoline':
        return 'bg-orange-500';
      case 'Diesel':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const renderSuggestions = () => {
    const suggestions = [];
    
    if (stats.avgFuelConsumption > 7 && vehicle.fuelType !== 'Electric') {
      suggestions.push('Consider reducing idle time to improve fuel efficiency.');
    }
    
    if (stats.avgCo2Emissions > 130 && vehicle.fuelType !== 'Electric') {
      suggestions.push('Higher than average emissions detected. A maintenance check is recommended.');
    }
    
    if (vehicle.fuelType === 'Gasoline' || vehicle.fuelType === 'Diesel') {
      suggestions.push('Regular maintenance can improve fuel efficiency and reduce emissions.');
    }
    
    if (stats.alertsCount > 0) {
      suggestions.push(`You have ${stats.alertsCount} alert(s). Check the alerts tab for details.`);
    }
    
    return suggestions.length > 0 ? suggestions : ['No suggestions at this time. Your vehicle is performing well.'];
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <Button variant="outline" size="icon" className="mr-4" asChild>
                <Link to="/dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <div>
                <h1>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
                <div className="flex items-center mt-1">
                  <Badge className={`${getFuelTypeColor(vehicle.fuelType)} text-white`}>
                    {vehicle.fuelType}
                  </Badge>
                  <span className="ml-2 text-sm text-muted-foreground">License: {vehicle.licensePlate}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
                Edit Vehicle
              </Button>
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                Delete
              </Button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-4 mb-6">
            <StatCard
              title="Fuel Consumption"
              value={`${stats.avgFuelConsumption} L`}
              description="Average per day"
              color="primary"
            />
            <StatCard
              title="CO₂ Emissions"
              value={`${stats.avgCo2Emissions} g/km`}
              description="Average per day"
              color={stats.avgCo2Emissions > 130 ? 'warning' : 'success'}
            />
            <StatCard
              title="Mileage"
              value={`${stats.avgMileage} km/l`}
              description="Average per day"
              color="success"
            />
            <StatCard
              title="Distance Covered"
              value={`${stats.totalDistance} km`}
              description="Total for period"
              color="primary"
            />
          </div>

          <Tabs defaultValue="metrics" className="space-y-6">
            <TabsList>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="alerts">Alerts ({stats.alertsCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="metrics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartComponent
                  title="Fuel Consumption & Mileage"
                  data={chartData}
                  type="line"
                  dataKeys={[
                    { key: 'fuelConsumption', color: '#0EA5E9', name: 'Fuel (L)' },
                    { key: 'mileage', color: '#8B5CF6', name: 'Mileage (km/l)' }
                  ]}
                  yAxisLabel="Value"
                  xAxisLabel="Date"
                />
                <ChartComponent
                  title="CO₂ Emissions"
                  data={chartData}
                  type="line"
                  dataKeys={[
                    { key: 'co2Emissions', color: '#F97316', name: 'CO₂ (g/km)' }
                  ]}
                  yAxisLabel="g/km"
                  xAxisLabel="Date"
                />
                <ChartComponent
                  title="Daily Distance"
                  data={chartData}
                  type="bar"
                  dataKeys={[
                    { key: 'distanceCovered', color: '#8B5CF6', name: 'Distance (km)' }
                  ]}
                  yAxisLabel="Kilometers"
                  xAxisLabel="Date"
                />
                <ChartComponent
                  title="Engine Performance"
                  data={chartData}
                  type="line"
                  dataKeys={[
                    { key: 'engineTemp', color: '#F97316', name: 'Temperature (°C)' },
                    { key: 'engineRpm', color: '#0EA5E9', name: 'RPM (x100)' }
                  ]}
                  yAxisLabel="Value"
                  xAxisLabel="Date"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="analysis">
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Summary</h3>
                    <p>
                      This {vehicle.year} {vehicle.make} {vehicle.model} shows 
                      {stats.avgFuelConsumption > 7 ? ' higher than average' : ' normal'} fuel consumption and
                      {stats.avgCo2Emissions > 130 ? ' higher than average' : ' normal'} CO₂ emissions
                      for a {vehicle.fuelType.toLowerCase()} vehicle.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Health Indicators</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Engine Temperature: {
                          logs.some(log => (log.engineTemp || 0) > 95)
                            ? 'Running hot. Consider checking cooling system.'
                            : 'Normal operating range.'
                        }
                      </li>
                      <li>
                        Engine RPM Patterns: {
                          logs.some(log => (log.engineRpm || 0) > 1800)
                            ? 'Higher than normal RPM detected. Check driving patterns.'
                            : 'Normal operating range.'
                        }
                      </li>
                      <li>
                        Emissions Profile: {
                          stats.avgCo2Emissions > 130
                            ? 'Higher than expected. Consider a tune-up.'
                            : 'Within normal range for vehicle type.'
                        }
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Suggestions</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {renderSuggestions().map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="logs">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-7 font-medium p-4 border-b">
                      <div>Date</div>
                      <div>Fuel (L)</div>
                      <div>CO₂ (g/km)</div>
                      <div>Mileage (km/l)</div>
                      <div>Distance (km)</div>
                      <div>Temp (°C)</div>
                      <div>RPM</div>
                    </div>
                    <div className="divide-y">
                      {logs.map((log) => (
                        <div key={log.id} className="grid grid-cols-7 p-4 hover:bg-muted/50">
                          <div>{new Date(log.date).toLocaleDateString()}</div>
                          <div>{log.fuelConsumption.toFixed(2)}</div>
                          <div>{log.co2Emissions.toFixed(2)}</div>
                          <div>{log.mileage.toFixed(2)}</div>
                          <div>{log.distanceCovered.toFixed(2)}</div>
                          <div>{log.engineTemp?.toFixed(1) || '-'}</div>
                          <div>{log.engineRpm?.toFixed(0) || '-'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="alerts">
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.alertsCount > 0 ? (
                    <div className="border rounded-md divide-y">
                      {logs
                        .filter(log => log.alertType !== 'none')
                        .map((log) => (
                          <div key={log.id} className="p-4 hover:bg-muted/50">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                className={
                                  log.alertType === 'high' ? 'bg-destructive' :
                                  log.alertType === 'medium' ? 'bg-amber-500' :
                                  'bg-yellow-500'
                                }
                              >
                                {log.alertType === 'high' ? 'High Priority' : 
                                 log.alertType === 'medium' ? 'Medium Priority' : 'Low Priority'}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {new Date(log.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="font-medium">
                              {log.alertType === 'high' ? 'Critical Issue Detected' :
                               log.alertType === 'medium' ? 'Attention Required' : 'Minor Issue Detected'}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {log.alertType === 'high' ? 
                                'Your vehicle may require immediate attention. Please schedule a service appointment.' :
                               log.alertType === 'medium' ?
                                'Potential issues detected. Monitor and schedule a check-up soon.' :
                                'Minor anomaly detected. Keep monitoring your vehicle performance.'}
                            </p>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-12 w-12 text-muted-foreground mb-4"
                      >
                        <path d="M9 12h6"></path>
                        <path d="M12 9v6"></path>
                        <path d="M12 21a9 9 0 0 0 0-18"></path>
                        <path d="M3 9v.01"></path>
                        <path d="M3 14v.01"></path>
                        <path d="M3 19v.01"></path>
                        <path d="M3 4v.01"></path>
                      </svg>
                      <p className="text-lg font-medium">No alerts at this time</p>
                      <p className="text-muted-foreground">
                        Your vehicle is running smoothly. No issues detected.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Edit Vehicle Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
            <DialogDescription>
              Update the details of your vehicle.
            </DialogDescription>
          </DialogHeader>
          <VehicleForm 
            vehicle={vehicle} 
            onSubmit={handleEditVehicle} 
            onCancel={() => setIsEditDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Delete Vehicle Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Vehicle</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteVehicle}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleDetails;
