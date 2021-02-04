import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


function LoginScreen({location}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/login'

    useEffect(() => {
        // if(userInfo) {  
        //     history.push(redirect)
        //     console.log(userInfo)

        // }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        console.log(userInfo)
        if (userInfo) {
            history.push('/')
        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email}
                    onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password}
                    onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type="submit" variant="info">
                    Sign In
                </Button>
            </form>

            <Row className="py-3">
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
