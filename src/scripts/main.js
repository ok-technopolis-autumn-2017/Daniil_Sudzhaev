document.addEventListener('DOMContentLoaded', init);

const TodosListModel = require('./components/TodosListModel');
const TodosContainer = require('./components/TodosContainer');
const TodoAddbar = require('./components/TodosAddbar');
const TodosList = require('./components/TodosList');
const TodosActionbar = require('./components/TodosActionbar');
const viewState = require('./views/ViewState');

function init() {
    const mainWrapper = document.querySelector('.main-wrapper');
    const todosContainer = new TodosContainer(mainWrapper);
    const todoAddbar = new TodoAddbar(mainWrapper.querySelector('.todos-addbar'));
    const todosList = new TodosList(mainWrapper.querySelector('.js-todos-list'));
    const todosActionbar = new TodosActionbar(mainWrapper.querySelector('.js-todos-actionbar'));
    const todosListModel = new TodosListModel([]);

    viewState.onChange(data => {
        todosList.filterItems(data['filter']);
    });

    todosListModel.onChange(() => {
        todosContainer.setVisibility(todosListModel.getList().length !== 0);

        let leftItemsNumber = todosListModel.getLeftItemsNumber();
        todosActionbar.setLeftItemsNumber(leftItemsNumber);

        todosActionbar.setClearCompletedVisibility(todosListModel.getList().length > leftItemsNumber);
    });

    todoAddbar
        .on('todoCreated', inputData => todosListModel.add(inputData))
        .on('selectAll', () => {
            todosListModel.getList()
                .filter(model => !model.get('isReady'))
                .forEach(model => model.set('isReady', true))
        });

    todosListModel
        .on('todoAdd', model => {
            todosList.addTodo(model);
        })
        .on('todoRemove', model => {
            todosList.remove(model);
        })
        .on('todoChange', () => {
            todosList.filterItems();
        });

    todosActionbar
        .on('clearCompleted', () => {
            todosListModel.clearCompleted();
        })
        .on('filterSelected', filter => {
            viewState.setFilter(filter);
        });
}
