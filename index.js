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
  courses = courses.map(recipe => recipe.id === Number(id) ? { ...recipe, ...updatedRecipe } : recipe);
  res.send(courses);
})

app.delete('/courses/delete/:id', (req, res) => {
  const { id } = req.params;
  courses = courses.filter(recipe => recipe.id !== Number(id));
  res.send(courses);
})
app.get('/courses/filter', (req, res) => {
    const { category, instructor, duration } = req.query;
    let filteredCourses = courses;
  
    if (category) {
      filteredCourses = filteredCourses.filter(course => course.category.toLowerCase() === category.toLowerCase());
    }
    if (instructor) {
      filteredCourses = filteredCourses.filter(course => course.instructor.toLowerCase() === instructor.toLowerCase());
    }
    if (duration) {
      filteredCourses = filteredCourses.filter(course => course.duration === Number(duration));
    }
  
    res.send(filteredCourses);
  });
app.listen(8090, () => {
  console.log('Server is running on port 8090')
})
