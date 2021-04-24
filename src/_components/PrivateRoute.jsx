import React from "react";
import { Route } from "react-router-dom";
import { PrivateLayout } from "./PrivateLayout";

export const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={
        (props) => (
          <PrivateLayout>
            <Component {...props} />
          </PrivateLayout>
        )
      }
    />
  );
};
