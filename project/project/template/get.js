const SERVER_URL = 'http://127.0.0.1:8000' 
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }


async function postArticle(article){
    let token = getCookie('access_token') 
    let response = await fetch(`${SERVER_URL}/blog/article`,{
        method : 'POST',
        body: article, 
        headers :{
            'Authorization': `Bearer ${token}`
        }

    })
    let data = await response.json()
    return data

}


async function showModal() {
    let modal = document.getElementById('modal');
    modal.style.display = 'flex';
    modal.style.animation = 'fadein 1s'
}

async function closeModal(){
    let modal = document.getElementById('modal');
    modal.style.animation = 'fadeout 1s';
    setTimeout(() => modal.style.display = 'none', 2000);
}

async function postCategory(category){
    let token = getCookie('access_token') 
    let response = await fetch(`${SERVER_URL}/blog/category`,{
        method: 'POST',
        body: category,
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    let categorys = await response.json();
    return categorys;
}








  async function submitArticle() {
    let form = document.getElementById('form')
    let formData = new FormData(form);
    let result = await postArticle(formData);
    console.log(result);
}


async function getArticle() { 
    let token = getCookie('access_token') 
    let response = await fetch(`${SERVER_URL}/blog/article`,{
        method :'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        },
     });
    let data = await response.json(); // 여기도 꼭 await 를 해주어야 함
    return data;
}




async function insertArticle() {
    const post =  await getArticle();
    post.forEach(data => {
        document.body.insertAdjacentHTML('beforebegin',`
        <div id= '${data.id}'>
            <h1>${data.author}</h1> 
            <h1 class='title'>${data.title}</h1>
            <p class='content'>${data.content}</p>
            <p class ='content'>${data.category}</p>
        </div>`
        
        )
        
    });
  }
//insertArticle()

