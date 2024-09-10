import React from 'react';
import Footer from './Footer';
import Header from './header';

export const MainLayout = ({ children }) => {
    return (
        <>
            <div className='bg-gray-200'>
                <Header />
                <div className='container mx-auto my-4'>
                    {children}
                </div>
                <Footer />
            </div>
        </>
    );
};
