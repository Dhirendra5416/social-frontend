
import { MainLayout } from '../components/layout/layout';
import Share from '../components/molecules/Share';
import Posts from "../components/molecules/posts"


const Home = () => {
    return (
        <MainLayout>
            <Share/> 
            <Posts/>
           
        </MainLayout>
    );
};

export default Home;
