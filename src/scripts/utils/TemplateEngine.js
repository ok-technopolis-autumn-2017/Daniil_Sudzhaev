let divElement = document.createElement('div');

function getTemplateRootNode(scriptId) {
    let script = document.getElementById(scriptId);
    divElement.innerHTML = script.innerHTML;

    let result = divElement.children[0];
    divElement.removeChild(result);

    return result;
}

let templateEngine = {
    todoItem: function (data) {
        let root = getTemplateRootNode('todosItemTemplate');
        let readyMark = root.querySelector('.js-todos-item_ready-mark');
        let remove = root.querySelector('.js-todos-item_remove');
        let text = root.querySelector('.js-todos-item_text');

        if (data.text) {
            text.innerText = data.text;
        }

        if (data.isReady) {
            readyMark.checked = true;
        }

        return {
            root: root,
            text: text,
            readyMark: readyMark,
            remove: remove
        };
    }
};

module.exports = templateEngine;
