/**
 * @param {HTMLElement} root
 * @constructor
 */
function TodosContainer(root) {
    this._root = root;
    this._todosContainer = root.querySelector('.js-todos-container');
}

/**
 * @param {Boolean} isVisible
 * @returns {TodosContainer}
 */
TodosContainer.prototype.setVisibility = function (isVisible) {
    if (isVisible) {
        this._todosContainer.classList.remove('__empty');
    } else {
        this._todosContainer.classList.add('__empty');
    }
    return this;
};

/**
 * @returns {HTMLElement}
 */
TodosContainer.prototype.getRoot = function () {
    return this._root;
};

module.exports = TodosContainer;
