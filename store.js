
document.addEventListener("DOMContentLoaded", function () {
  
  const addCartBtns = document.querySelectorAll(".btn-add-cart");
  const toastPlacement = document.getElementById("toastPlacement");
  const inlineCartCount = document.getElementById("inlineCartCount");
  const inlineCartTotal = document.getElementById("inlineCartTotal");
  const inlineClearBtn = document.getElementById("inlineClearBtn");


  let cartPrices = JSON.parse(localStorage.getItem("hardwareStoreCart")) || [];

  function updateCartUI() {


    const count = cartPrices.length;
    inlineCartCount.innerText = count;



    const total = cartPrices.reduce((sum, price) => sum + price, 0);
    inlineCartTotal.innerText = `$${total}`;




    localStorage.setItem("hardwareStoreCart", JSON.stringify(cartPrices));
  }


  updateCartUI();


  addCartBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const productName = this.getAttribute("data-name");
      const productPrice = parseFloat(this.getAttribute("data-price"));


      cartPrices.push(productPrice);
      

      updateCartUI();

      const originalText = this.innerHTML;
      this.innerHTML = `تمت الإضافة <i class="fas fa-check ms-1"></i>`;
      this.style.background = "var(--gradient-accent)";
      this.style.color = "#2c1e16";
      this.style.borderColor = "transparent";

      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.background = "transparent";
        this.style.color = "var(--text-primary)";
        this.style.borderColor = "var(--primary-color)";
      }, 1200);

     
      showToast(productName);
    });
  });

    inlineClearBtn.addEventListener("click", function() {
    if (cartPrices.length > 0) {
      if (confirm("هل تريد بالتأكيد إلغاء وتفريغ الفاتورة بالكامل؟")) {
        cartPrices = []; 
        updateCartUI();   
      }
    } else {
      alert("الفاتورة فارغة بالفعل ولا توجد عناصر لإلغائها.");
    }
  });

  function showToast(productName) {
    const toastWrapper = document.createElement("div");
    toastWrapper.className = "toast custom-toast align-items-center mb-3";
    toastWrapper.setAttribute("role", "alert");
    toastWrapper.setAttribute("aria-live", "assertive");
    toastWrapper.setAttribute("aria-atomic", "true");

    toastWrapper.innerHTML = `
      <div class="toast-header border-0">
        <i class="fas fa-laptop text-warning me-2"></i>
        <strong class="me-auto ms-2">أجهزة المتجر</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body pt-1">
        تمت إضافة <strong>${productName}</strong> إلى حساب الفاتورة.
      </div>
    `;

    toastPlacement.appendChild(toastWrapper);
    const bsToast = new bootstrap.Toast(toastWrapper, { delay: 2500 });
    bsToast.show();
    
    toastWrapper.addEventListener('hidden.bs.toast', () => toastWrapper.remove());
  }
});