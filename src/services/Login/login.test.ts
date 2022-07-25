import axios from "axios";
import { login } from "./login";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("test for login service", () => {
  it("returns token when API call is successful", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        success: true,
        token: "Bearer 4Jku5i",
      },
    });

    const response = await login({
      email: "janaki@gmail.com",
      password: "234r44",
    });

    expect(response).toEqual({
      success: true,
      token: "Bearer 4Jku5i",
    });
  });

  it("returns Error Message when API call fails", async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        data: {
          success: false,
          errorMessage: "Password is incorrect",
        },
      },
    });
    mockedAxios.isAxiosError.mockImplementation((payload) => true);

    const response = await login({
      email: "janaki@gmail.com",
      password: "234r44",
    });
    expect(response).toEqual({
      success: false,
      errorMessage: "Password is incorrect",
    });
    expect(axios.isAxiosError).toBeCalledTimes(1);
  });

  it("returns Error Message for errors other than API error", async () => {
    const response = await login({
      email: "janaki",
      password: "234r44",
    });
    expect(response).toEqual({
      success: false,
      errorMessage: "Something went wrong",
    });
  });
});
