import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Images({image}) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/images/${image._id}`}>
                <Card.Img src={image.image} variant='top' />
            </Link>

            <Card.Body>
            <Link to={`/images/${image._id}`}>
                <Card.Title style={{color: ''}} as="div">
                    <strong>{image.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="div">
                <div className="my-3">
                   posted at {image.createdAt.substring(0,10)}
                </div>
            </Card.Text>

            </Card.Body>
        </Card>
    )
}

export default Images
