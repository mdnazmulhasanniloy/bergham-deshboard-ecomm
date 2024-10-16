import * as z from "zod";

const editShopSchema = z.object({
  shopName: z
    .string({ required_error: "Shop name is required" })
    .min(1, { message: "Shop name must be longer" }),
  licenseNumber: z
    .string({ required_error: "License number is required" })
    .min(1, { message: "Please enter valid license number" }),
});

export const shopValidationSchema = {
  editShopSchema,
};
