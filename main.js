let Id = null;

async function getPosts() {
	let res = await fetch('http://localhost/api.blog.uz/posts');
	let posts = await res.json();

	document.querySelector('.post-list').innerHTML = '';

	posts.forEach((post) => {
		document.querySelector('.post-list').innerHTML += `
			<div class="card" style="width: 18rem;">
			  <div class="card-body">
			    <h5 class="card-title">${post.title}</h5>
			    <p class="card-text">${post.body}</p>
			    <a class="card-link" onclick="selectPost('${[post.id]}', '${post.title}', '${post.body}')">O'zgartirish</a>
			    <a class="card-link" onclick='removePost(${post.id})'>O'chirish</a>
			  </div>
			</div>
		`
	})
}

async function addPost() {
	const title = document.getElementById('title').value,
		body = document.getElementById('body').value;

	let formData = new FormData();
	formData.append("title", title);
	formData.append("body", body);

	const res = await fetch("http://localhost/api.blog.uz/posts", {
		method: "POST",
		body: formData
	})

	const data = await res.json();

	if (data.status === true) {
		await getPosts();
		document.getElementById('title').value = '';
		document.getElementById('body').value = '';
		alert("Post muvofaqayatli qo'shildi!")
	}
	console.log(data);
}

async function removePost(id) {
	const res = await fetch(`http://localhost/api.blog.uz/posts/${id}`, {
		method: "DELETE"
	})

	const data = await res.json();

	if (data.status === true) {
		await getPosts();
	}
}

function selectPost(id, title, body) {
	Id = id;
	document.getElementById("edit-title").value = title;
	document.getElementById("edit-body").value = body;
}

async function updatePost() {
	const title = document.getElementById("edit-title").value,
		body = document.getElementById("edit-body").value;

	const data = {
		title: title,
		body: body
	};

	const res = await fetch(`http://localhost/api.blog.uz/posts/${Id}`, {
		method: "PATCH",
		body: JSON.stringify(data)
	});

	const resData = await res.json();

	if (resData.status === true) {
		await getPosts();
		document.getElementById("edit-title").value = '';
		document.getElementById("edit-body").value = '';
		alert("Post muvofaqayatli o'zgartildi!")
	}
}

getPosts();