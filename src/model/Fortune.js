import { Random } from "@woowacourse/mission-utils";
import { FORTUNE_MESSAGES } from "../constants/messages.js";
import { fortuneConfig } from "../constants/config.js";

export default function fortune(isFortuneMessage) {
    if (isFortuneMessage == 'Y' || 'y'){
        const index = Random.pickUniqueNumbersInRange(fortuneConfig.START_NUMBER, fortuneConfig.END_NUMBER, fortuneConfig.UNIQUE_NUMBER);
        const message = FORTUNE_MESSAGES[index];

        return message;
    }
}