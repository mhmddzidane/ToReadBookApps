document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("inputBook");
    
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        cek();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
 });

 document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });

 document.addEventListener("ondataloaded", () => {
    refreshDataFromTodos();
 });
    