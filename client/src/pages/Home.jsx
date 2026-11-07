import React from 'react'
import Hero from '../components/Hero'
import NewCollection from '../components/NewCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
      <Hero/>
   <NewCollection/>
   <BestSeller/>
  <OurPolicy/>
  <Footer/>
  
    </div>
  )
}

export default Home