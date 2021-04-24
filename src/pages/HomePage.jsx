import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { TableHeader, Pagination, Search } from "../_components/DataTable";
import { deleteWallet, getListWallets } from "../redux/services/wallet";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MESSAGES } from "../_constants/messages";
import { actAlertMsgSuccess, actAlertMsgFail } from "../redux/action/alert";
import SweetAlert from 'react-bootstrap-sweetalert';
import FormModal from "../_components/Modal/FormModal";

const HomePage = (props) => {
  const dispatch = useDispatch();

  const ITEMS_PER_PAGE = 10;
  const [listWallets, setListWallets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [totalItems, setTotalItems] = useState(20);
  const [search, setSearch] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isShowConfirmDeleteWallet, setIsShowConfirmDeleteWallet] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState({});

  const headers = [
    { name: "No.", field: "", sortable: false },
    { name: "Wallet Address", field: "address", sortable: true },
    { name: "Private Key", field: "privateKey", sortable: true },
    { name: "Network", field: "network", sortable: true },
    { name: "Action", field: "", sortable: false },
  ];

  const listWalletsData = useMemo(() => {
    let computedData = listWallets;
    if (search) {
      computedData = computedData.filter((item) =>
        item.address.toLowerCase().includes(search.toLowerCase()) || item.privateKey.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(computedData.length);

    //Sorting ListInvestor
    if (sorting.field) {
      const reversed = sorting.order === "desc" ? 1 : -1;
      computedData = computedData.sort((a, b) => {
        if (typeof a[sorting.field] === "number") {
          return reversed * (a[sorting.field] - b[sorting.field]);
        }
        if (typeof a[sorting.field] === "string") {
          return reversed * a[sorting.field].localeCompare(b[sorting.field]);
        }
      });
    }

    //Current Page slice
    return computedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [currentPage, sorting, listWallets, search]);


  // Page loaded
  useEffect(() => {
    loadData();
  }, []);


  // Load data 
  function loadData() {
    getListWallets()
      .then((result) => {
        if (result.data.code == 200) {
          setListWallets(result.data.data);
        }
      })
      .catch((er) => {
        dispatch(actAlertMsgFail(MESSAGES.NORMAL_ERROR));
      });
  }

  // Copy to clipboard
  function handleCopyToClipboard() {
    setIsCopied(true);
    dispatch(actAlertMsgSuccess(MESSAGES.COPIED));
  }

  // Handle Edit button click
  function handleEditWallet(wallet) {
    setSelectedWallet(wallet);
  }

  // Handle Delete button click
  function handleDeleteWallet(wallet) {
    setIsShowConfirmDeleteWallet(true);
    setSelectedWallet(wallet);
  }

  // Handle Confirm button click
  function handleConfirmDeleteModal() {
    deleteWallet(selectedWallet)
      .then((result) => {
        if (result.data.code == 200) {
          if (result.data.status) {
            dispatch(actAlertMsgSuccess(MESSAGES.DELETE_SUCCESS));
            loadData();
            handleCancelDeleteModal();
          } else {
            dispatch(actAlertMsgFail(MESSAGES.DELETE_FAILED_IN_USED));
          }
        } else {
          dispatch(actAlertMsgFail(MESSAGES.DELETE_FAILED));
        }
      })
      .catch((er) => {
        dispatch(actAlertMsgFail(MESSAGES.NORMAL_ERROR));
      });

  }

  // Handle Cancel button click
  function handleCancelDeleteModal() {
    setSelectedWallet({});
    setIsShowConfirmDeleteWallet(false);
  }

  // Handle Wallet Form callback
  function walletFormCallback(event) {
    setSelectedWallet({});
    if (event) {
      loadData();
    }
  }

  // Handle search by keyword
  function handleSearch(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="pp-homepage">
        <div className="container">
          <h2 className="section-title">Manage Wallets</h2>
          <div className="row mb-3">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <Search onSearch={(value) => handleSearch(value)} placeholder="Search by wallet address or private key" />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-history">
              <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
              <tbody>
                {listWalletsData.length > 0 ? (
                  listWalletsData.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td className="tdNo">{key + 1}</td>
                        <td className="tdAddress">
                          <CopyToClipboard text={item.address} onCopy={() => handleCopyToClipboard()}>
                            <div className="tdAddressContent">
                              <span>{item.address}</span>
                              <i className="mdi mdi-content-copy ms-2 text-warning"></i>
                            </div>
                          </CopyToClipboard>
                        </td>
                        <td className="tdPrivateKey">
                          <CopyToClipboard text={item.privateKey} onCopy={() => handleCopyToClipboard()}>
                            <div className="tdPrivateKeyContent">
                              <span>{item.privateKey}</span>
                              <i className="mdi mdi-content-copy ms-2 text-warning"></i>
                            </div>
                          </CopyToClipboard>
                        </td>
                        <td className="tdNetwork text-uppercase">{item.network}</td>
                        <td className="tdAction">
                          {/* <button type="button" className="btn btn-sm btn-primary me-2" onClick={() => handleEditWallet(item)} data-bs-toggle="modal" data-bs-target="#formModal"><i className="mdi mdi-square-edit-outline"></i></button> */}
                          <button type="button" className="btn btn-sm btn-primary" onClick={() => handleDeleteWallet(item)}><i className="mdi mdi-trash-can-outline me-1"></i>Delete</button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="5">No wallets available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3">
            <Pagination
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              className="float-right"
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>

      <SweetAlert
        title=""
        show={isShowConfirmDeleteWallet}
        showCancel
        btnSize="sm"
        confirmBtnBsStyle="warning"
        cancelBtnBsStyle="secondary"
        confirmBtnText="Yes"
        cancelBtnText="No"
        onConfirm={() => handleConfirmDeleteModal()}
        onCancel={() => handleCancelDeleteModal()}
      >
        {MESSAGES.CONFIRM_DELETE}
      </SweetAlert>
      <FormModal data={selectedWallet} onChange={(e) => walletFormCallback(e)} />
    </>
  );
};

export default HomePage;
