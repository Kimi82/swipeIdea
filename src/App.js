import './App.css';
import Main from './components/Main/Main.js'
import LeftPanel from './components/LeftPanel/LeftPanel.js'
import YourIdeas from './components/YourIdeas/YourIdeas.js'
function App() {
  return (
    <div className="App">
      <header className='app__header'>Head</header>
      <div className="app__wrapper">
      <LeftPanel/>
      <Main/>
      <YourIdeas/>
      </div>
    </div>
  );
}

export default App;
