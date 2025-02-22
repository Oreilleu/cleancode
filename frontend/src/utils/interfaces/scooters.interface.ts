export interface Scooter {
  id: string;
  model: string;
  maintenanceGapMonth: string;
  maintenanceUsageDay: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
