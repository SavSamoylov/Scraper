$(document).ready(()=>{

  let pathname = window.location.pathname;

  if (pathname === "/"){
    $.get("/scrape", (nodes)=>{

      nodes.map((node)=>{
        const title = node.title;
        const link = node.link;
        const summ = node.summary;

        const card = `
        <div class="card">
          <div class="card-body">
            <button class="btn btn-sm btn-primary float-right saveArticle" data-title="${title}" data-link="${link}" data-summary="${summ}">Save</button>
            <h4 class='card-title'>
              <a href='${link}'>${title}</a>
            </h4>
            <p>
              ${summ}
            </p>
          </div>
        </div>
        `

        $(".newArticles").append(card)
      })

    })
  }


  $(document).on("click", '.saveArticle', (e)=>{
    e.preventDefault()


  })

})
