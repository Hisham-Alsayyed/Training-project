document.addEventListener("DOMContentLoaded", function () {

  const articleModal    = new bootstrap.Modal(document.getElementById("articleReaderModal"));
  const modalTarget     = document.getElementById("modal-article-target");
  const progressBar     = document.getElementById("modalProgress");
  const articleModalEl  = document.getElementById("articleReaderModal");


  document.getElementById("blog-grid").addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-read-more");
    if (!btn) return;

    const card = btn.closest(".blog-card-meta");

    modalTarget.innerHTML = `
      <div class="mb-3">${card.querySelector(".meta-tag").innerHTML}</div>
      <h3>${card.querySelector(".blog-article-title").innerHTML}</h3>
      <hr style="border-color: rgba(224,169,103,0.2); margin-bottom:25px;">
      <div style="font-size:1.1rem; color:var(--text-secondary); line-height:1.9;">
        ${card.querySelector(".full-article-content").innerHTML}
      </div>
    `;

    progressBar.style.width = "0%";
    articleModal.show();
  });

  modalTarget.addEventListener("scroll", function () {
    const scrollable = this.scrollHeight - this.clientHeight;
    if (scrollable > 0)
      progressBar.style.width = `${(this.scrollTop / scrollable) * 100}%`;
  });

  articleModalEl.addEventListener("hidden.bs.modal", function () {
    progressBar.style.width = "0%";
    modalTarget.scrollTop = 0;
  });

});
