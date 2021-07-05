import {Component} from 'react'
import MainPageComp from './MainPage'



class App extends Component
{
  constructor()
  {
    super()
  }
  render()
  {
    return(
      <div> 
          <MainPageComp />
      </div>
    )
  }
}


export default App;