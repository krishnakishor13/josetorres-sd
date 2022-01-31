import React from 'react'
import { Slot } from 'react-page-layout';
import Header from './Header';

export default function PublicDefaultLayout() {
    return (
        <div className="main-wrapper">
            <Header />
            <div className="content-wrapper">
                <Slot name="main" component="section" className="content p-0" />
            </div>
        </div>
    )
}
