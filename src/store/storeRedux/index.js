import store from "../storeRedux/store/index";
import {
    dataLoadingFlag,
    addTimeStamp,
} from "../js/actions/index";

window.store = store;
window.dataLoadingFlag = dataLoadingFlag;
window.addTimeStamp = addTimeStamp;