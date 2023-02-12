// Variables
const cart = document.getElementById('cart');
const courses = document.getElementById('list-courses');
const listcourses = document.querySelector('#list-cart tbody');
const emptycartBtn = document.getElementById('empty-cart');
const num = document.getElementById('qtytest');
const sizeing =document.getElementById('size');

// Listeners
loadEventListeners();
function loadEventListeners() {
  // when "Add Cart" is pressed
  courses.addEventListener('click', buycourse);
  // When a course is removed from the cart
  cart.addEventListener('click', deletecourse);
  // When emptying the cart
  emptycartBtn.addEventListener('click', emptycart);
  // When loading the document, show LocalStorage
  document.addEventListener('DOMContentLoaded', readLocalStorage);
}

// Functions
// Function that adds the course to the cart
function buycourse(e) {
  e.preventDefault();
  // Delegation to add-cart
  if(e.target.classList.contains('add-cart')) {
    const course = e.target.parentElement.parentElement;
    // We send the selected course to take your data
    readDataCourse(course);
  }
  
}

// Read the course data
function readDataCourse(course) {
  const infocourse = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.discount').textContent,
    qty:course.querySelector('.num').value,
    size:course.querySelector('.sizeing').value,
    id: course.querySelector('a').getAttribute('data-id')
  }
 
  insertincart(infocourse);
}

// Show the selected course in the Cart
function insertincart(course) {
  
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${course.image}" width=100>
  </td>
  <td>${course.title}</td>
  <td>${course.price}</td>
  <td>${course.qty}</td>
  <td>${course.size}</td>
  <td>
  <a href="#" class="delete-course" data-id="${course.id}">x</a>
  </td>
  `;
  listcourses.appendChild(row);
  savecourseLocalStorage(course);
}

// Remove the cart course in the DOM
function deletecourse(e) {
  e.preventDefault();
  let course,
      courseId;
  if(e.target.classList.contains('delete-course') ) {
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector('a').getAttribute('data-id');
  }
  deletecourseLocalStorage(courseId);
}

// Remove cart courses in the DOM
function emptycart() {
  while(listcourses.firstChild) {
    listcourses.removeChild(listcourses.firstChild);
  }

  // Empty Local Storage

  emptyLocalStorage();
  return false;
}

// Store courses in the cart to Local Storage
function savecourseLocalStorage(course) {
  let courses;
  // Take the value of an array with LS or empty data
  courses = getcoursesLocalStorage();
  // the selected course is added to the array
  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses) );
}

// Check for items in Local Storage
function getcoursesLocalStorage() {
  let coursesLS;
  // we check if there is something in localStorage
  if(localStorage.getItem('courses') === null) {
    coursesLS = [];
  } else {
    coursesLS = JSON.parse( localStorage.getItem('courses') );
  }
  return coursesLS;
}

// Print Local Storage courses to cart
function readLocalStorage() {
  let coursesLS;
  coursesLS = getcoursesLocalStorage();
  coursesLS.forEach(function(course){
  // constrir el template
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${course.image}" width=100>
  </td>
  <td>${course.title}</td>
  <td>${course.price}</td>
  <td>${course.num}</td>
  <td>
  <a href="#" class="delete-course" data-id="${course.id}">X</a>
  </td>
  `;
  listcourses.appendChild(row);
  });
}

// Delete the course by ID in Local Storage
function deletecourseLocalStorage(course) {
  let coursesLS;
  // We get the arrangement of courses
  coursesLS = getcoursesLocalStorage();
  // We iterate comparing the deleted course ID with those of the LS
  coursesLS.forEach(function(courseLS, index) {
    if(courseLS.id === course) {
      coursesLS.splice(index, 1);
    }
  });
  // Add the current fix to storage
  localStorage.setItem('courses', JSON.stringify(coursesLS) );
}

// Delete all courses from Local Storage
function emptyLocalStorage() {
  localStorage.clear();
}