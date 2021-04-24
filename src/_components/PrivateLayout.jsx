import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import { get } from "lodash";
import BlockUi from "react-block-ui"
import "react-block-ui/style.css";
export const PrivateLayout = ({ children, ...rest }) => {
    const { alert, utils } = useSelector(state => state);
    const showBlockUI = useSelector((state) =>
        get(state, "utils.blocking", false)
    );
    return (
        <>
            <BlockUi tag="div" blocking={showBlockUI}>
                <div className="pp-container">
                    <Header />
                    {children}
                </div>
                <Footer />
            </BlockUi>
        </>
    );
};