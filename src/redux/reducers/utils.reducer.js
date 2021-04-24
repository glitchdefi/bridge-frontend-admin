import { ACTION_CONST } from "../../_constants/action";
const initialState = {
    blocking: false,
    alertLink: {
        type: '',
        url: '',
        message: ''
    },
}
export default (state = initialState, action) => {

    switch (action.type) {

        case ACTION_CONST.REQUEST_SUBMIT:
            return {
                ...state,
                blocking: true,
            }

        case ACTION_CONST.REQUEST_DONE:
            return {
                ...state,
                blocking: false,
            }
        case ACTION_CONST.CLICK_LEFT_BAR_ACTIVE:
            return {
                ...state,
                leftBarActive: !state.leftBarActive,
            }
        case ACTION_CONST.ALERT_LINK:
            return {
                ...state,
                alertLink: {
                    type: action.alertType,
                    url: action.alertUrl,
                    message: action.alertMessage
                }
            };
        case ACTION_CONST.ALERT_LINK_CLEAR:
            return {
                ...state,
                alertLink: {
                    type: '',
                    url: '',
                    message: ''
                }
            };
        default:
            return state
    }
}