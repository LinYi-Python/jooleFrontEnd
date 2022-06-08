export interface Product {
  id: number;

  productType: string;

  manufacturer: string;

  series: string;

  model: string;

  type: string;

  application: string;

  mountingLocation: string;

  accessories: string;

  modelYear: string;

  airflow: string;
  powerMax: string;
  powerMin: string;
  operatingVoltageMax: string;
  operatingVoltageMin: string;
  fanSpeedMax: string;
  fanSpeedMin: string;
  numberOfFanSpeeds: string;

  soundAtMaxSpeed: string;
  fanSweepDiameter: string;
  heightMin: string;
  heightMax: string;
  weight: string;
  url: string;
}
