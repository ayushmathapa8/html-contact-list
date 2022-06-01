const apiUrl = "https://randomuser.me/api?";
let userArgs = [];

const fetchUsers = async (params = "results=20") => {
  fetch(apiUrl + params)
    .then((response) => response.json())
    .then((data) => {
      userArgs = data.results;
      displayUsers();
    })
    .catch((err) => console.log(err));
};

const displayUsers = (args = userArgs) => {
  console.log(args);
  let str = "";

  args.map((user, i) => {
    str += `
  
      
      <div class="col-md-6 col-lg-3">
              <div class="card">
                <img src="${user.picture.large}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">
                  ${user.name.title} ${user.name.first} ${user.name.first}
                  </h5>
                  
                  <div class="card-text">
                  <ul class="list-group contact-icons">

  <li class="list-group-item">

  <i class="fas fa-mobile-alt text-primary"></i> ${user.cell}
</li>

  <li class="list-group-item">
  <i class="fas fa-envelope text-danger"></i>${user.email}
  </li>

  <li class="list-group-item">
  <i class="fas fa-map-marker-alt  text-warning"></i>${user.location.street.number} 
${user.location.street.name}
${user.location.city}
${user.location.country}
  
  </li>
  
</ul>
                    
                  </div>
                  
                </div>
              </div>
            </div>
`;
  });

  document.getElementById("user-list").innerHTML = str;
  document.getElementById("user-count").innerText = args.length;
};

const handleOnchange = (e) => {
  console.log(e.value);
  const qrystrings = "results=20&gender=" + e.value;

  fetchUsers(qrystrings);
};

const handleOnsearch = (e) => {
  const str = e.value;
  console.log(str);
  const selectedUsers = userArgs.filter((user) => {
    const name = user.name.first + " " + user.name.last;

    return name.toLowerCase().includes(str.toLowerCase());
  });

  displayUsers(selectedUsers);
};

fetchUsers();
