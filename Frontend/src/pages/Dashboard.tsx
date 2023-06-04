import Greetings from '../components/Greetings'
import Navbar from '../components/Navbar'
import Rectangles from '../components/Rectangles'
import Sidebar from '../components/Sidebar'
import Table from '../components/Table'

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
  