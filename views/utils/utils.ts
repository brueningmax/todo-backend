

export const sortTodos = (array) => {
    const sortedArray = []
    let firstTodo = array.find(todo => todo.previousTodo === null)
    sortedArray.push(firstTodo)

    const todoObj = {};
    array.forEach(todo => {
        todoObj[todo.id] = todo;
    });
    
    while (sortedArray.length < array.length){
        let nextTodo_id = String(sortedArray[sortedArray.length - 1].nextTodo)
        let nextTodo = todoObj[nextTodo_id]
        sortedArray.push(nextTodo) 
    }

    return sortedArray
}
