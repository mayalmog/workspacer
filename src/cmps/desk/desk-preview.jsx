import { useSelector, useDispatch } from "react-redux";
import { MemberAvatar } from "../member-avatar";
import { bookDesk, cancelBooking } from "../../store/desk/deskSlice";

export const DeskPreview = ({ desk, currDay }) => {
  const loggedinUser = useSelector((state) => state.user.loggedinUser);
  const dispatch = useDispatch();

  const onBookDesk = () => {
    if (isUserBooked()) {
      return;
    } else {
      let updatedDesk = JSON.parse(JSON.stringify(desk));
      updatedDesk.user = loggedinUser;
      dispatch(bookDesk({ updatedDesk, currDay }));
    }
  };

  const onRemoveBooking = () => {
    if (isRemoveBtnShown) {
      dispatch(cancelBooking({ desk, currDay }));
    } else {
      console.log("You are not authorized to remove this booking");
    }
  };

  const isLoggedinUser = () => {
    return desk.user?.fullname === loggedinUser?.fullname;
  };

  const isLoggedinUserAdmin = () => {
    return loggedinUser?.email === "admin@feuerblocks.com";
  };

  const isRemoveBtnShown = () => {
    return desk.user && (isLoggedinUserAdmin() || isLoggedinUser());
  };

  const isUserBooked = () => {
    if (isLoggedinUserAdmin()) return false;
    return currDay.desks.some(
      (desk) => desk.user?.email === loggedinUser?.email
    );
  };

  return (
    <section
      className={`desk-${desk.id} ${desk.user ? "booked" : ""} ${
        isLoggedinUser() ? "marked" : ""
      } desk-preview flex column align-center justify-center`}
    >
      <p className="desk-id">Desk-{desk.id}</p>
      {desk.user && desk.user.email !== "admin@feuerblocks.com" && (
        <MemberAvatar size={"32"} user={desk.user} />
      )}

      {desk.user && <p>{desk.user.fullname}</p>}
      {((!desk.user && isLoggedinUserAdmin()) ||
        (!desk.user && !isUserBooked())) && (
        <button className="btn btn-primary" onClick={onBookDesk}>
          Book
        </button>
      )}
      {isRemoveBtnShown() && (
        <button className="btn btn-remove" onClick={onRemoveBooking}>
          Unbook
        </button>
      )}
    </section>
  );
};
