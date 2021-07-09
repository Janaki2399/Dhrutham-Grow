import axios from "axios";
import { getGameRules } from "./getGameRules";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("test for get details service", () => {
  it("returns details of a particular quiz when API call is successful", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        details: {
          rules:
            "There are 6 questions out of which 3 are easy ,2 are medium ,1 is Hard.Easy Questions have 2 point.Medium Questions have 5 points.Hard Questions have 10 points",
          playtime: "5 minutes",
        },
      },
    });
    const token = "Bearer 4Jku5i";
    const details = await getGameRules("123", token);

    expect(details).toEqual({
      rules:
        "There are 6 questions out of which 3 are easy ,2 are medium ,1 is Hard.Easy Questions have 2 point.Medium Questions have 5 points.Hard Questions have 10 points",
      playtime: "5 minutes",
    });
  });
  it("returns Error Message when API call fails", async () => {
    mockedAxios.get.mockRejectedValue({
      response: {
        data: {
          success: false,
          errorMessage: "Something went wrong",
        },
      },
    });
    mockedAxios.isAxiosError.mockImplementation((payload) => true);

    const token = "Bearer 4Jku5i";
    const details = await getGameRules("123", token);

    expect(details).toEqual({
      success: false,
      errorMessage: "Something went wrong",
    });

    expect(axios.isAxiosError).toBeCalledTimes(1);
  });
  it("returns Error Message for errors other than API error", async () => {
    const token = "Bearer 4Jku5i";
    const details = await getGameRules("123", token);
    expect(details).toEqual({
      success: false,
      errorMessage: "Something went wrong",
    });
  });
});
