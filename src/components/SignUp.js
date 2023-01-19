import React from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import validator from 'validator';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { setCurrentUser } from '../store/features/auth/authSlice';
export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = React.useRef()
  const passwordRef = React.useRef()
  const passwordConfirmRef = React.useRef()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')


   function handleSubmit(e){
    e.preventDefault()
    const password = passwordRef.current.value
    const email = emailRef.current.value

    if(!validator.isEmail(email)){
      return setError('Enter valid email')
    }

    if(password.length !== 6 ){
      return setError('Password must be up to 6 characters')
    }

    if (password !== passwordConfirmRef.current.value){
     return setError('Passwords do not match')      
    }

    setError('')
    setLoading(false)
    createUserWithEmailAndPassword(auth, email, password).then((response) => {
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

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center, mb-4'>Sign up</h2>
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
            <Form.Group className='mb-3' id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef}  required />
            </Form.Group>
            <Button disabled={loading}  className='w-100' type='submit' >Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2' >
        Already have an account? <Link to="/login">Log in</Link> 
      </div>
    </>
  )
}
