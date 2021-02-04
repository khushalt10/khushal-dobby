import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Images from '../components/Images'
import { listImages } from '../actions/imageActions'


function HomeScreen({ match }) {
    const keyword = match.params.keyword

    
    const dispatch = useDispatch()
    const imageList = useSelector(state => state.imageList)
    const { loading, images, error } = imageList
    const userLogin = useSelector(state => state.userLogin)
    const {  userInfo } = userLogin
    console.log(userInfo)
    
    useEffect(() => {
        dispatch(listImages(keyword))
    },[dispatch, keyword])


    return (
        <>
            <p>Your Images</p>
            <Row>

            {userInfo ? 
                (images ? (
                    images.map(image => 
                        userInfo._id == image.user &&  (
                        <Col key={image._id} sm={12} md={6} lg={4} xl={3}>
                            <Images image={image} />
                        </Col>
                    ))): (<p>YOu haven't uploaded any images yet</p>))
                :(<p>Sign in to upload and see images</p>)    
            }
           
           </Row>
        </>
    )
}

export default HomeScreen
