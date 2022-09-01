import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWeeks, setWeek } from "../store/desk/deskSlice";
import { deskService } from "../services/desk.service";
import { DeskList } from "../cmps/desk/desk-list";

export const DeskPage = () => {
  const loggedinUser = useSelector((state) => state.user.loggedinUser);
  const weeks = useSelector((state) => state.desk.weeks);
  const week = useSelector((state) => state.desk.week);
  const [currDayName, setCurrDayName] = useState("Sunday");
  const currDay = deskService.getCurrDay(week, currDayName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedinUser) navigate("/");
  }, []);

  const onSetCurrDay = (dayName) => {
    setCurrDayName(dayName);
  };

  const onAddNextWeek = () => {
    deskService.addNextWeek();
    dispatch(setWeeks());
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    dispatch(setWeeks());
    dispatch(setWeek(value));
  };

  return (
    <section className="desk-page flex column justify-center align-center">
      <div className="select-container flex justify-center align-center">
        <p>Choose week by start date:</p>
        <FormControl fullWidth className="select">
          <InputLabel id="weeks">Week</InputLabel>
          <Select
            name="weeks"
            id="weeks"
            label="Week"
            onChange={handleChange}
            defaultValue=""
          >
            {weeks.map((week) => {
              return (
                <MenuItem value={week.startDate} key={week.id}>
                  {week.startDate}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {loggedinUser?.email === "admin@feuerblocks.com" && (
          <button
            className="btn btn-primary add-week-btn"
            onClick={onAddNextWeek}
          >
            Add new week
          </button>
        )}
      </div>
      <div className="weekday-btns flex justify-center align-center">
        {Object.keys(week).length &&
          week.days.map((day, idx) => (
            <button
              className={`${
                day.dayName === currDayName ? "currDay" : ""
              } btn btn-light`}
              key={`day-${idx}`}
              onClick={() => onSetCurrDay(day.dayName)}
            >
              {day.dayName}
            </button>
          ))}
      </div>
      <p>Date: {currDay.date}</p>
      <DeskList currDay={currDay} />
    </section>
  );
};
