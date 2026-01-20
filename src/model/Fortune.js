import { Random } from "@woowacourse/mission-utils";
import { FORTUNE_MESSAGES } from "../constants/messages.js";

export default function fortune(isFortuneMessage) {
    if (isFortuneMessage == 'Y' || 'y'){
        const index = Random.pickUniqueNumbersInRange(1, 5, 1);
        const message = FORTUNE_MESSAGES[index];

        return message;
    }
}