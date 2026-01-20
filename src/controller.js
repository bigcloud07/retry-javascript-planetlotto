import { INPUT_UNIT_AMOUNT } from "./constants/config.js";
import fortune from "./model/Fortune.js";
import { LottoResult } from "./model/LottoResult.js";
import { LottoStore } from "./model/LottoStore.js";
import { inputErrorHandler } from "./utils/errorHandler.js";
import { validateBonusNumberRange, validateDuplicatedNumber, validateUnitAmount, validateLottoNumbersRange, validateLottoNumberLength, validateDuplicatedBonusNumber } from "./utils/validator.js";
import { InputView, OutputView } from "./view.js";

export default async function controller() {
    const lottoStore = new LottoStore();
    const lottoResult = new LottoResult();

    const isFortuneMessage = await InputView.askFortuneMessage();
    const fortuneMessage = fortune(isFortuneMessage);
    OutputView.printFortuneMessage(fortuneMessage);

    const amount = await inputErrorHandler(async () => {
        const inputAmount = await InputView.askAmount();
        validateUnitAmount(inputAmount);
        return inputAmount;
    }, OutputView);

    const lottoCount = amount / INPUT_UNIT_AMOUNT;
    const issuedLottos = lottoStore.generateLotto(lottoCount);
    OutputView.printPurchasedLottos(issuedLottos);

    const winningLotto = await inputErrorHandler(async () => {
        const inputWinningLotto = await InputView.askWinningLotto();
        validateLottoNumbersRange(inputWinningLotto);
        validateLottoNumberLength(inputWinningLotto);
        validateDuplicatedNumber(inputWinningLotto);
        return inputWinningLotto;
    }, OutputView);

    const bonusNumber = await inputErrorHandler(async () => {
        const inputBounsNumber = await InputView.askBonusNumber();
        validateBonusNumberRange(inputBounsNumber);
        validateDuplicatedBonusNumber(winningLotto, inputBounsNumber);
        return inputBounsNumber;
    }, OutputView)

    const matchIndex = lottoResult.getMatchCount(issuedLottos, winningLotto, bonusNumber);
    OutputView.printResult(matchIndex)

    const profit = lottoResult.getProfit().toLocaleString();
    OutputView.printProfit(profit);

    const profitRate = lottoResult.getProfitRate(amount);
    OutputView.printProfitRate(profitRate);
}