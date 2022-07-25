import axios from "axios";
import { getProgressList } from "./getProgressList";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("test for get progress list service", () => {
  it("returns progress list when API call is successful", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        progressList: {
          list: [
            {
              _id: "22323",
              name: "Carnatic Ragams",
              thumbnail: "image1.jpg",
              numOfAttempts: 8,
            },
          ],
        },
      },
    });
    const token = "Bearer 4Jku5i";
    const progressList = await getProgressList(token);

    expect(progressList).toEqual([
      {
        _id: "22323",
        name: "Carnatic Ragams",
        thumbnail: "image1.jpg",
        numOfAttempts: 8,
      },
    ]);
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
    const progressList = await getProgressList(token);
    expect(progressList).toEqual({
      success: false,
      errorMessage: "Something went wrong",
    });
    expect(axios.isAxiosError).toBeCalledTimes(1);
  });
  it("returns Error Message for errors other than API error", async () => {
    const token = "Bearer 4Jku5i";
    const progressList = await getProgressList(token);
    expect(progressList).toEqual({
      success: false,
      errorMessage: "Something went wrong",
    });
  });
});
