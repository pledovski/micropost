import { http } from './http';
import { ui } from './ui'

// Get post on DOM loaded
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen to delete icon
document.querySelector('#posts').addEventListener('click', deletePost);

// Get posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}; 

// Submit new post
function submitPost() {
  const data = {
    title: ui.titleInput.value,
    body: ui.bodyInput.value
  }

  // Create post
  http.post('http://localhost:3000/posts', data)
    .then(data => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));
}

// Delete post
function deletePost(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}
