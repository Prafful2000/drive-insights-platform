
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Vehicle } from '@/utils/mockData';
import { toast } from '@/hooks/use-toast';

interface VehicleFormProps {
  vehicle?: Vehicle;
  onSubmit?: (data: Vehicle) => void;
  onCancel?: () => void;
}

const formSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().min(1900, 'Year must be 1900 or later').max(new Date().getFullYear() + 1)
  ),
  licensePlate: z.string().min(1, 'License plate is required'),
  fuelType: z.enum(['Gasoline', 'Diesel', 'Electric', 'Hybrid']),
  imageUrl: z.string().optional(),
  lastUpdated: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const VehicleForm = ({ vehicle, onSubmit, onCancel }: VehicleFormProps) => {
  const navigate = useNavigate();
  const isEditMode = !!vehicle;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: vehicle?.id || '',
      userId: vehicle?.userId || 'user1',
      make: vehicle?.make || '',
      model: vehicle?.model || '',
      year: vehicle?.year || currentYear,
      licensePlate: vehicle?.licensePlate || '',
      fuelType: vehicle?.fuelType || 'Gasoline',
      imageUrl: vehicle?.imageUrl || '',
      lastUpdated: vehicle?.lastUpdated || new Date().toISOString().split('T')[0],
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      const vehicleData = {
        ...data,
        id: data.id || `v${Date.now()}`,
        userId: data.userId || 'user1',
        lastUpdated: new Date().toISOString().split('T')[0],
      } as Vehicle;
      
      if (onSubmit) {
        onSubmit(vehicleData);
      }
      
      toast({
        title: isEditMode ? 'Vehicle updated' : 'Vehicle added',
        description: `${data.year} ${data.make} ${data.model} has been ${isEditMode ? 'updated' : 'added'}.`,
      });
      
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Toyota" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Corolla" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Gasoline">Gasoline</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License Plate</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. ABC-123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Optional image URL" {...field} />
                </FormControl>
                <FormDescription>
                  Leave empty to use default vehicle image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel || (() => navigate('/dashboard'))}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Vehicle' : 'Add Vehicle'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VehicleForm;
