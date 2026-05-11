import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product("1", "Product A", 10.0);
const product2 = new Product("2", "Product B", 20.0);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit test list product use case", () => {
  it("should list all products", async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });

  it("should return an empty list when there are no products", async () => {
    const repository = MockRepository();
    repository.findAll.mockReturnValue(Promise.resolve([]));
    const useCase = new ListProductUseCase(repository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(0);
  });
});
