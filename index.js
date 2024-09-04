const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

let courses = [
    {
      name: "Initial Course",
      category: "Programming",
      instructor: "Jane Doe",
      duration: 15 
    }
]

app.get('/add', (req, res) => {
  res.send(courses)
})

app.post('/courses/add', (req, res) => {
  const newRecipe = { ...req.body, id: Date.now() }; 
  courses.push(newRecipe);
  res.send(courses);
})

app.patch('/courses/update/:id', (req, res) => {
  const { id } = req.params;
  const updatedRecipe = req.body;
  courses = courses.map(recipe => recipe.id === (id) ? { ...recipe, ...updatedRecipe } : recipe);
  res.send(courses);
})

app.delete('/courses/delete/:id', (req, res) => {
  const { id } = req.params;
  courses = courses.filter(recipe => recipe.id !== (id));
  res.send(courses);
})
app.listen(8090, () => {
  console.log('Server is running on port 8090')
})
