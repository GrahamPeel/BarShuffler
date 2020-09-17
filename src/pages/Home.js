import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Jumbotron } from 'reactstrap'

const Home = () => {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Welcome to BarShuffler!</h1>
                <p className="lead">
                    This app uses your browser's localStorage to store your bottles and recipes,
                    so don't delete your localStorage unless its time to get on the wagon. 
                </p>
            </Jumbotron>
            <Container>
                <p><Link to='/inventory'>Your Bottle Inventory</Link></p>
                <p><Link to='/recipes'>Your Collection of Recipes</Link></p>
                <p><Link to='/createrecipe'>Add a New Recipe</Link></p>
            </Container>
        </div>
    )
}
export default Home