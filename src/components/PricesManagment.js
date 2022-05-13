import React, { useState, useRef } from "react";

import axios from "axios";

import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import "./styles/DataTableDemo.scss";

const PricesManagment = (props) => {
  const { prices, getPrices } = props;
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
  const [isLoading, setIsLoading] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);

  const toast = useRef(null);

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const editPrice = async () => {
    setIsLoading(true);
    axios
      .post("http://localhost:3001/editProductPrice", {
        id: product.id,
        nickname: product.nickname,
        active: product.active,
        tax_behavior: product.tax_behavior,
      })
      .then(() => {
        setProductDialog(false);
        setIsLoading(false);
        getPrices();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Price sucessfully Edited",
          life: 3000,
        });
      });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onDropdwonChange = (e, name) => {
    const val = e.value;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const idTemplate = (rowData) => {
    return <span>{rowData.id}</span>;
  };

  const PriceNicknameTemplate = (rowData) => {
    return <span>{rowData.nickname ? rowData.nickname : "-"}</span>;
  };

  const currencyTemplate = (rowData) => {
    return (
      <span>
        <span>{rowData.currency.toUpperCase()}</span>
      </span>
    );
  };

  const createdTemplate = (rowData) => {
    return <span>{moment(rowData.created, "X").format("DD/MM/YYYY")}</span>;
  };

  const taxTemplate = (rowData) => {
    return (
      <span
        className={`badge ${
          rowData.tax_behavior === "inclusive"
            ? "badge-success"
            : "badge-warning"
        }`}
      >
        {rowData.tax_behavior}
      </span>
    );
  };

  const activeTemplate = (rowData) => {
    return (
      <div className="flex justify-content-center align-items-center">
        <FontAwesomeIcon
          icon={rowData.active ? faCircleCheck : faCircleXmark}
          className={`fa-xl mr-2 ${
            rowData.active ? "text-success" : "text-warning"
          }`}
        />
        <span>{rowData.active}</span>
      </div>
    );
  };

  const amountTemplate = (rowData) => {
    const number = String(rowData.unit_amount);
    const fixedNumber = Number(number.slice(0, -2)).toFixed(2);
    return <span>€ {fixedNumber}</span>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success m-1"
        onClick={() => editProduct(rowData)}
      />
    );
  };

  const header = (
    <div className="table-header">
      <h4 className="mx-0 my-1">Manage Prices</h4>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        loading={isLoading}
        onClick={editPrice}
      />
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <DataTable
          size="small"
          value={prices}
          dataKey="id"
          paginator={prices && prices.length === 10}
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          header={header}
          responsiveLayout="stack"
          breakpoint="960px"
        >
          <Column field="ID" header="ID" body={idTemplate} />
          <Column
            field="nickname"
            header="Nickname"
            body={PriceNicknameTemplate}
          />
          <Column field="currency" header="Currency" body={currencyTemplate} />
          <Column
            field="created"
            header="Created Date"
            body={createdTemplate}
          />
          <Column field="tax" header="Tax" body={taxTemplate} />
          <Column field="active" header="Active" body={activeTemplate} />
          <Column field="price" header="Price" body={amountTemplate} />
          <Column body={actionBodyTemplate} exportable={false} />
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "500px" }}
        header={`Edit price - ${product.id}`}
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="nickname">Nickname</label>
          <InputText
            id="nickname"
            value={product.nickname}
            onChange={(e) => onInputChange(e, "nickname")}
            placeholder="Insert a nickname"
            required
            className={classNames({
              "p-invalid": submitted && !product.nickname,
            })}
          />
        </div>
        <div className="field">
          <label htmlFor="active">Active</label>
          <Dropdown
            id="name"
            value={product.active}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
            optionLabel="label"
            placeholder="Select a status"
            onChange={(e) => onDropdwonChange(e, "active")}
            required
            className={classNames({
              "p-invalid": submitted && !product.active,
            })}
          />
        </div>
        <div className="field">
          <label htmlFor="tax">Taxable</label>
          <Dropdown
            id="tax"
            value={product.tax_behavior}
            options={[
              { label: "Yes", value: "inclusive" },
              { label: "No", value: "exclusive" },
            ]}
            optionLabel="label"
            placeholder="Select a status"
            onChange={(e) => onDropdwonChange(e, "tax_behavior")}
            required
            className={classNames({
              "p-invalid": submitted && !product.active,
            })}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default PricesManagment;
