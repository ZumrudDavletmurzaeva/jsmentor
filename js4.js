const searchRepos = document.querySelectorAll('.search_repos');
const searchEl = document.querySelector('.search');
const input = document.querySelector('.input');
const chosens = document.querySelector(".chosens");


const searchRepo = debounce(searchRepositories, 500);
input.addEventListener('input', searchRepo);
searchEl.addEventListener("click", addChosen)

chosens.addEventListener("click", e => {
  if (!e.target.classList.contains("btn-close")) 
  return;
  e.target.parentElement.remove();
  });
  

function debounce(fn, ms) {
  let timeout;
    return function() {
        const func = () => {fn.apply(this, arguments) }
        clearTimeout(timeout);
        timeout = setTimeout(func, ms);
    }
}

async function searchRepositories(e) {
  let  repoOptions = await fetch(`https://api.github.com/search/repositories?q=${e.target.value}&sort=stars&page=1&per_page=5`)
    .then((response)=>response.json())
    .catch((e)=> repoList(null))
  repoList(repoOptions);
}

function repoListRemove(arr) {
  for (let item of arr) 
  item.hidden = true;
}

function addChosen(e) {
  if (!e.target.classList.contains('search_repos'))
   return;
  repoListRemove(searchRepos); 
  input.value = '';
  let name = e.target.textContent;
  let owner = e.target.dataset.owner;
  let stars = e.target.dataset.stars;
  chosens.insertAdjacentHTML('beforeend', `<div class="chosen">Name: ${name}<br>Owner: ${owner}<br>Stars: ${stars}<button class="btn-close"></button></div>`);

}
  
function repoList(repositors) {
  repoListRemove(searchRepos); 
  if (!repositors.items) return;
    searchRepos.forEach((item, i)=>{
        item.textContent = repositors.items[i].name;
        item.dataset.owner = repositors.items[i].owner.login;
        item.dataset.stars = repositors.items[i].stargazers_count;
        item.hidden = false;
      })
    
  }



  

  