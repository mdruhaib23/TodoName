document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const todoName = document.getElementById('todo-name').value;
      const todoDescription = document.getElementById('todo-description').value;
      
      if (todoName && todoDescription) {
        createTodoItem(todoName, todoDescription);
        form.reset();
      } else {
        alert('Please enter both todo name and description');
      }
    });
    
    // Function to create a todo item
    function createTodoItem(name, description) {
      const requestBody = {
        name: name,
        description: description
      };
      
      fetch('hhttps://crudcrud.com/api/918abfd291614b40a438f084207e1313/SharpenerProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      .then(response => response.json())
      .then(data => {
        addTodoItem(data._id, name, description);
      })
      .catch(error => console.error('Error:', error));
    }
    
    // Function to add a todo item to the list
    function addTodoItem(id, name, description) {
      const li = document.createElement('li');
      li.id = id;
      li.innerHTML = `<button class="cancel" onclick="removeTodoItem('${id}')">X</button> <strong>${name}:</strong> ${description}`;
      todoList.appendChild(li);
    }
    
    // Function to fetch all todo items and display them
    fetch('https://crudcrud.com/api/918abfd291614b40a438f084207e1313/SharpenerProject')
      .then(response => response.json())
      .then(data => {
        data.forEach(todo => {
          addTodoItem(todo._id, todo.name, todo.description);
        });
      })
      .catch(error => console.error('Error:', error));
  });
  
  // Function to delete a todo item
  function removeTodoItem(id) {
    fetch(`https://crudcrud.com/api/918abfd291614b40a438f084207e1313`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        document.getElementById(id).remove();
      }
    })
    .catch(error => console.error('Error:', error));
  }
  