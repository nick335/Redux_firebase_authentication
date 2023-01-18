import React from 'react'
import { Alert, Card, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logoutCurrentUser } from '../store/features/auth/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


export default function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = React.useState();
  const { currentUser } = useSelector(state => state.auth)

  function handleLogout(){
    setError('')
    signOut(auth).then((response) => {
      dispatch(logoutCurrentUser())
      navigate('/login')
    }).catch((error) => {
      setError(error.message)
    })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2> 
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email: </strong> {currentUser}
          <Link to="/updateProfile" className="btn btn-primary w-100 mt-3" > 
            Update Profile
          </Link>
        </Card.Body>
      
      </Card>
      <div className='w-100 text-center mt-2' >
        <Button variant='link' onClick={ handleLogout } >Log Out</Button>
      </div>
    </>
  )
}
