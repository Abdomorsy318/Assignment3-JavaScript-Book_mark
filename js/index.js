var sitNameInput = document.getElementById("siteName");
var websiteUrlInput = document.getElementById("websiteURL");
var errorMsg = document.getElementById("msgError");
var bookList = [];

if(localStorage.getItem("bookMark") !== null){
    bookList = JSON.parse(localStorage.getItem("bookMark"));
    display();
}

function addBook(){
    if(validSite(sitNameInput) == true && validSite(websiteUrlInput) == true)
    {
        var bookData = {
            siteName : sitNameInput.value,
            siteURL : websiteUrlInput.value
        };
        bookList.push(bookData);
        localStorage.setItem("bookMark", JSON.stringify(bookList));
        display();
        clear();
    }
    else{
        errorMsg.classList.remove("d-none");
    }
}

function display(){
    var box = ``;
    for (var i = 0; i < bookList.length; i++) {
        box += 
        `
            <tr>
            <td>${i+1}</td>
            <td>${bookList[i].siteName}</td>
            <td>
               
                    <button onclick = "urlVisit(${i})" type="button" class="btn btn-visit">
                        <i class="fa-regular fa-eye pe-2"></i>
                        Visit
                    </button>
                
            </td>
            <td>
                <button onclick = "deleteBook(${i})" type="button" class="btn btn-delete">
                    <i class="fa-solid fa-trash-can pe-2"></i>
                    Delete
                </button>
            </td>
            </tr>
        `
    }
    document.getElementById("tableData").innerHTML = box;
}

function clear(){
    sitNameInput.value = null;
    websiteUrlInput.value = null;
    sitNameInput.classList.remove("is-valid");
    sitNameInput.classList.remove("is-invalid");
    websiteUrlInput.classList.remove("is-valid");
    websiteUrlInput.classList.remove("is-invalid");
}

function deleteBook(indexItem){
    bookList.splice(indexItem , 1);
    localStorage.setItem("bookMark" , JSON.stringify(bookList));
    display();
}

function validSite(element){
    var text = element.value;
    var regex = {
        siteName: /^([A-z]|[a-z]){3,}$/,
        websiteURL: /^https?:\/\/.+$/
    }
    if(regex[element.id].test(text) == true)
    {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    }
    else
    {
        element.classList.add("is-invalid");
        return false;
    }
}

function closeMsg(){
    errorMsg.classList.add("d-none");
}

function urlVisit(indexItem2){
 window.open(bookList[indexItem2].siteURL);
}