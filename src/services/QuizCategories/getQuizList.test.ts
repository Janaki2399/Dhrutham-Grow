import axios from "axios";
import { getQuizList } from "./getQuizList";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("test for get quiz list service", () => {
  it("returns quiz list when API call is successful", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        quizList: [
          {
            _id: "22323",
            name: "Carnatic Ragams",
            thumbnail: "image1.jpg",
            numOfQuestions: 8,
          },
        ],
      },
    });
    const quizList = await getQuizList();
    expect(quizList).toEqual([
      {
        _id: "22323",
        name: "Carnatic Ragams",
        thumbnail: "image1.jpg",
        numOfQuestions: 8,
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
    const quizList = await getQuizList();
    expect(quizList).toEqual({
      success: false,
      errorMessage: "Something went wrong",
    });
    expect(axios.isAxiosError).toBeCalledTimes(1);
  });
  it("returns Error Message for errors other than API error", async () => {
    const quizList = await getQuizList();
    expect(quizList).toEqual({
      success: false,
      errorMessage: "Something went wrong",
    });
  });
});
