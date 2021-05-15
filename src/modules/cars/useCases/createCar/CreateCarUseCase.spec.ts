import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with another already existing license plate", async () => {
    await createCarUseCase.execute({
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car Name 2",
        description: "Car Description",
        daily_rate: 100,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category",
      })
    ).rejects.toEqual(new AppError("Car already exists."));
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "ABCD-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    expect(car.available).toBe(true);
  });
});
