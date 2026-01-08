import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const runException = async (input) => {
  // given
  const logSpy = getLogSpy();

  const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5];
  const INPUT_NUMBERS_TO_END = ["500", "1,2,3,4,5", "6"];

  mockRandoms([RANDOM_NUMBERS_TO_END]);
  mockQuestions([input, ...INPUT_NUMBERS_TO_END]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
};

describe("로또 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("기능 테스트", async () => {
    // given
    const logSpy = getLogSpy();

    mockRandoms([
      [8, 11, 13, 21, 22],
      [1, 3, 6, 14, 22],
    ]);
    mockQuestions(["1000", "1,2,3,4,5", "6"]);

    // when
    const app = new App();
    await app.run();

    // then
    const logs = [
      "2개를 구매했습니다.",
      "[8, 11, 13, 21, 22]",
      "[1, 3, 6, 14, 22]",
      "당첨 통계",
      "5개 일치 (100,000,000원) - 0개",
      "4개 일치, 보너스 번호 일치 (10,000,000원) - 0개",
      "4개 일치 (1,500,000원) - 0개",
      "3개 일치, 보너스 번호 일치 (500,000원) - 0개",
      "2개 일치, 보너스 번호 일치 (5,000원) - 1개",
      "0개 일치 (0원) - 1개",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("예외 테스트", async () => {
    await runException("500j");
  });
});
