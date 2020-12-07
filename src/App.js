import './App.css';
import Main from './components/Main/Main.js'
import LeftPanel from './components/LeftPanel/LeftPanel.js'
import YourIdeas from './components/YourIdeas/YourIdeas.js'
import { db, auth } from './firebase.js' 
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input, CircularProgress } from '@material-ui/core'
import React, {useState ,useEffect, useRef} from 'react';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const  useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState("")
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState('')
  const [username, setUsername] = useState('');
  

  useEffect(() => {
    const getUser = async () =>{
      await auth.onAuthStateChanged(( authUser ) =>{
        setUser(authUser);
      });
    } 
    getUser()
  }, [])

  

  const signUp = async (e) =>{
    e.preventDefault();
    try{
    await auth.createUserWithEmailAndPassword(email, password)
    setOpen(false)
    window.location.reload();
    return await auth.currentUser.updateProfile({
      displayName: username
    
    })
    
     }
    catch(error){
      alert(error.message)
    }
    

  }
  
  const signIn = (e) => {
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
    setOpenSignIn(false)
  }

  return (
    <div className="App">
      <header className='app__header'>
      <h1 className="app_headerTitle">SwipeIdea - just judge ideas</h1>
        <div className="app__headerRight">
    {user?.displayName ? 
    <Button onClick={() =>{
       auth.signOut();
       window.location.reload(false)}}>Logout</Button>
       : 
      <div className="navigation__loginWrapper">
      <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
      <Button onClick={() => setOpen(true)}>Sign UP</Button>
      </div>
      }

  <Modal
    open={open}
    onClose={() => setOpen(false)}>
    <form>
    <div style={modalStyle} className={classes.paper}>
    <Input 
      placeholder="username"
      type="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />
    <Input 
      placeholder="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <Input 
      placeholder="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)} 
    />
    <Button type='submit' onClick={signUp}>Sign Up</Button>
    </div>
  </form>
  </Modal> 

  <Modal
    open={openSignIn}
    onClose={() => setOpenSignIn(false)}>
    <form className="app__signup">
    <div style={modalStyle} className={classes.paper}>

    <Input 
      placeholder="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <Input 
      placeholder="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)} 
    />
    <Button type='submit' onClick={signIn}>Sign In</Button>
    </div>
  </form>
  </Modal> 

      
        </div>
      </header>
      <div className="app__wrapper">
      <LeftPanel/>
      <Main/>
      { user ?
      <YourIdeas user={user} className="yourIdeas__loading"/>
      :
      <CircularProgress />
      }
      </div>
    </div>
  );
}

export default App;
