import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Container, Row, Col } from 'reactstrap'
import { GenerateGuid } from '../Library'

const Recipes = () => {

    const [savedRecipes, setSavedRecipes] = useState(null);

    useEffect(() => {
        console.log("Recipes useEffect[] started")
        // FakeAjax
        setTimeout(() => {
            const json = localStorage.getItem("savedRecipes")
            const obj = json ? Object.assign([], JSON.parse(json)) : []
            setSavedRecipes(obj);
        }, 1000);
    }, [])

    return (
        <div>
            <h1>Your Collection of Recipes</h1>
            <br />
            <Container>
                <Row>
                    <Col xs="9">
                        <Table className="recipeTable">
                            <thead>
                                <tr>
                                    <th>Recipe Name</th>
                                    <th>Ingredients</th>
                                    <th>Instructions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!savedRecipes ? <tr><td colSpan="3">loading</td></tr>
                                    : savedRecipes.length === 0 ? <tr><td colSpan="3">None</td></tr>
                                        : savedRecipes.map(recipe =>
                                            <tr key={recipe.id}>
                                                <td className="nameCell">{recipe.name}</td>
                                                <td className="ingCell">{recipe.ingredients.map(ingredient =>
                                                    <span key={ingredient.id}>
                                                        {ingredient.value}
                                                    </span>
                                                )}</td>
                                                <td className="instructsCell">{recipe.instructions}</td>
                                            </tr>
                                        )}
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs="3">
                        <Link role="button" className="btn btn-primary" to="/createRecipe">Create New Recipe</Link>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Recipes