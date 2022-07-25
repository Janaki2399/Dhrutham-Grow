import { ACTIONTYPE, State } from "../data/dataReducer.types";
import { dataReducer } from "./dataReducer";

describe("testing data reducer", () => {
  it("loads the quiz data", () => {
    const initialState: State = {
      questions: [],
    };
    const action: ACTIONTYPE = {
      type: "SET_DATA",
      payload: {
        questions: [
          {
            _id: "2323",
            topic: "Carnatic Ragams",
            question: "How many MelaKartha Ragas are there?",
            points: 2,
            level: "easy",
            isAttempted: false,
            options: [
              {
                text: "72",
                isRight: true,
                isSelected: false,
              },
              {
                text: "93",
                isRight: true,
                isSelected: false,
              },
              {
                text: "65",
                isRight: false,
                isSelected: false,
              },
              {
                text: "42",
                isRight: false,
                isSelected: false,
              },
            ],
          },
        ],
      },
    };

    const state = dataReducer(initialState, action);

    expect(state).toEqual({
      questions: [
        {
          _id: "2323",
          topic: "Carnatic Ragams",
          question: "How many MelaKartha Ragas are there?",
          points: 2,
          level: "easy",
          isAttempted: false,
          options: [
            {
              text: "72",
              isRight: true,
              isSelected: false,
            },
            {
              text: "93",
              isRight: true,
              isSelected: false,
            },
            {
              text: "65",
              isRight: false,
              isSelected: false,
            },
            {
              text: "42",
              isRight: false,
              isSelected: false,
            },
          ],
        },
      ],
    });
  });
  it("keeps track of the option selected by the user", () => {
    const initialState: State = {
      questions: [
        {
          _id: "1223",
          topic: "Carnatic Ragams",
          question: "How many MelaKartha Ragas are there?",
          points: 2,
          isAttempted: false,
          level: "easy",
          options: [
            {
              text: "72",
              isRight: true,
              isSelected: false,
            },
            {
              text: "93",
              isRight: false,
              isSelected: false,
            },
            {
              text: "65",
              isRight: false,
              isSelected: false,
            },
            {
              text: "42",
              isRight: false,
              isSelected: false,
            },
          ],
        },
      ],
    };
    const action: ACTIONTYPE = {
      type: "UPDATE_OPTION_STATE",
      payload: {
        optionIndex: 1,
        questionIndex: 0,
      },
    };

    const state = dataReducer(initialState, action);

    expect(state).toEqual({
      questions: [
        {
          _id: "1223",
          topic: "Carnatic Ragams",
          question: "How many MelaKartha Ragas are there?",
          points: 2,
          isAttempted: true,
          level: "easy",
          options: [
            {
              text: "72",
              isRight: true,
              isSelected: false,
            },
            {
              text: "93",
              isRight: false,
              isSelected: true,
            },
            {
              text: "65",
              isRight: false,
              isSelected: false,
            },
            {
              text: "42",
              isRight: false,
              isSelected: false,
            },
          ],
        },
      ],
    });
  });
});
