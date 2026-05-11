import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const useCase = new ListProductUseCase(productRepository);

    const product1 = new Product("1", "Product A", 10.0);
    const product2 = new Product("2", "Product B", 20.0);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0]).toEqual({
      id: "1",
      name: "Product A",
      price: 10.0,
    });
    expect(output.products[1]).toEqual({
      id: "2",
      name: "Product B",
      price: 20.0,
    });
  });

  it("should return an empty list when there are no products", async () => {
    const productRepository = new ProductRepository();
    const useCase = new ListProductUseCase(productRepository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(0);
  });
});
