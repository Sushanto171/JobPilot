import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { fastify } from "../src/app";
import { BcryptHelper } from "../src/app/helpers/bcrypt";
import { UserValidation } from "../src/app/modules/users/user.validation";
import { AppError } from "../src/app/utils/AppError";

describe("backend helpers", () => {
  it("hashes passwords and compares them correctly", async () => {
    const password = "strong-password";
    const hash = await BcryptHelper.hashPassword(password);

    assert.notEqual(hash, password);
    assert.equal(await BcryptHelper.comparePasswords(password, hash), true);
    assert.equal(
      await BcryptHelper.comparePasswords("strong-password", hash),
      false,
    );
  });

  it("creates an AppError with its message and status code", () => {
    const error = new AppError("Not found", 404);

    assert.equal(error.name, "AppError");
    assert.equal(error.message, "Not found");
    assert.equal(error.statusCode, 404);
  });

  it("accepts valid user input and rejects invalid user input", () => {
    const validation = new UserValidation();

    assert.equal(
      validation.createSchema.safeParse({
        name: "Ada Lovelace",
        email: "ada@example.com",
        password: "secret123",
      }).success,
      true,
    );
    assert.equal(
      validation.createSchema.safeParse({
        name: "",
        email: "invalid-email",
        password: "short",
      }).success,
      false,
    );
  });
});

describe("HTTP application", () => {
  it("reports that the server is running", async () => {
    const response = await fastify.inject({ method: "GET", url: "/" });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), {
      success: true,
      message: "Server is running..",
    });
  });

  it("returns validation errors for an invalid user payload", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/v1/users",
      payload: {
        name: "",
        email: "invalid-email",
        password: "short",
      },
    });

    assert.equal(response.statusCode, 422);
    const body = response.json();
    assert.equal(body.success, false);
    assert.equal(body.message, "Validation failed");
    assert.equal(body.data.length, 4);
  });
});
