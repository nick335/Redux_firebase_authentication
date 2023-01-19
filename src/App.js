import PageTemplate from "./components/PageTemplate";
import React from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setCurrentUser } from "./store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";



function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  React.useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      if(user !== null){
        console.log(user)
        const userData = user.auth.currentUser
        const userEmail = user.auth.currentUser.email
        dispatch(setCurrentUser({userEmail}))
        navigate("/")
        console.log("currently logged in")
      }else{
        console.log("currently logged out")
      }
    })
  }, [dispatch])

  return (
    <div className="App">
      <PageTemplate />
    </div>
  );
}

export default App;
