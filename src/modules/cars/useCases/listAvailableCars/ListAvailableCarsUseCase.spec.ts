import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 300.0,
      license_plate: "ABC-1212",
      fine_amount: 200.0,
      brand: "Car Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 300.0,
      license_plate: "ABC-1212",
      fine_amount: 200.0,
      brand: "Car Brand Test",
      category_id: "category_id",
    });

    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 300.0,
      license_plate: "ABC-1212",
      fine_amount: 200.0,
      brand: "Not Car Brand Test",
      category_id: "category_id",
    });

    const [cars] = await listAvailableCarsUseCase.execute({
      brand: "Car Brand Test",
    });

    expect(cars).toHaveProperty("id");
    expect(cars.available).toEqual(true);
    expect(cars.brand).toEqual(car.brand);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 300.0,
      license_plate: "ABC-1233",
      fine_amount: 200.0,
      brand: "Car Brand Test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car description",
      daily_rate: 300.0,
      license_plate: "ABC-1233",
      fine_amount: 200.0,
      brand: "Car Brand Test",
      category_id: "category_id1",
    });

    await carsRepositoryInMemory.create({
      name: "Car5",
      description: "Car description",
      daily_rate: 300.0,
      license_plate: "ABC-1233",
      fine_amount: 200.0,
      brand: "Not Car Brand Test",
      category_id: "category_id1",
    });

    const [cars] = await listAvailableCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toHaveProperty("id");
    expect(cars.available).toEqual(true);
    expect(cars.category_id).toEqual(car.category_id);
  });
});
