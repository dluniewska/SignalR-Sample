import './App.css'
import DeathlyHallows from './components/DeathlyHallows/DeathlyHallows'
import GroupsHouses from './components/GroupsHouses/GroupsHouses'
import PageViews from './components/PageViews/PageViews'

function App() {

  return (
    <>
      <GroupsHouses />
      <hr className='defSep'/>
      <DeathlyHallows />
      <hr className='defSep'/>
      <PageViews />
    </>
  )
}

export default App
