import React from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../store/features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = React.useRef()
  const passwordRef = React.useRef()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')


  function handleSubmit(e){
    e.preventDefault()
    const password = passwordRef.current.value
    const email = emailRef.current.value

    setError('')
    setLoading(false)
    signInWithEmailAndPassword(auth, email, password).then((response) => {
      // const user = response.user.email
      // const userData = response.user
      // dispatch((setCurrentUser({user, userData})))
      navigate("/")
    }).catch((error) => {
      console.log(error)
      setError(error.messsage)
    })

    setLoading(false)
  }
  function GoogleSignin(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {

    }).catch((error) =>{
      console.log(error)
    })
  }

  return (
    <>
      <Card>
        <Card.Body>
        <h2 className='text-center, mb-4'>Login</h2>
          {error && <Alert variant='danger'>{error}</Alert>  }
          <Form onSubmit={handleSubmit} >
            <Form.Group className='mb-3' id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef}  required />
            </Form.Group>
            <Form.Group className='mb-3' id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef}  required />
            </Form.Group>
            <Button disabled={loading}  className='w-100' type='submit' >Sign Up</Button>
          </Form>
          <Button disabled={loading}  className='w-100' onClick={GoogleSignin} >log in with Goggle </Button>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2' >
        Don't have an account?  <Link to="/signup">Sign up</Link> 
      </div>
    </>
  )
}

