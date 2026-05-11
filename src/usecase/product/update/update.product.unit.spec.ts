import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product A", 10.0);

const input = {
  id: product.id,
  name: "Product A Updated",
  price: 20.0,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    await expect(
      updateProductUseCase.execute({ ...input, name: "" })
    ).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is negative", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    await expect(
      updateProductUseCase.execute({ ...input, price: -1 })
    ).rejects.toThrow("Price must be greater than zero");
  });
});
