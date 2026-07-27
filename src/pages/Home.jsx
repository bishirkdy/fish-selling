import Header from '../components/home/Header'
import CategorySection from '../components/home/CategorySection'
import SixProductSection from '../components/home/SixProductSection'
import WhyUs from '../components/home/WhyUs'
import BannerSection from '../components/home/BannerSection'

const Home = () => {
  return (
    <div>
        <Header/>
        <CategorySection/>
        <SixProductSection/>
        <WhyUs/>
        <BannerSection/>
    </div>
  )
}

export default Home