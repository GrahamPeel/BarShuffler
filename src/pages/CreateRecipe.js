import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap'
import { GenerateGuid } from '../Library'

const CreateRecipe = () => {
    const generateIngredientEntry = () => { return { value: "", id: GenerateGuid() } }
    const [recipeName, setRecipeName] = useState("");
    const [recipeInstructions, setRecipeInstructions] = useState("");
    const [recipeIngredients, setRecipeIngredients] = useState([generateIngredientEntry()])
    const [recipeCreatedSuccessfully, setRecipeCreatedSuccessfully] = useState(false)

    useEffect(() => {
        console.log("Create Recipe useEffect[] started")
    }, [])

    const handleIngredientValueChange = (id, event) => {
        const ingredients = [...recipeIngredients]
        ingredients.filter(ing => ing.id === id)[0].value = event.target.value
        setRecipeIngredients(ingredients)
    }

    const getIngredientPlaceholder = (idx) => `Add your ${idx === 0 ? 'first' : 'next'} ingredient here...like '2oz Rum'`

    const handleAddAnotherClick = () => {
        const ingredients = [...recipeIngredients, generateIngredientEntry()]
        setRecipeIngredients(ingredients)
    }

    const handleRecipeSave = () => {
        // localStorage.setItem('savedIngredients', JSON.stringify(newSavedIngredients))
        const json = localStorage.getItem("savedRecipes")
        const oldRecipes = json ? Object.assign([], JSON.parse(json)) : []
        const newRecipe = {
            id: GenerateGuid(),
            name: recipeName,
            instructions: recipeInstructions,
            ingredients: [...recipeIngredients]
        }
        localStorage.setItem('savedRecipes', JSON.stringify([...oldRecipes, newRecipe]))
        setRecipeCreatedSuccessfully(true)
    }

    return (
        recipeCreatedSuccessfully ? <Redirect to='/recipes?justAdded=true' /> :
            <div>
                <h1>Create a new Cocktail Recipe</h1>
                <br />
                <Container>
                    <Row>
                        <Col xs="6">
                            <Form>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        placeholder="New Recipe Name (leave blank for random)"
                                        value={recipeName}
                                        onChange={e => setRecipeName(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="textarea"
                                        placeholder="Instructions (optional)"
                                        value={recipeInstructions}
                                        onChange={e => setRecipeInstructions(e.target.value)} />
                                </FormGroup>
                                <Container>
                                    <h4>Ingredients</h4>
                                    {recipeIngredients.map((ing, idx) =>
                                        <Row key={ing.id}>
                                            <Col sm="1">#{idx + 1}</Col>
                                            <Col sm="11">
                                                <Input
                                                    type="text"
                                                    value={ing.value}
                                                    placeholder={getIngredientPlaceholder(idx)}
                                                    onChange={e => handleIngredientValueChange(ing.id, e)} />
                                            </Col>
                                        </Row>
                                    )}
                                </Container>
                                <div style={{ height: 10 + 'px' }}></div>
                                <Container>
                                    <Row>
                                        <Col sm="1"></Col>
                                        <Col sm="7">
                                            <Button
                                                onClick={handleAddAnotherClick}
                                                color="link">
                                                Add another ingredient
                                        </Button>
                                        </Col>
                                        <Col sm="4">
                                            <Button
                                                onClick={handleRecipeSave}
                                                color="primary">
                                                Save this Recipe
                                        </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}

export default CreateRecipe