import axios from "axios";
import { getGameQuestions } from "./getQuestions";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("test for get question service", () => {
  it("returns questions of a particular quiz when API call is successful", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        game: {
          questions: [
            {
              topic: "Carnatic Ragams",
              question: "How many MelaKartha Ragas are there?",
              points: 2,
              level: "easy",
              options: [
                {
                  text: "72",
                  isRight: true,
                },
                {
                  text: "93",
                  isRight: false,
                },
                {
                  text: "65",
                  isRight: false,
                },
                {
                  text: "42",
                  isRight: false,
                },
              ],
            },
          ],
          totalScore: 25,
        },
      },
    });
    const token = "Bearer 4Jku5i";
    const questionList = await getGameQuestions("123", token);

    expect(questionList).toEqual({
      questions: [
        {
          topic: "Carnatic Ragams",
          question: "How many MelaKartha Ragas are there?",
          points: 2,
          level: "easy",
          options: [
            {
              text: "72",
              isRight: true,
            },
            {
              text: "93",
              isRight: false,
            },
            {
              text: "65",
              isRight: false,
            },
            {
              text: "42",
              isRight: false,
            },
          ],
        },
      ],
      totalScore: 25,
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
    const questionList = await getGameQuestions("123", token);
    expect(questionList).toEqual({
      success: false,
      errorMessage: "Something went wrong",
    });
    expect(axios.isAxiosError).toBeCalledTimes(1);
  });
  it("returns Error Message for errors other than API error", async () => {
    const token = "Bearer 4Jku5i";
    const questionList = await getGameQuestions("123", token);
    expect(questionList).toEqual({
      success: false,
      errorMessage: "Something went wrong",
    });
  });
});
