
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import VehicleCard from '@/components/VehicleCard';
import VehicleForm from '@/components/VehicleForm';
import StatCard from '@/components/StatCard';
import ChartComponent from '@/components/ChartComponent';
import { mockVehicles, mockDailyLogs, getVehicleStats, Vehicle } from '@/utils/mockData';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  
  // Calculate total statistics
  const totalStats = {
    totalVehicles: vehicles.length,
    totalDistance: mockDailyLogs.reduce((sum, log) => sum + log.distanceCovered, 0).toFixed(2),
    avgFuelConsumption: (mockDailyLogs.reduce((sum, log) => sum + log.fuelConsumption, 0) / mockDailyLogs.length).toFixed(2),
    totalAlerts: mockDailyLogs.filter(log => log.alertType !== 'none').length,
  };

  // Prepare chart data
  const prepareChartData = () => {
    const dateMap = new Map();
    
    mockDailyLogs.forEach(log => {
      if (!dateMap.has(log.date)) {
        dateMap.set(log.date, {
          name: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          fuelConsumption: 0,
          co2Emissions: 0,
          distance: 0,
          count: 0,
        });
      }
      
      const current = dateMap.get(log.date);
      current.fuelConsumption += log.fuelConsumption;
      current.co2Emissions += log.co2Emissions;
      current.distance += log.distanceCovered;
      current.count += 1;
    });
    
    // Calculate averages and sort by date
    return Array.from(dateMap.values())
      .map(item => ({
        name: item.name,
        fuelConsumption: parseFloat((item.fuelConsumption / item.count).toFixed(2)),
        co2Emissions: parseFloat((item.co2Emissions / item.count).toFixed(2)),
        distance: parseFloat((item.distance).toFixed(2)),
      }))
      .sort((a, b) => new Date(b.name).getTime() - new Date(a.name).getTime())
      .reverse();
  };

  const chartData = prepareChartData();

  const handleAddVehicle = (vehicle: Vehicle) => {
    setVehicles([...vehicles, vehicle]);
    setIsAddVehicleOpen(false);
  };

  const handleDeleteVehicle = (id: string) => {
    const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id);
    setVehicles(updatedVehicles);
    toast({
      title: 'Vehicle removed',
      description: 'The vehicle has been successfully removed.'
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="mb-4 md:mb-0">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link to="/reports">
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
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  Generate Report
                </Link>
              </Button>
              <Button size="sm" onClick={() => setIsAddVehicleOpen(true)}>
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
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                Add Vehicle
              </Button>
            </div>
          </div>

          {/* Stats summary */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-4">
            <StatCard
              title="Total Vehicles"
              value={totalStats.totalVehicles}
              icon={
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
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                  <circle cx="7" cy="17" r="2"></circle>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
              }
              color="primary"
            />
            <StatCard
              title="Total Distance"
              value={`${totalStats.totalDistance} km`}
              icon={
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
                  <path d="M12 2v20"></path>
                  <path d="m2 12 20 0"></path>
                </svg>
              }
              color="success"
            />
            <StatCard
              title="Avg Fuel Consumption"
              value={`${totalStats.avgFuelConsumption} L`}
              icon={
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
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              }
              color="warning"
            />
            <StatCard
              title="Open Alerts"
              value={totalStats.totalAlerts}
              icon={
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
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              }
              color="danger"
            />
          </div>

          {/* Charts */}
          <Tabs defaultValue="fuel" className="mt-6 space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="fuel">Fuel Consumption</TabsTrigger>
              <TabsTrigger value="emissions">CO₂ Emissions</TabsTrigger>
              <TabsTrigger value="distance">Distance</TabsTrigger>
            </TabsList>
            <TabsContent value="fuel">
              <ChartComponent
                title="Fuel Consumption Over Time"
                description="Average daily fuel consumption across all vehicles"
                data={chartData}
                type="line"
                dataKeys={[{ key: 'fuelConsumption', color: '#0EA5E9', name: 'Fuel (L)' }]}
                yAxisLabel="Liters"
                xAxisLabel="Date"
                height={300}
              />
            </TabsContent>
            <TabsContent value="emissions">
              <ChartComponent
                title="CO₂ Emissions Over Time"
                description="Average daily CO₂ emissions across all vehicles"
                data={chartData}
                type="line"
                dataKeys={[{ key: 'co2Emissions', color: '#F97316', name: 'CO₂ (g/km)' }]}
                yAxisLabel="g/km"
                xAxisLabel="Date"
                height={300}
              />
            </TabsContent>
            <TabsContent value="distance">
              <ChartComponent
                title="Distance Traveled"
                description="Daily distance traveled across all vehicles"
                data={chartData}
                type="bar"
                dataKeys={[{ key: 'distance', color: '#8B5CF6', name: 'Distance (km)' }]}
                yAxisLabel="Kilometers"
                xAxisLabel="Date"
                height={300}
              />
            </TabsContent>
          </Tabs>

          {/* Vehicles */}
          <h2 className="mt-8 mb-4 text-xl font-bold">Your Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {vehicles.map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                onDelete={handleDeleteVehicle}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Add Vehicle Dialog */}
      <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
            <DialogDescription>
              Enter the details of your vehicle to add it to your dashboard.
            </DialogDescription>
          </DialogHeader>
          <VehicleForm 
            onSubmit={handleAddVehicle} 
            onCancel={() => setIsAddVehicleOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
