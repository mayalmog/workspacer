import { Route, Routes } from "react-router-dom";
import routes from "./routes";

import { useEffect } from "react";
import { deskService } from "./services/desk.service.js";
import { useDispatch } from "react-redux";
import { setWeeks, setWeek } from "./store/desk/deskSlice";
import { setUsers } from "./store/user/userSlice";

import { AppHeader } from "./cmps/app-header";

export const RootCmp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const weekStartDate = deskService.getWeekStartDate();
    dispatch(setWeeks());
    dispatch(setWeek(weekStartDate));
    dispatch(setUsers());
  }, [dispatch]);

  return (
    <section className="root-cmp">
      <AppHeader />
      <main>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact
              element={route.element}
              path={route.path}
            />
          ))}
        </Routes>
      </main>
    </section>
  );
};
