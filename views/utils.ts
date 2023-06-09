

export const sortTodos = (array) => {
    const sortedArray = []
    let firstTodo = array.find(todo => todo.previous_todo === 0)
    sortedArray.push(firstTodo)

    const todoObj = {};
    array.forEach(todo => {
        todoObj[todo.id] = todo;
    });

    while (sortedArray.length < array.length){
        let next_todo_id = String(sortedArray[sortedArray.length - 1].next_todo)
        let next_todo = todoObj[next_todo_id]
        sortedArray.push(next_todo) 
    }

    return sortedArray
}
