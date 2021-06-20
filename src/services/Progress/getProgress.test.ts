import axios from "axios";
import { getProgress } from "./getProgress";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("test for get progress service", () => {
  it("returns progress of a particular quiz when API call is successful", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        progress: {
          attemptDetails: [
            {
              _id: "123",
              score: 10,
              numberOfCorrectAnswers: 3,
              numberOfWrongAnswers: 3,
            },
          ],
          _id: "2234",
          quiz: "16789",
          numberOfAttempts: 8,
          highestScore: 8,
        },
      },
    });
    const token = "Bearer 4Jku5i";
    const progress = await getProgress("123", token);

    expect(progress).toEqual({
      attemptDetails: [
        {
          _id: "123",
          score: 10,
          numberOfCorrectAnswers: 3,
          numberOfWrongAnswers: 3,
        },
      ],
      _id: "2234",
      quiz: "16789",
      numberOfAttempts: 8,
      highestScore: 8,
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
    const progress = await getProgress("123", token);
    expect(progress).toEqual({
      success: false,
      errorMessage: "Something went wrong",
    });
    expect(axios.isAxiosError).toBeCalledTimes(1);
  });
  it("returns Error Message for errors other than API error", async () => {
    const token = "Bearer 4Jku5i";
    const progress = await getProgress("123", token);
    expect(progress).toEqual({
      success: false,
      errorMessage: "Something went wrong",
    });
  });
});
