
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Vehicle } from '@/utils/mockData';

interface VehicleCardProps {
  vehicle: Vehicle;
  onDelete?: (id: string) => void;
}

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

const VehicleCard = ({ vehicle, onDelete }: VehicleCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg animate-fade-in">
      <div className="relative h-36 bg-muted">
        {vehicle.imageUrl ? (
          <img
            src={vehicle.imageUrl}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-sky-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12 text-muted-foreground opacity-50"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <circle cx="17" cy="17" r="2"></circle>
            </svg>
          </div>
        )}
        <Badge 
          className={`absolute top-2 right-2 ${getFuelTypeColor(vehicle.fuelType)} text-white`}
        >
          {vehicle.fuelType}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-xl">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          License: {vehicle.licensePlate}
        </p>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">
          Last updated: {vehicle.lastUpdated}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/vehicle/${vehicle.id}`}>
            View Details
          </Link>
        </Button>
        {onDelete && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(vehicle.id)}
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
          >
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
