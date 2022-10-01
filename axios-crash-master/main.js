// AXIOS GLOBALS
axios.defaults.headers.common['dsfgergwrge'] = 'hellofsdgfsdfsdI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

//AXIOS INSTANCE
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

// axiosInstance.get('/comments').then(res=>showOutput(res));

// GET REQUEST
function getTodos() {
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5', {timeout: 5000})
  .then(res => showOutput(res))
  .catch(err=>console.log(err));
}

// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/todos',
  {title: 'new todo',
   completed: false
  }).then(res=>showOutput(res)).catch(err=> console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // axios.put('https://jsonplaceholder.typicode.com/todos/2',{
  //   title: 'updated using put',
  //   completed: true
  // }).then(res=>showOutput(res)).catch(err=>console.log(err));

  axios.patch('https://jsonplaceholder.typicode.com/todos/2',{
    title: 'updated using patch',
    completed: true
  }).then(res=>showOutput(res)).catch(err=>console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/2').then(res=>showOutput(res)).catch(err=>console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
  axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')])
  .then(axios.spread((todos,posts)=>showOutput(todos))).catch(err=>console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'rossgller/json',
      Authorization : 'sometoken'
    }
  }

  axios
  .post('https://jsonplaceholder.typicode.com/todos',
  {title: 'new todo',
   completed: false
  }, config).then(res=>showOutput(res)).catch(err=> console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method : 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'hello world'
    },
    transformResponse: axios.defaults.transformResponse.concat(data=>{
      data.title = data.title.toUpperCase();
      return data;
    })
  }

  axios(options).then(res=> showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss', {
    validateStatus: function(status){
      return status < 500; //because of validateStatus, the catch statement will only run if the error status is greater or equal to 500
    }
  })
  .then(res => showOutput(res))
  .catch(err=>{
    if(err.response){
      //this condition means the server responded with a status other than the 200 range because that is the successful request range
      console.log(err);
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
    else if(err.request){
      //this condition means the request was made but there was no response
      console.error(err.request);
    }
    else{
      console.error(err.message);
    }
  });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5', 
  {cancelToken: source.token
  })
  .then(res => showOutput(res))
  .catch(thrown=>{
    if(axios.isCancel(thrown)){
      console.log('Request cancelled', thrown.message);
    }
  });

  if(true){
    source.cancel('Request cancelled!');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config=>{
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`)
  
  return config;
}, error=> {return Promise.reject(error)});

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);





//1. headers are used when we want to send some data again and again with every request. We could put the data in the body itself but doing that everytime isn't feasible so instead, we use headers. In addition to that, headers are also used in authentication. For example- when we login to a website, say facebook, it gives us a key, and this key is used everywhere in the website to identify us whenever we make a request.

//2. Axios is an http library which lets us fetch data from another website. Its similar to the fetch API. Axios has various methods such as get, post, delete, put, patch etc. Axios helps the backend(server) communicate with the front end.

//3. Some common problems faced:-
//a) choosing the wrong url. Using the base url without providing the route. 
//b) not being able to debug.
//c) using JSON.stringify on objects where its not required.

//solution - a) choose the correct url and provide the correct route.
//b) always use the network tab in inspect element to see what kind of error you're getting. Use postman to find the issue.
//c) stringifying objects leads to errors because axios does it automatically.
