import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { hasHistory, useHistory } from 'react-router'
import SearchBox from './SearchBox'
import { createImage, listImages } from '../actions/imageActions'
import { IMAGE_CREATE_RESET } from '../constants/imageConstants'

function Header() {
    const dispatch = useDispatch()
    const history = useHistory()
    const userLogin = useSelector(state => state.userLogin)
    const {  userInfo } = userLogin

    
    const imageCreate = useSelector(state => state.imageCreate)
    const { image: createdImage, loading: loadingCreate, error: errorCreate, success: successCreate } = imageCreate

    useEffect(() => {
        dispatch({type: IMAGE_CREATE_RESET })

        if (successCreate) {
            history.push(`/user/images/${createdImage._id}/edit`)
        } else {
            dispatch(listImages())
        }
    },[dispatch, history, userInfo, successCreate, createdImage])

    const logoutHandler = () => {
        dispatch(logout())
    }

    const uploadHandler = () => {
        dispatch(createImage())
    }

    return (
        <header>
            <Navbar bg="success" variant="light" expand="lg" collapseOnSelect>
                <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Khussshal</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Route render={({ history }) => <SearchBox history={history} />}  />
                    <Nav className="ml-auto">
                    {userInfo && (<LinkContainer onClick={uploadHandler} style={{color: 'black'}} to="/user/upload">
                        <Nav.Link>
                            <i className="fas fa-plus pr-1"></i> Upload
                        </Nav.Link>
                    </LinkContainer>)}
                    {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                          
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                        </NavDropdown>
                    ): <LinkContainer style={{color: 'black'}} to="/login">
                        <Nav.Link>
                            <i className="fas fa-user pr-1"></i> Sign In
                        </Nav.Link>
                    </LinkContainer>
                    }
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
