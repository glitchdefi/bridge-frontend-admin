import { fork, all } from 'redux-saga/effects';
import { watchSubmitGetWallets, watchSubmitWalletForm, watchDeleteWallet } from './walletSaga';
export default function* rootSaga() {
    yield all([
        fork(watchSubmitGetWallets),
        fork(watchSubmitWalletForm),
        fork(watchDeleteWallet)
    ]);
}