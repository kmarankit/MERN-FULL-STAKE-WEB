import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import SpecialOffer from '../../components/SpecialOffer/SpecialOffer'
// import AboutHome from '../../components/AboutHome/AboutHome'
import OurMenuHome from '../../components/OurMenuHome/OurMenuHome'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const Home = () => {
    return (
        <>
            <Navbar/>
            <Header/>
            <Banner />
            <OurMenuHome />
            <SpecialOffer />
            
            {/* <Footer /> */}
        </>
    )
}

export default Home