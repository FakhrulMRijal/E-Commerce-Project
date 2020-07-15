import { deleteItems } from "../action/deleteItems";

// import { act } from "react-dom/test-utils";

const initialState = {
    productId : '',
    title : '',
    category : '',
    price : 0,
    quantity : 0,
    total : 0,
    totalItems : 0,
    inCart : false,
    cartNumbers : 0,
    date : '',
    items: []
}

export const cartReducer = (state = initialState, action) => {
    console.log('action.payload:: ', action.payload);
    // console.log('GETNUMBERS===', state.cartNumbers)
    // console.log('...state.items::', state.items)
    switch (action.type) {
        case 'ADD_TO_CART':
            let newItems = [
                ...state.items,
                // action.payload
            ]
            console.log('NEWITEMS ===', newItems)
            // console.log('MANYITEMS===', state.cartNumbers)
            if (state.items.length === 0) {
                newItems.push({
                    ...action.payload,
                    quantity : 1,
                    inCart : true,
                })
                return {
                    items: newItems,
                    cartNumbers : state.cartNumbers + 1,
                    total : state.total + newItems[0].price
                }
            } else {
                const findSameProductId = newItems.filter(data => data.productId === action.payload.productId)
                console.log('FINDSAMEPRODUCTS ==== ', findSameProductId)
                // console.log('OnClickDetailProducts === ', diffProducts)
                if (findSameProductId.length > 0) {
                    findSameProductId[0].quantity = findSameProductId[0].quantity + 1
                    return {
                        inCart : true,
                        cartNumbers: state.cartNumbers + 1,
                        items: newItems,
                        total: state.total + findSameProductId[0].price
                    }
                 } else {
                     console.log('action.payload.price === ', action.payload.price)
                    action.payload.quantity = 1
                    action.payload.inCart = true
                    console.log('ELSE==>>>')
                    return {
                        cartNumbers: state.cartNumbers + 1,
                        total : state.total + action.payload.price,
                        items: [
                            ...state.items,
                            action.payload
                        ]
                    }
                }
            }
        case 'INCREASE_QUANTITY':
            let increaseQuantity = [
                ...state.items
            ]
            const itemIncrease = increaseQuantity.filter(data => data.title === action.payload.title)
            // console.log('SameINcrease ===', itemIncrease[0].price)
            // console.log('TOTAL === ', state.totalCart + itemIncrease[0].price)
            console.log('ITEMINCREASE ===', state.total)
                itemIncrease[0].quantity = itemIncrease[0].quantity + 1
            return {
                ...state.items,
                cartNumbers : state.cartNumbers + 1 ,
                total : state.total + itemIncrease[0].price,
                items : [
                    ...state.items[action.payload] = increaseQuantity
                ]
            }
        case 'DECREASE_QUANTITY':
            let decreaseQuantity = [
                ...state.items
            ]

            const itemDecrease = decreaseQuantity.filter(data => data.title === action.payload.title)
            console.log('itemDEcrease ===', action.payload)

            itemDecrease[0].quantity = itemDecrease[0].quantity - 1
              
                return {
                    cartNumbers : state.cartNumbers - 1,
                    total : state.total - itemDecrease[0].price,
                    items : [
                        ...state.items[action.payload] = decreaseQuantity
                    ]
                }
        case 'CANCEL_ITEMS':
            const items = [
                ...state.items
            ]

            const cancelItem = items.filter((data) => action.payload.name !== data.title)
            const cancelTotal = items.filter(data => data.title === action.payload.name)
            console.log('filtered ITEM: ', cancelItem)
            // console.log('thisCancel===', action.payload)

            const quantityBackup = cancelTotal[0].quantity
            cancelTotal[0].inCart = false
            cancelTotal[0].quantity = 0
            

            return {
                ...state.items,
                items: cancelItem,
                cartNumbers : state.cartNumbers - quantityBackup,
                total : state.total - (quantityBackup * cancelTotal[0].price)
            }
        case 'DELETE_ITEMS':
            // const deleteItems = [
            //     ...state.items
            // ]    

            // const deleteItem = deleteItems.filter(data => data.title === action.payload.name)
            // console.log('DELETE ITEM IS', deleteItem)
            const deleteAll = [
                ...state.items
            ]

            const deleteItem = deleteAll.filter((data) => action.payload.name === data.title)
            // const deleteTotal = deleteAll.filter(data => data.title === action.payload.cart)
            console.log('Delete.items: ', deleteItem)
            deleteItems.quantity = 0
            deleteItems.inCart = false
            return {
                items : [],
                total : state.total * 0,
                cartNumbers : state.cartNumbers * 0,
            }
        case 'GET_NUMBERS':
            return state.cartNumbers
            
        default:
            return state;
    }
    
}






// const cart = [
//     {
//         id: '1',
//         title: 'abc',
//         price: 10000,
//         quantity: 1
//     },
//     {
//         id: '2',
//         title: 'abdcd',
//         price: 10001,
//         quantity: 2 
//     }
// ]

// cart.filter(({ id }) => id === productId)