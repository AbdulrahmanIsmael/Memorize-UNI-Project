const nameInp = document.getElementById("name");
const btn = document.querySelector(".btn-test");

startTest();

function startTest() {
  btn.addEventListener("click", (e) => {
    if (nameInp.value !== "") {
      localStorage.setItem("Username", nameInp.value);
      window.location.href = "../loading.html";
    } else {
      alert("Please Enter Your Name...");
    }
    e.preventDefault();
  });
}
