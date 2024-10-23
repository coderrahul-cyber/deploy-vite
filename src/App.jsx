import { Outlet } from 'react-router-dom'
function App() {

  console.log("if The data is not visible be sure you are using the wifi");
  return (
    <div className=''>
      <Outlet/>
    </div>
  )
}

export default App
