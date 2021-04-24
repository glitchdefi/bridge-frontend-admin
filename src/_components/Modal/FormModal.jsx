import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitWallet } from '../../redux/services/wallet';
import * as $ from 'jquery';
import { actAlertMsgFail } from '../../redux/action/alert';
import { MESSAGES } from '../../_constants/messages';
const FormModal = (props) => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [network, setNetwork] = useState('eth');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (!isSubmitted) {
            setDefaultValue();
        }
    }, [props])

    useEffect(() => {
        setDefaultValue();
        return () => {
            resetForm();
        }
    }, [])

    function resetForm() {
        props.onChange(false);
        setIsSubmitted(false);
    }

    // Validate form
    function validateForm() {
        setIsSubmitted(true);
        return address && privateKey && (network === 'eth' || network === 'bsc');
    }

    // Set default form data
    function setDefaultValue() {
        setAddress(props?.data?.address || '');
        setPrivateKey(props?.data?.privateKey || '');
        setNetwork(props?.data?.network || 'eth');
    }

    // Handle Cancel button click
    function handleCancel(event) {
        resetForm();
        props.onChange(false);
    }

    // Handle Submit button click
    function handleSubmit(event) {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        submitWallet({ address: address, privateKey: privateKey, network: network }, props?.data?.address)
            .then((result) => {
                if (result.data.code == 200) {
                    if (result.data.status) {
                        $('#CloseModal').trigger('click');
                        props.onChange(true);
                    } else {
                        dispatch(actAlertMsgFail(MESSAGES.ADD_FAILED_EXISTS));
                    }
                }
            })
            .catch((er) => {
                dispatch(actAlertMsgFail(MESSAGES.NORMAL_ERROR));
            });
    }

    return (
        <>
            <div className="modal fade " id="formModal" tabIndex="-1" aria-labelledby="formModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="modal-header">
                                <h6 className="modal-title text-dark" id="formModalLabel">
                                    <b>{props?.data?.address ? 'Edit Wallet' : 'Add New Wallet'}</b>
                                </h6>
                                <button onClick={(e) => handleCancel(e)} id="CloseModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="mb-3">
                                    <label className="form-label font-14 text-muted">Wallet Address <span className="text-danger">*</span></label>
                                    <input minLength={42} maxLength={42} type="text" className="form-control" required={true} onChange={(e) => setAddress(e.target.value)} value={address} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label font-14 text-muted">Private Key <span className="text-danger">*</span></label>
                                    <input minLength={64} maxLength={64} type="text" className="form-control" required={true} onChange={(e) => setPrivateKey(e.target.value)} value={privateKey} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label font-14 text-muted">Network <span className="text-danger">*</span></label>
                                    <select className="form-control" required={true} onChange={(e) => setNetwork(e.target.value)} value={network}>
                                        <option value="eth">ETH</option>
                                        <option value="bsc">BSC</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-start">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                <button type="button" className="btn btn-light ms-2" onClick={(e) => handleCancel(e)} data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormModal;


