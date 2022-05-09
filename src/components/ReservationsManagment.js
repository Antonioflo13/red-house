import React, { useState, useRef, useEffect } from "react";

import {
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../firebase-config";

import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import "./styles/DataTableDemo.scss";

const ReservationManagment = (props) => {
  const { reservationsInfo, getReservationsInfo } = props;
  let emptyProduct = {
    id: null,
    name: "",
    image: null,
    description: "",
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };

  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [calendarNotAvaiableDates, setCalendarNotAvaiableDates] =
    useState(null);
  const toast = useRef(null);
  const reservationsCollectionRef = collection(db, "reservations");

  useEffect(() => {
    checkAvaiableCalendarDate();
  }, [productDialog === true]);

  const checkAvaiableCalendarDate = async () => {
    const data = await getDocs(reservationsCollectionRef);
    const dayInMilliseconds = 86400000;
    let reservations = [];
    data.docs.forEach((reservation) => {
      reservations.push([
        reservation.data().startReservation.seconds * 1000,
        reservation.data().endReservation.seconds * 1000,
      ]);
    });
    let NotAvaible = [];
    for (let key of reservations) {
      for (let index = key[0]; index <= key[1]; index++) {
        NotAvaible.push(
          new Date(key[0]),
          new Date((index += dayInMilliseconds))
        );
      }
    }
    setCalendarNotAvaiableDates(NotAvaible);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const editReservation = async () => {
    console.log(product);
    const reservationDoc = doc(db, "reservations", product.id);
    const updatedReservation = product;
    await updateDoc(reservationDoc, updatedReservation);
    setProductDialog(false);
    getReservationsInfo();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Reservation sucessfully Edited",
      life: 3000,
    });
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    const reservationDoc = doc(db, "reservations", product.id);
    await deleteDoc(reservationDoc);
    setDeleteProductDialog(false);
    getReservationsInfo();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    console.log(e, name);
    const val = moment(e).format("X");
    let _product = { ...product };
    _product[`${name}`].seconds = val;

    setProduct(_product);
  };

  const idTemplate = (rowData) => {
    return <span>{rowData.id}</span>;
  };

  const nameEmailTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div>{rowData.fullName}</div>
        <div>{rowData.email}</div>
      </React.Fragment>
    );
  };

  const datesTemplate = (rowData) => {
    return (
      <span>
        <div>
          <span className="font-bold">IN: </span>
          {moment(rowData.startReservation.seconds, "X").format("DD/MM/YYYY")}
        </div>
        <div>
          <span className="font-bold">OUT: </span>
          {moment(rowData.endReservation.seconds, "X").format("DD/MM/YYYY")}
        </div>
      </span>
    );
  };

  const paymentMethodTemplate = (rowData) => {
    return (
      <div className="flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
        <span>{rowData.paymentType}</span>
      </div>
    );
  };

  const paymentStatusTemplate = (rowData) => {
    return (
      <span
        className={`badge ${
          rowData.paymentState === "complete"
            ? "badge-success"
            : "badge-warning"
        }`}
      >
        {rowData.paymentState}
      </span>
    );
  };

  const priceTemplate = (rowData) => {
    const number = String(rowData.amount);
    const fixedNumber = Number(number.slice(0, -2)).toFixed(2);
    return <span>€ {fixedNumber}</span>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success m-1"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning m-1"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h4 className="mx-0 my-1">Manage Reservations</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={editReservation}
      />
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <DataTable
          size="small"
          value={reservationsInfo}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column field="ID" header="ID" body={idTemplate} />
          <Column field="name" header="Name / Email" body={nameEmailTemplate} />
          <Column
            field="startResevation"
            header="Dates"
            body={datesTemplate}
            sortable
          ></Column>
          <Column
            field="paymentMethod"
            header="Payment Method"
            body={paymentMethodTemplate}
          />
          <Column
            field="status"
            header="Payment status"
            body={paymentStatusTemplate}
          />
          <Column field="price" header="Price" body={priceTemplate} />
          <Column body={actionBodyTemplate} exportable={false} />
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "500px" }}
        header={`Edit Reservation - ${product.id}`}
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={product.fullName}
            onChange={(e) => onInputChange(e, "fullName")}
            required
            className={classNames({
              "p-invalid": submitted && !product.fullName,
            })}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <InputText
            id="name"
            value={product.email}
            onChange={(e) => onInputChange(e, "email")}
            required
            className={classNames({ "p-invalid": submitted && !product.email })}
          />
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="checkIn">Check-in</label>
            <Calendar
              id="checkIn"
              dateFormat="dd/mm/yy"
              value={moment(product?.startReservation?.seconds, "X").toDate()}
              disabledDates={calendarNotAvaiableDates}
              onChange={(e) => onInputNumberChange(e.value, "startReservation")}
              showIcon
            />
          </div>
          <div className="field col">
            <label htmlFor="checkOut">Check-out</label>
            <Calendar
              id="checkOut"
              dateFormat="dd/mm/yy"
              value={moment(product?.endReservation?.seconds, "X").toDate()}
              disabledDates={calendarNotAvaiableDates}
              onChange={(e) => onInputNumberChange(e.value, "checkOut")}
              showIcon
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "600px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.id}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default ReservationManagment;
