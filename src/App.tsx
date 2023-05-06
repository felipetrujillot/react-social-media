import VideoPlayer from './VideoPlayer';
import Sidebar from './Sidebar';
function App() {


  return (
    <>

    <div className="d-flex w-100">
      <Sidebar/>
      <div className="w-100">
        <VideoPlayer/>
      </div>
    </div>
    </>
  )
}

export default App
