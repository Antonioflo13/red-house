import styles from './SummaryReservation.module.css'

const SummaryReservation = (props) => {
  const {totalVisitors, selectedDates, reservationRange, totalPrice, price} = props;

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.summaryItemContainer}>
          <h3>Date</h3>
          <div>
            <span>{selectedDates?.checkIn}</span> -{" "}
            <span>{selectedDates?.checkOut}</span>
          </div>
        </div>
        <div className={styles.summaryItemContainer}>
          <h3>Ospiti</h3>
          <div>
            <span>{`${
              totalVisitors === 1
                ? `${totalVisitors} ospite`
                : `${totalVisitors} ospiti`
            }`}</span>
          </div>
        </div>
      </div>
      <div className={styles.summaryItemContainer}>
        <h3>Dettaglio Prezzo</h3>
        <div className="flex justify-content-between">
          <div>
            {price} x {reservationRange} giorni
          </div>
          <div>{totalPrice.toFixed(2)} €</div>
        </div>
        <div className="flex justify-content-between">
          <div className='mr-6'>Tasse e costi di soggiorno</div>
          <div>2 €</div>
        </div>
        <hr />
        <div className="flex justify-content-between">
          <div className='font-bold'>totale(EUR)</div>
          <div className='font-bold'>{totalPrice.toFixed(2)} €</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryReservation;
