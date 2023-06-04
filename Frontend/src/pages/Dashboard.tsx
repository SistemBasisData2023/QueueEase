import Greetings from '../components/DashboardPage/Greetings'
import Navbar from '../components/Global/Navbar'
import Rectangles from '../components/DashboardPage/Rectangles'
import Sidebar from '../components/DashboardPage/Sidebar'
import Table from '../components/DashboardPage/Table'

function DashboardPage() {

    return (
      <>
      <Sidebar />
      <Greetings />
      <Rectangles />
      <Table/>
      </>
    )
  }
  
  export default DashboardPage
  