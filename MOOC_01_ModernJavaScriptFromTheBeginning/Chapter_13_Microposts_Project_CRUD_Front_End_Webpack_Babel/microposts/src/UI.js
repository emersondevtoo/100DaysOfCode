import { Post } from "./post";

class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }
  
  fillForm(post){
    this.titleInput.value = post.title;
    this.bodyInput.value = post.body;
    this.idInput.value = post.id
  }

  showAlert(message, className) {
    this.clearAlert();

    // create div
    const div = document.createElement("div");
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector(".postContainer");
    // Get Posts
    const posts = document.querySelector("#posts");
    // Insert alert div
    container.insertBefore(div, posts);
    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  getDataForm() {
    let title = this.titleInput.value,
      body = this.bodyInput.value;
    return new Post(title, body);
  }

  showPosts(posts) {
    let output = "";
    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">
              ${post.title}
            </h4>
            <p class="card-text">
              ${post.body}
            </p>
            <a href="#" class="edit card-link" data-id=${post.id}>
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id=${post.id}>
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }
}

export const ui = new UI();