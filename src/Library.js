
export const GetId = () => {
    return 'dfdsf4343r'
}

export const GenerateGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const GetIngredientTypeList = () => {
    return [
        { typeId: "1", text: "Normal Spirit" },
        { typeId: "2", text: "Overproof Spirit" },
        { typeId: "3", text: "Liquote/Cordial" },
        { typeId: "4", text: "Fruit Juice" },
        { typeId: "5", text: "Bitters/Spices" },
    ]
}

export const GetSampleRecipe = () => {
    return { 
        id: "dshufds67878sdu", 
        name: "Rusty Mule",
        ingredients: [
            {
                id: "8987dsuhjdsfs9",
                name: "rum", 
                typeId: "1", 
                quantity: "2oz"
            }
        ],
    }
}