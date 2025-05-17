
// Mock user data
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  imageUrl?: string;
  lastUpdated: string;
}

export interface DailyLog {
  id: string;
  vehicleId: string;
  date: string;
  fuelConsumption: number; // liters
  co2Emissions: number; // g/km
  mileage: number; // km/l
  distanceCovered: number; // km
  engineTemp?: number; // celsius
  engineRpm?: number; // rpm
  alertType?: 'none' | 'low' | 'medium' | 'high';
  notes?: string;
}

export const currentUser: User = {
  id: "user1",
  name: "John Anderson",
  email: "john.anderson@example.com",
  avatarUrl: "/placeholder.svg"
};

export const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    userId: "user1",
    make: "Toyota",
    model: "Prius",
    year: 2019,
    licensePlate: "ECO-2019",
    fuelType: "Hybrid",
    imageUrl: "/placeholder.svg",
    lastUpdated: "2023-05-14"
  },
  {
    id: "v2",
    userId: "user1",
    make: "Tesla",
    model: "Model 3",
    year: 2021,
    licensePlate: "ELEC-21",
    fuelType: "Electric",
    imageUrl: "/placeholder.svg",
    lastUpdated: "2023-05-15"
  },
  {
    id: "v3",
    userId: "user1",
    make: "Ford",
    model: "F-150",
    year: 2020,
    licensePlate: "FORD-20",
    fuelType: "Gasoline",
    imageUrl: "/placeholder.svg",
    lastUpdated: "2023-05-13"
  },
  {
    id: "v4",
    userId: "user1",
    make: "BMW",
    model: "X5",
    year: 2022,
    licensePlate: "BMW-22",
    fuelType: "Diesel",
    imageUrl: "/placeholder.svg",
    lastUpdated: "2023-05-12"
  }
];

// Generate random data for the past 7 days for each vehicle
const generateDailyLogs = (vehicleId: string, fuelType: string): DailyLog[] => {
  const logs: DailyLog[] = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Adjust values based on fuel type
    let fuelConsumption = 0;
    let co2Emissions = 0;
    let mileage = 0;
    
    if (fuelType === 'Gasoline') {
      fuelConsumption = 7 + Math.random() * 3; // 7-10 liters
      co2Emissions = 130 + Math.random() * 40; // 130-170 g/km
      mileage = 10 + Math.random() * 4; // 10-14 km/l
    } else if (fuelType === 'Diesel') {
      fuelConsumption = 5 + Math.random() * 3; // 5-8 liters
      co2Emissions = 120 + Math.random() * 30; // 120-150 g/km
      mileage = 14 + Math.random() * 6; // 14-20 km/l
    } else if (fuelType === 'Hybrid') {
      fuelConsumption = 3 + Math.random() * 2; // 3-5 liters
      co2Emissions = 80 + Math.random() * 20; // 80-100 g/km
      mileage = 18 + Math.random() * 6; // 18-24 km/l
    } else if (fuelType === 'Electric') {
      fuelConsumption = 0; // No direct fuel consumption
      co2Emissions = 0; // No direct emissions
      mileage = 5 + Math.random() * 1; // 5-6 km/kWh (equivalent)
    }
    
    const distanceCovered = 20 + Math.random() * 40; // 20-60 km
    
    logs.push({
      id: `log-${vehicleId}-${i}`,
      vehicleId,
      date: date.toISOString().split('T')[0],
      fuelConsumption,
      co2Emissions,
      mileage,
      distanceCovered,
      engineTemp: 85 + Math.random() * 15, // 85-100 celsius
      engineRpm: 800 + Math.random() * 1200, // 800-2000 rpm
      alertType: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'medium' : 'low') : 'none'
    });
  }
  
  return logs;
};

export const mockDailyLogs: DailyLog[] = [
  ...generateDailyLogs("v1", "Hybrid"),
  ...generateDailyLogs("v2", "Electric"),
  ...generateDailyLogs("v3", "Gasoline"),
  ...generateDailyLogs("v4", "Diesel")
];

// Helper functions to get data for specific vehicles
export const getVehicleById = (id: string): Vehicle | undefined => {
  return mockVehicles.find(vehicle => vehicle.id === id);
};

export const getLogsByVehicleId = (vehicleId: string): DailyLog[] => {
  return mockDailyLogs.filter(log => log.vehicleId === vehicleId);
};

// Calculate summary statistics for a vehicle
export interface VehicleStats {
  avgFuelConsumption: number;
  avgCo2Emissions: number;
  avgMileage: number;
  totalDistance: number;
  alertsCount: number;
}

export const getVehicleStats = (vehicleId: string): VehicleStats => {
  const logs = getLogsByVehicleId(vehicleId);
  
  const stats: VehicleStats = {
    avgFuelConsumption: 0,
    avgCo2Emissions: 0,
    avgMileage: 0,
    totalDistance: 0,
    alertsCount: 0
  };
  
  if (logs.length === 0) return stats;
  
  logs.forEach(log => {
    stats.avgFuelConsumption += log.fuelConsumption;
    stats.avgCo2Emissions += log.co2Emissions;
    stats.avgMileage += log.mileage;
    stats.totalDistance += log.distanceCovered;
    
    if (log.alertType !== 'none') {
      stats.alertsCount += 1;
    }
  });
  
  stats.avgFuelConsumption = parseFloat((stats.avgFuelConsumption / logs.length).toFixed(2));
  stats.avgCo2Emissions = parseFloat((stats.avgCo2Emissions / logs.length).toFixed(2));
  stats.avgMileage = parseFloat((stats.avgMileage / logs.length).toFixed(2));
  stats.totalDistance = parseFloat(stats.totalDistance.toFixed(2));
  
  return stats;
};
