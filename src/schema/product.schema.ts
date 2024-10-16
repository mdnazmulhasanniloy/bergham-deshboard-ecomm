import * as z from "zod";

export const addProductValidation = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
  shortDescription: z
    .string({ required_error: "Short description is required" })
    .min(20, { message: "Description must be at least 20 characters long." }),
  category: z
    .string({
      required_error: "Product category is required",
    })
    .min(1, "Product category is required"),

  brand: z.string({ required_error: "Brand is required" }).min(1, {
    message: "Brand name should be valid for better user interaction",
  }),
  stock: z.coerce
    .number({
      required_error: "Stock quantity is required",
    })
    .min(1, "Stock quantity must be at least 1"),

  price: z.coerce
    .number({
      required_error: "Price is required",
    })
    .min(0.01, "Price must be at least 0.01"),

  discount: z.coerce
    .number({
      required_error: "Discount is required",
    })
    .min(0)
    .max(100, "Discount must be between 0 and 100"),

  // Optional fields
  size: z.array(z.string()).optional(),
  color: z
    .array(z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format"))
    .optional(),
});
