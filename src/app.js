import { http } from './http';
import { ui } from './ui';

// Get Post on DOM load

document.addEventListener('DOMContentLoaded', getPosts);

// Listen for Add Post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for Delete
document.querySelector('#posts').addEventListener('click', deletePost)

// Listen for Edit State
document.querySelector('#posts').addEventListener('click', enableEdit)

// Get Posts and Display Them
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
  }

  // Create a New Post
  function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    if(title === '' || body === '') {
      ui.showAlert('Please Fill in all fields', 'alert alert-danger')
    } else {
      const data = {
        title,
        body
      }
  
      // Create Post request
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post Added', 'alert alert-success');
          ui.clearFields()
          getPosts();
        })
        .catch(err =>  console.log(err))

    }
  }


  // Delete a Post
  function deletePost(e) {

    if(e.target.parentElement.classList.contains('delete')) {
      const id = e.target.parentElement.dataset.id;
      if(confirm('Are You Sure?')) {
        http.delete(`http://localhost:3000/posts/${id}`)
          .then(data => {
            ui.showAlert('Post Deleted', 'alert alert-success');
            getPosts();
          })
          .catch(err => console.log())
      }
    }

    e.preventDefault()
  }

  // Enable Edit State
  function enableEdit(e) {
    if(e.target.parentElement.classList.contains('edit')) {
      const id = e.target.parentElement.dataset.id;

      const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

      const body = e.target.parentElement.previousElementSibling.textContent;

      const data = {
        id,
        title,
        body
      }

      // Fill Form with current post
      ui.fillForm(data)


      console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
    }
    e.preventDefault
  }

