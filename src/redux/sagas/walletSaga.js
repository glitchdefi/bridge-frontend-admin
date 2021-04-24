import { takeLatest, put, call } from "redux-saga/effects";
import { ACTION_CONST } from "../../_constants/action";
import { deleteWallet, getListWallets, submitWallet } from "../services/wallet";

function* handleGetWallets() {
    try {
        const res = yield call(getListWallets);
        if (res.status == 200) {
            yield put({
                type: ACTION_CONST.GET_WALLETS_SUCCESS,
                data: {
                    projects: res.data
                },
            });
        }
    } catch (error) {
        return null;
    }
}

function* handleSubmitWalletForm(data) {
    const res = yield call(submitWallet, data);
    if (res.status == 200) {
        yield put({
            type: ACTION_CONST.SUBMIT_WALLET_SUCCESS,
            data: data,
        });
    }
}

function* handleDeleteWallet(data) {
    const res = yield call(deleteWallet, data);
    if (res.status == 200) {
        yield put({
            type: ACTION_CONST.DELETE_WALLET_SUCCESS,
            data: data,
        });
    }
}


export function* watchSubmitGetWallets() {
    yield takeLatest(
        ACTION_CONST.SUBMIT_GET_WALLETS,
        handleGetWallets
    );
}

export function* watchSubmitWalletForm() {
    yield takeLatest(
        ACTION_CONST.SUBMIT_WALLET_FORM,
        handleSubmitWalletForm
    );
}
export function* watchDeleteWallet() {
    yield takeLatest(
        ACTION_CONST.DELETE_WALLET,
        handleDeleteWallet
    );
}