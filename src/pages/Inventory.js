import React, { useState, useEffect } from 'react'
import { } from 'react-router-dom'
import { Col, Row, Table, Button, Form, FormGroup, Input } from 'reactstrap'
import { GenerateGuid, GetIngredientTypeList } from '../Library'
// Viewmodel types
const Ingredient = (name, typeId) => { return { id: GenerateGuid(), name: name, typeId: typeId } }

const Inventory = () => {
    const [newIngName, setNewIngName] = useState("");
    const [newIngCatId, setNewIngCatId] = useState("1");
    const [savedIngredients, setSavedIngredients] = useState(null); // Ingredient[]

    useEffect(() => {
        console.log("Inventory useEffect[] started")
        // FakeAjax
        setTimeout(() => {
            const json = localStorage.getItem("savedIngredients")
            const obj = json ? Object.assign([], JSON.parse(json)) : []
            setSavedIngredients(obj);
        }, 1000);
    }, [])

    const bindSavedIngredients = (newSavedIngredients) => {
        setSavedIngredients(newSavedIngredients);
        localStorage.setItem('savedIngredients', JSON.stringify(newSavedIngredients))
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const newIng = Ingredient(newIngName || "[no name]", newIngCatId)
        console.log('Inventory save new item ' + newIng)
        bindSavedIngredients([...savedIngredients, newIng]);
        setNewIngName("")
    }

    const removeClick = (e, id) => {
        //e.preventDefault();
        console.log('remove ' + id)
        bindSavedIngredients(savedIngredients.filter(ing => ing.Id !== id));
    }

    const ingredientTypeList = GetIngredientTypeList();
    const findIngredientTypeById = (typeId) => {
        return ingredientTypeList.filter(type => type.typeId === typeId)[0]
    } 

    return (
        <div>
            <h1>Inventory</h1>
            <br />
            <Row>
                <Col>
                    <h3>Your Inventory</h3>
                    <br />
                    <Table>
                        <thead>
                            <tr><th>Item</th><th>Type</th><th></th></tr>
                        </thead>
                        <tbody>
                            {!savedIngredients ? <tr><td colSpan="3">loading</td></tr>
                                : savedIngredients.length === 0 ? <tr><td colSpan="3">None</td></tr>
                                    : savedIngredients.map((ing) =>
                                        <tr key={ing.id}>
                                            <td>{ing.name}</td>
                                            <td>{findIngredientTypeById(ing.typeId).text}</td>
                                            <td><Button outline size="sm" color="primary" onClick={(e) => removeClick(e, ing.id)}>remove</Button></td>
                                        </tr>
                                    )}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <h3>Add a new Inventory Item</h3>
                    <br />
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input
                                type="text"
                                placeholder="New Ingredient Name"
                                value={newIngName}
                                onChange={e => setNewIngName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="select"
                                value={newIngCatId}
                                onChange={e => setNewIngCatId(e.currentTarget.value)}>
                                {GetIngredientTypeList().map(type =>
                                    <option key={type.typeId} value={type.typeId}>{type.text}</option>
                                )}
                            </Input>
                        </FormGroup>
                        <Button color="primary">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Inventory
