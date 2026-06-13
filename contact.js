
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('consultationForm');
  const successMessage = document.getElementById('successMessage');

  form.addEventListener('submit', function (e) {
   
    e.preventDefault(); 

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return; 
    }
   
    form.style.display = 'none'; 
    successMessage.classList.remove('d-none'); 
  });
});