// 로또의 발행을 담당하는 클래스
import { Random } from "@woowacourse/mission-utils";
import { LottoStoreConfig } from "../constants/config.js";

export class LottoStore {

    constructor() {
        this.issuedLottos = [];
    }

    generateLotto(lottoCount) {
        for (let i = 0; i < lottoCount; i++) {
            const lotto = Random.pickUniqueNumbersInRange(LottoStoreConfig.START_NUMBER, LottoStoreConfig.END_NUMBER, LottoStoreConfig.UNIQUE_NUMBER);
            this.issuedLottos.push(lotto);
        }
        return this.issuedLottos;
    }
}