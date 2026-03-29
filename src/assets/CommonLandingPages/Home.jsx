import Navbar from './Navbar'
import Hero from './Hero'
import Extra from './Extra'
import LoaderToast from '../UserSide/LoaderToast'
const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <LoaderToast message={"Deposited Successfully?"} type={'error'}/>
    <Extra/>
    </>
  )
}

export default Home

