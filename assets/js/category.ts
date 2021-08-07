// types

type Category = {
    id: number,
    name: string, 

}

const inputName = document.getElementById('inputNameID');
const btnNewCategory = document.getElementById('btnNewCategory');
const categories = document.getElementById('categoriesId');


// ***************** ***************** ***************** ***************** 
// ***************** suport functions *****************
// ***************** ***************** ***************** ***************** 



// ***************** create list *****************

const createList = () => {
    return document.createElement('li');
    }

// ***************** clear input *****************
const clearInputCategory = () => {
    inputName.value = '';
    inputName.focus();
}

// ***************** create delete button *****************

const createEditCategoryBtn = (li) => {
    const btnEditCategory = document.createElement('button');
    btnEditCategory.innerText = 'Editar';
    btnEditCategory.setAttribute('class', 'edit-category');
    btnEditCategory.setAttribute('title', 'click para editar esta categoría');
    li.appendChild(btnEditCategory);
}

const createDeleteCategoryBtn = (li) => {
    const btnDeleteCategory = document.createElement('button');
    btnDeleteCategory.innerText = 'Apagar';
    btnDeleteCategory.setAttribute('class', 'delete-category');
    btnDeleteCategory.setAttribute('title', 'click para apagar esta categoría');
    li.appendChild(btnDeleteCategory);
}


// ***************** ***************** ***************** ***************** 
// ***************** main functions - create new category *****************
// ***************** ***************** ***************** ***************** 
const createNewCategory = (inputValue) => {
    const newCategory = createList();
    newCategory.innerText = inputValue;
    categories.appendChild(newCategory);

    clearInputCategory();
    createEditCategoryBtn(newCategory);
    createDeleteCategoryBtn(newCategory);
    saveCategories();
    
}

// ***************** event with click *****************
btnNewCategory.addEventListener('click', function() {
    if (!inputName.value) return;
    createNewCategory(inputName.value);
})

// ***************** event with keyboard *****************
inputName.addEventListener('keypress', function(e) {
    if (e.keyCode === 13){
        if (!inputName.value) return;
        createNewCategory(inputName.value);
    }
})

// ***************** delete  function *****************
document.addEventListener('click', function(e){
    const el = e.target;

    if (el.classList.contains('delete-category')) {
        el.parentElement.remove();
        saveCategories();
    }
})


// ***************** ***************** ***************** 
// *****************   Local Storage   *****************
// ***************** ***************** ***************** 

// cambiar para spread operator
const saveCategories = () => {
    const liCategory = categories.querySelectorAll('li');
    const categoryList = [];

    for (category of liCategory) {
        console.log(liCategory);
        let categoryName = category.innerText;
        categoryName = categoryName.replace('Apagar', '').trim();
        categoryName = categoryName.replace('Editar', '').trim();
        categoryList.push(categoryName);
    }

    const categoriesJSON = JSON.stringify(categoryList);
    localStorage.setItem('categories', categoriesJSON);
}


const addSavedCategories = () => {
    const categories = localStorage.getItem('categories');
    const categoryList = JSON.parse(categories);

    for (let category of categoryList) {
        createNewCategory(category);
    }
}

addSavedCategories();
 export {}