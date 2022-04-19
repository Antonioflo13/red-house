// const searchAvaiableDate = (
//   notAvaiableDates,
//   checkInDate,
//   checkOutDate,
//   operation,
//   reservationDays
// ) => {
//   const dayInMilliseconds = 86400000;
//   let newCheckInDate = checkInDate;
//   let days = reservationDays;
//   if (operation === "before") {
//     newCheckInDate = newCheckInDate - dayInMilliseconds;
//     if (notAvaiableDates.includes(newCheckInDate)) {
//       searchAvaiableDate(
//         notAvaiableDates,
//         newCheckInDate,
//         checkOutDate,
//         "before",
//         days
//       );
//     } else {
//       let newCheckoutDate = newCheckInDate + days * dayInMilliseconds;
//       if (notAvaiableDates.includes(newCheckoutDate)) {
//         searchAvaiableDate(
//           notAvaiableDates,
//           newCheckInDate,
//           checkOutDate,
//           "before",
//           days
//         );
//       } else {
//         setPrevNewCheckIn(new Date(newCheckInDate).toLocaleDateString());
//         setPrevNewCheckOut(new Date(newCheckoutDate).toLocaleDateString());
//       }
//     }
//   } else {
//     newCheckInDate = newCheckInDate + dayInMilliseconds;
//     if (notAvaiableDates.includes(newCheckInDate)) {
//       searchAvaiableDate(
//         notAvaiableDates,
//         newCheckInDate,
//         checkOutDate,
//         "after",
//         days
//       );
//     } else {
//       let newCheckoutDate = newCheckInDate + days * dayInMilliseconds;
//       if (notAvaiableDates.includes(newCheckoutDate)) {
//         searchAvaiableDate(
//           notAvaiableDates,
//           newCheckInDate,
//           checkOutDate,
//           "after",
//           days
//         );
//       } else {
//         setNextNewCheckIn(new Date(newCheckInDate).toLocaleDateString());
//         setNextNewCheckOut(new Date(newCheckoutDate).toLocaleDateString());
//       }
//     }
//   }
// };
