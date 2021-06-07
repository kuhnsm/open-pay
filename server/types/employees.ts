export interface employeeFind {
  deletionDate: {
    $exists: boolean;
  };
  $text?: {
    $search: string;
  };
}
