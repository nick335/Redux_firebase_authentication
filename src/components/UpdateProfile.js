import React from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser, updatepassword, updateemail } from '../store/features/auth/authSlice';
export default function UpdateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, userData } = useSelector(state => state.auth)
  const emailRef = React.useRef()
  const passwordRef = React.useRef()
  const passwordConfirmRef = React.useRef()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  function handleSubmit(e){
    e.preventDefault()
    const password = passwordRef.current.value
    const email = emailRef.current.value
    const promises = []
    setLoading(true)
    setError('')
    if(!validator.isEmail(email)){
      return setError('Enter valid email')
    }
    if (password !== passwordConfirmRef.current.value){
     return setError('Passwords do not match')      
    }
    if(email !== currentUser){
      promises.push(dispatch(updateemail(email)))
    }
    if(passwordRef.current.value){
      promises.push(dispatch(updatepassword(password)))
    }
    Promise.all(promises).then(() => {
      // console.log(response)
      // const user = response.user.email
      // const userData = response.user
      // dispatch((setCurrentUser({user, userData})))
      
    }).catch((error) => {
      console.log(error)
      setError("Failed to update account")
    }).finally(() => {
      setLoading(false)
    })

  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center, mb-4'>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>  }
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef}  required />
            </Form.Group>
            <Form.Group className='mb-3' id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"   />
            </Form.Group>
            <Form.Group className='mb-3' id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"  />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit' >Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2' >
        <Link to="/">Cancel</Link> 
      </div>
    </>
  )
}
