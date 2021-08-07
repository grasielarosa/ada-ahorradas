"use strict";
// types
exports.__esModule = true;
var inputName = document.getElementById('inputNameID');
var btnNewCategory = document.getElementById('btnNewCategory');
var categories = document.getElementById('categoriesId');
// ***************** ***************** ***************** ***************** 
// ***************** suport functions *****************
// ***************** ***************** ***************** ***************** 
// ***************** create list *****************
var createList = function () {
    return document.createElement('li');
};
// ***************** clear input *****************
var clearInputCategory = function () {
    inputName.value = '';
    inputName.focus();
};
// ***************** create delete button *****************
var createEditCategoryBtn = function (li) {
    var btnEditCategory = document.createElement('button');
    btnEditCategory.innerText = 'Editar';
    btnEditCategory.setAttribute('class', 'edit-category');
    btnEditCategory.setAttribute('title', 'click para editar esta categoría');
    li.appendChild(btnEditCategory);
};
var createDeleteCategoryBtn = function (li) {
    var btnDeleteCategory = document.createElement('button');
    btnDeleteCategory.innerText = 'Apagar';
    btnDeleteCategory.setAttribute('class', 'delete-category');
    btnDeleteCategory.setAttribute('title', 'click para apagar esta categoría');
    li.appendChild(btnDeleteCategory);
};
// ***************** ***************** ***************** ***************** 
// ***************** main functions - create new category *****************
// ***************** ***************** ***************** ***************** 
var createNewCategory = function (inputValue) {
    var newCategory = createList();
    newCategory.innerText = inputValue;
    categories.appendChild(newCategory);
    clearInputCategory();
    createEditCategoryBtn(newCategory);
    createDeleteCategoryBtn(newCategory);
    saveCategories();
};
// ***************** event with click *****************
btnNewCategory.addEventListener('click', function () {
    if (!inputName.value)
        return;
    createNewCategory(inputName.value);
});
// ***************** event with keyboard *****************
inputName.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputName.value)
            return;
        createNewCategory(inputName.value);
    }
});
// ***************** delete  function *****************
document.addEventListener('click', function (e) {
    var el = e.target;
    if (el.classList.contains('delete-category')) {
        el.parentElement.remove();
        saveCategories();
    }
});
// ***************** ***************** ***************** 
// *****************   Local Storage   *****************
// ***************** ***************** ***************** 
// cambiar para spread operator
var saveCategories = function () {
    var liCategory = categories.querySelectorAll('li');
    var categoryList = [];
    for (var _i = 0, liCategory_1 = liCategory; _i < liCategory_1.length; _i++) {
        category = liCategory_1[_i];
        console.log(liCategory);
        var categoryName = category.innerText;
        categoryName = categoryName.replace('Apagar', '').trim();
        categoryName = categoryName.replace('Editar', '').trim();
        categoryList.push(categoryName);
    }
    var categoriesJSON = JSON.stringify(categoryList);
    localStorage.setItem('categories', categoriesJSON);
};
var addSavedCategories = function () {
    var categories = localStorage.getItem('categories');
    var categoryList = JSON.parse(categories);
    for (var _i = 0, categoryList_1 = categoryList; _i < categoryList_1.length; _i++) {
        var category = categoryList_1[_i];
        createNewCategory(category);
    }
};
addSavedCategories();
