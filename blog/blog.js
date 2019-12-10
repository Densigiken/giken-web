document.addEventListener("DOMContentLoaded",e=>{
  fetch('https://api.myjson.com/bins/qpq3o', {// このURLは暫定的に利用させていただいているサービスの物なので、できる限り早く大学のftpサーバーから取得するように変える。
    method: "GET",
    mode: 'cors'
  })
  .then((response) => {
    if (response.ok) {
      return response.json().then(resJson => {
        console.log(resJson);
        const contents = JSON.parse(JSON.stringify(resJson));
        for (let i = contents.length-1; i >= 0; i--) {
          const content = contents[i];
          console.log(content);
          let card =
            `<section class="card">
              <div class="card_layout">
                <h3 class="card_title">${content.title}</h3>
                <span class="card_info">
                <span class="card_author">Posted by ${content.author}</span><time class="card_time">at ${content.dt}</time>
                </span>
                <article class="card_article">
                  <div class="card_text">`
          for (let j = 0; j < content.body.length; j++) {
            card += '<p>'+content.body[j]+'</p>'
          }
          card += '</div></article></div></section>'
          document.getElementsByTagName('main')[0].insertAdjacentHTML('afterbegin',card);
        }
      });
    }
    throw new Error('Network error.');
  })
  .catch(error => {
    console.error(error);
  });
})