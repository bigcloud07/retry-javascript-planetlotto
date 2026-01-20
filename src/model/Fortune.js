import { Random } from "@woowacourse/mission-utils";
import { FORTUNE_MESSAGES, NO_FORTUNE_MESSAGE } from "../constants/messages.js";
import { fortuneConfig } from "../constants/config.js";

export default function fortune(input) {
    if (input === 'Y') {
        const index = Random.pickUniqueNumbersInRange(fortuneConfig.START_NUMBER, fortuneConfig.END_NUMBER, fortuneConfig.UNIQUE_NUMBER);
        const message = FORTUNE_MESSAGES[index];

        return message;
    } 
    if (input === 'N') {
        const message = NO_FORTUNE_MESSAGE;
        
        return message;
    }
}