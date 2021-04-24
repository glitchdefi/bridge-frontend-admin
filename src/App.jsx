import React from "react";
import { Router, Switch} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PrivateRoute } from "./_components/PrivateRoute";
import { actAlertClear, actAlertLinkClear } from "./redux/action";
import { history } from "./_utils/history";
import HomePage from "./pages/HomePage";

const App = (props) => {
  const { utils, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  toggleAlert(true);

  window.setTimeout(function () {
    toggleAlert(false);
    if (alert && JSON.stringify(alert) != JSON.stringify({})) {
      dispatch(actAlertClear());
    }

    if (utils.alertLink && utils.alertLink.type.trim().length > 0) {
      dispatch(actAlertLinkClear());
    }
  }, 5000);

  React.useEffect(() => {
  
  }, []);


  return (
    <>
      {alert.message && (
        <div id="toast-container" className="toast-top-right">
          <div id="toast-id" className={`toast toast-${alert.type}`}>
            <div className="toast-message">
              <div>
                <div>{alert.message}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {utils.alertLink.url.length > 0 && (
        <a
          onClick={() => dispatch(actAlertLinkClear())}
          href={utils.alertLink.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div id="toast-container" className="toast-top-right">
            <div
              id="toast-id"
              className={`toast toast-${utils.alertLink.type}`}
            >
              <div className="toast-message">
                <div>
                  <div>{utils.alertLink.message}</div>
                </div>
              </div>
            </div>
          </div>
        </a>
      )}

      <Router history={history}>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={HomePage}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;

function toggleAlert(isShow) {
  var alertMsg = document.getElementById("toast-container");
  var alertIdMsg = document.getElementById("toast-id");

  // Prevent link alert is dismiss
  if (alertMsg && alertMsg.parentElement.nodeName === "A") {
    return;
  }

  if (alertMsg) {
    alertMsg.style.display = isShow ? "block" : "none";
  }
  if (alertIdMsg) {
    alertIdMsg.style.opacity = isShow ? 1 : 0;
  }
}
