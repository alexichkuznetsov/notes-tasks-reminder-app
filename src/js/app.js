// TODO:
// 1. Поиск и добавить список, куда будут выводиться результаты поиска
// 2. Фильтрация done / not-done (возможно ее стоит перенести в task list)
// 3. Мелочи

// Controller that handles all
// operations that are connected
// with user interface
const UIController = (function() {
    const selectors = {
        // Buttons
        navOpen: 'nav-open',
        navClose: 'nav-close',
        newNote: 'new-note',
        newTask: 'new-task',
        newReminder: 'new-reminder',
        createBtn: 'create-btn',

        // UI
        navList: 'nav-list',
        notesList: 'notes-list',
        tasksList: 'tasks-list',
        remindersList: 'reminders-list',

        // Modal
        modal: 'modal',
        modalWindow: 'modal-window',
        modalClose: 'modal-close',

        // Options
        optionNote: 'option-note',
        optionTask: 'option-task',
        optionReminder: 'option-reminder',

        // Form
        form: 'add-form',

        // Inputs
        selectType: 'select-type',
        inputTitle: 'input-title',
        inputBody: 'input-body',
        inputDone: '.form__radio-btn:checked',
        inputDate: 'input-date',
        radioDone: '.form__radio-btn--done',
        radioNotDone: '.form__radio-btn--not-done',
        inputHidden: '.form__input--hidden',

        // Input groups
        groupDone: 'group-done',
        groupDate: 'group-date',

        // Sections
        sectionNotes: 'section-notes',
        sectionTasks: 'section-tasks',
        sectionReminders: 'section-reminders'
    };

    function getElementByDataId(id) {
        return document.querySelector(`.items-list__item[data-id="${ id }"]`);
    }

    return {
        getSelectors: function() {
            return selectors;
        },

        openNav: function() {
            document.getElementById(selectors.navList).classList.add('nav-list--open');
        },

        closeNav: function() {
            document.getElementById(selectors.navList).classList.remove('nav-list--open');
        },

        openModal: function() {
            document.getElementById(selectors.modal).classList.add('modal--open');
            document.getElementById(selectors.modalWindow).classList.add('modal__window--open');
            document.getElementById(selectors.createBtn).value = 'Create';
        },

        closeModal: function() {
            document.getElementById(selectors.modal).classList.remove('modal--open');
            document.getElementById(selectors.modalWindow).classList.remove('modal__window--open');
        },

        resetForm: function() {
            this.clearInputs();

            document.getElementById(selectors.inputTitle).classList.remove('form__invalid');
            document.getElementById(selectors.inputBody).classList.remove('form__invalid');
            document.getElementById(selectors.inputDate).classList.remove('form__invalid');
        },

        fillForm: function(item) {
            document.getElementById(selectors.createBtn).value = 'Edit';
            document.getElementById(selectors.inputTitle).value = item.title;
            document.getElementById(selectors.inputBody).value = item.body;
            document.querySelector(selectors.inputHidden).value = item.id;
            
            switch (item.type) {
                case 'task':
                    if (item.done) {
                        document.querySelector(selectors.radioDone).setAttribute('selected', true);
                        document.querySelector(selectors.radioNotDone).setAttribute('selected', false);
                    } else {
                        document.querySelector(selectors.radioDone).setAttribute('selected', false);
                        document.querySelector(selectors.radioNotDone).setAttribute('selected', true);
                    }

                    break;
                case 'reminder':
                    let outputDate = `${ item.expires.getMonth() + 1 }/${ item.expires.getDate() }/${ item.expires.getFullYear() }`;
                    document.getElementById(selectors.inputDate).value = outputDate;
                    console.log(outputDate);
                    break;
                default:
                    break;
            }
        },

        setOptionSelected: function(selector) {
            document.getElementById(selector).selected = true;
        },

        setGroupVisibility: function(selector, state) {
            let el = document.getElementById(selector);

            switch (state) {
                case 'visible':
                    el.classList.remove('form__group--invisible');
                    break;
                case 'invisible':
                    el.classList.add('form__group--invisible');
                    break;
            }
        },

        setSectionVisibility: function(selector, state) {
            let el = document.getElementById(selector);

            switch (state) {
                case 'visible':
                    el.classList.remove('section--invisible');
                    break;
                case 'invisible':
                    el.classList.add('section--invisible');
                    break;
            }
        },

        clearInputs: function() {
            document.getElementById(selectors.inputTitle).value = '';
            document.getElementById(selectors.inputBody).value = '';
            document.getElementById(selectors.inputDate).value = '';
        },

        validateInput: function(type) {
            let el, res;

            switch (type) {
                case 'title':
                    el = document.getElementById(selectors.inputTitle);
                    break;
                case 'body':
                    el = document.getElementById(selectors.inputBody);
                    break;
                case 'date':
                    el = document.getElementById(selectors.inputDate);
                    break;
                default:
                    break;
            }

            const val = el.value;

            if (!val.length) {
                el.classList.add('form__invalid');
                res = false;
            } else {
                el.classList.remove('form__invalid');
                res = true;
            }

            return res;
        },

        appendToList: function(item) {
            let list, listItem;

            listItem = document.createElement('li');
            listItem.className = 'items-list__item';
            listItem.dataset.id = item.id;

            if (item.type === 'note') {
                list = document.getElementById(selectors.notesList);

                listItem.dataset.type = 'note';
                listItem.innerHTML = `
                    <div class="item">
                        <h3 class="item__category">note</h3>

                        <div class="item__icon-box">
                            <svg class="item__icon">
                                <use xlink:href="assets/img/icon-more.svg#icon"></use>
                            </svg>

                            <div class="item__controls item__controls--note">
                                <svg class="item__controls-icon item__controls-icon--edit">
                                    <use xlink:href="assets/img/icon-edit.svg#icon"></use>
                                </svg>

                                <svg class="item__controls-icon item__controls-icon--remove">
                                    <use xlink:href="assets/img/icon-trash.svg#icon"></use>
                                </svg>
                            </div>
                        </div>

                        <div class="item__body">
                            <h4 class="item__title">
                                ${ item.title }
                            </h4>
                            <p class="item__text">
                                ${ item.body }
                            </p>
                        </div>
                    </div>
                `;
            } else if (item.type === 'task') {
                list = document.getElementById(selectors.tasksList);

                listItem.dataset.type = 'task';
                listItem.innerHTML = `
                    <div class="item ${ item.done ? 'item--task-done' : 'item--task-not-done' }">
                        <h3 class="item__category">task</h3>

                        <div class="item__icon-box">
                            <svg class="item__icon">
                                <use xlink:href="assets/img/icon-more.svg#icon"></use>
                            </svg>

                            <div class="item__controls">
                                <svg class="item__controls-icon item__controls-icon--done">
                                    <use xlink:href="assets/img/icon-done.svg#icon"></use>
                                </svg>

                                <svg class="item__controls-icon item__controls-icon--not-done">
                                    <use xlink:href="assets/img/icon-not-done.svg#icon"></use>
                                </svg>
                        
                                <svg class="item__controls-icon item__controls-icon--edit">
                                    <use xlink:href="assets/img/icon-edit.svg#icon"></use>
                                </svg>

                                <svg class="item__controls-icon item__controls-icon--remove">
                                    <use xlink:href="assets/img/icon-trash.svg#icon"></use>
                                </svg>
                            </div>
                        </div>

                        <div class="item__body">
                            <h4 class="item__title">
                                ${ item.title }
                            </h4>
                            <p class="item__text">
                                ${ item.body }
                            </p>
                        </div>
                    </div>
                `;
            } else if (item.type === 'reminder') {
                list = document.getElementById(selectors.remindersList);
                listItem.dataset.type = 'reminder';

                let displayDate = `${ item.expires.getMonth() + 1 } / ${ item.expires.getDate() } / ${ item.expires.getFullYear() }`;

                const itemDate = item.expires.getTime();
                const currentDate = new Date().getTime();

                listItem.innerHTML = `
                    <div class="item item-reminder">
                        <h3 class="item__category item-reminder__category">reminder</h3>
                        <p class="item-reminder__date ${ itemDate > currentDate ? 'item-reminder__date--in' : 'item-reminder__date--off' }">${ displayDate }</p>

                        <div class="item__icon-box">
                            <svg class="item__icon">
                                <use xlink:href="assets/img/icon-more.svg#icon"></use>
                            </svg>

                            <div class="item__controls item__controls--reminder">
                                <svg class="item__controls-icon item__controls-icon--edit">
                                    <use xlink:href="assets/img/icon-edit.svg#icon"></use>
                                </svg>

                                <svg class="item__controls-icon item__controls-icon--remove">
                                    <use xlink:href="assets/img/icon-trash.svg#icon"></use>
                                </svg>
                            </div>
                        </div>

                        <div class="item__body">
                            <h4 class="item__title">${ item.title }</h4>
                            <p class="item__text">${ item.body }</p>
                        </div>
                    </div>
                `;
            }

            list.appendChild(listItem);
        },

        updateItem: function(item) {
            const el = getElementByDataId(item.id);

            el.querySelector('.item__title').textContent = item.title;
            el.querySelector('.item__text').textContent = item.body;

            if (item.type === 'task') {
                const innerEl = el.querySelector('.item');
                innerEl.classList.remove('item--task-done');
                innerEl.classList.remove('item--task-not-done');

                if (item.done) {
                    innerEl.classList.add('item--task-done');
                } else {
                    innerEl.classList.add('item--task-not-done');
                }
            } else if (item.type === 'reminder') {
                let displayDate = `${ item.expires.getMonth() + 1 } / ${ item.expires.getDate() } / ${ item.expires.getFullYear() }`;
                const date = el.querySelector('.item-reminder__date');

                date.classList.remove('item-reminder__date--in');
                date.classList.remove('item-reminder__date--off');
                date.textContent = displayDate;

                const currentDate = new Date().getTime();

                if (item.expires.getTime() > currentDate) {
                    date.classList.add('item-reminder__date--in');
                } else {
                    date.classList.add('item-reminder__date--off');
                }
            }
        },

        removeEl: function(el) {
            el.remove();
        }
    }
})();

const ItemsController = (function() {
    // All currents items
    let items = {
        notes: [],
        tasks: [],
        reminders: []
    }

    // Note constructor
    function Note(id, title, body) {
        this.type = 'note';
        this.id = id;
        this.title = title;
        this.body = body;
    }

    // Task constructor
    function Task(id, title, body, isDone) {
        this.type = 'task';
        this.id = id;
        this.title = title;
        this.body = body;
        this.done = isDone;
    }

    // Reminder constructor
    function Reminder(id, title, body, expires) {
        this.type = 'reminder';
        this.id = id;
        this.title = title;
        this.body = body;
        this.expires = new Date(expires);
    }

    function uniqueID(min, max) {
        min = min || 0;
        max = max || 1000000;

        return Math.floor(Math.random() * (max - min) + min);
    }

    return {
        getData: function() {
            return items;
        },

        createItem: function(type, data) {
            const id = uniqueID();
            let item;

            if (type === 'note') {
                item = new Note(id, data.title, data.body);
                items.notes.push(item);
            } else if (type === 'task') {
                item = new Task(id, data.title, data.body, data.isDone);
                items.tasks.push(item);
            } else if (type === 'reminder') {
                item = new Reminder(id, data.title, data.body, data.expires);
                items.reminders.push(item);
            }

            console.log(items);

            return item;
        },

        updateItem: function(type, id, data) {
            let item = items[type].find(function(el) {
                return el.id === id;
            });

            item.title = data.title;
            item.body = data.body;

            if (item.type === 'task') {
                item.done = data.isDone;
            } else if (item.type === 'reminder') {
                item.expires = new Date(data.expires);
            }

            return item;
        },

        deleteItem: function(type, id) {
            let arr = items[type];

            items[type] = arr.filter(function(item) {
                return item.id !== id;
            });

            console.log(items);
        },

        getItem: function(type, id) {
            const idx = items[type].findIndex(function(item) {
                return item.id === id;
            });

            return items[type][idx];
        }
    }
})();

// Main app controller
const App = (function(UI, IC) {

    const state = {
        formValid: {
            title: false,
            body: false,
            date: false
        },
        formState: 'create'
    };
    
    function loadEventListeners() {
        const selectors = UI.getSelectors();

        // Event listener for opening sidenav
        document.getElementById(selectors.navOpen)
                .addEventListener('click', UI.openNav);
        // Event listener for closing sidenav
        document.getElementById(selectors.navClose)
                .addEventListener('click', UI.closeNav);
        
        // Event listener for opening modal
        document.getElementById(selectors.newNote)
                .addEventListener('click', function() {
                    UI.closeNav();
                    UI.setGroupVisibility(selectors.groupDate, 'invisible');
                    UI.setGroupVisibility(selectors.groupDone, 'invisible');
                    UI.setOptionSelected(selectors.optionNote);
                    UI.openModal();
                    setFormState('create');
                });
        document.getElementById(selectors.newTask)
                .addEventListener('click', function() {
                    UI.closeNav();
                    UI.setGroupVisibility(selectors.groupDone, 'visible');
                    UI.setGroupVisibility(selectors.groupDate, 'invisible');
                    UI.setOptionSelected(selectors.optionTask);
                    UI.openModal();
                    setFormState('create');
                });
        document.getElementById(selectors.newReminder)
                .addEventListener('click', function() {
                    UI.closeNav();
                    UI.setGroupVisibility(selectors.groupDone, 'invisible');
                    UI.setGroupVisibility(selectors.groupDate, 'visible');
                    UI.setOptionSelected(selectors.optionReminder);
                    UI.openModal();
                    setFormState('create');
                });
        // Event listener for closing modal
        document.getElementById(selectors.modalClose)
                .addEventListener('click', function() {
                    UI.closeModal();
                    UI.resetForm();
                    setFormState('create');
                });
        
        // Event listeners for input validation
        document.getElementById(selectors.inputTitle)
                .addEventListener('blur', function() {
                    const state = UI.validateInput('title');
                    setFormValidationState('title', state);
                });
        document.getElementById(selectors.inputBody)
                .addEventListener('blur', function() {
                    const state = UI.validateInput('body');
                    setFormValidationState('body', state);
                });
        document.getElementById(selectors.inputDate)
                .addEventListener('blur', function() {
                    const state = UI.validateInput('date');
                    setFormValidationState('date', state);
                });
        
        // Event listener for creating new item
        document.getElementById(selectors.form)
                .addEventListener('submit', function(e) {
                    e.preventDefault();

                    if (state.formState === 'create') {
                        create(e);
                    } else if (state.formState === 'edit') {
                        update(e);
                    }
                });

        // Event delegation for item controls
        document.getElementById(selectors.notesList)
                .addEventListener('click', function(e) {
                    controlsHandler(e, 'notes');
                });
        document.getElementById(selectors.tasksList)
                .addEventListener('click', function(e) {
                    controlsHandler(e, 'tasks');
                });
        document.getElementById(selectors.remindersList)
                .addEventListener('click', function(e) {
                    controlsHandler(e, 'reminders');
                });
    }

    function create(e) {
        const selectors = UI.getSelectors();

        const type = document.getElementById(selectors.selectType).value,
              title = document.getElementById(selectors.inputTitle).value,
              body = document.getElementById(selectors.inputBody).value;

        validateAll();
        
        if ((type === 'note' || type === 'task') && (!state.formValid.title || !state.formValid.body)) return;
        if (type === 'reminder' && (!state.formValid.title || !state.formValid.body || !state.formValid.date)) return;
        
        const data = {
            title: title,
            body: body
        }

        let item;

        if (type === 'note') {
            item = IC.createItem('note', data);
        } else if (type === 'task') {
            const isDone = document.querySelector(selectors.inputDone).value;
            data.isDone = isDone === 'done' ? true : false;

            item = IC.createItem('task', data);
        } else if (type === 'reminder') {
            const expires = document.getElementById(selectors.inputDate).value;
            data.expires = expires;

            item = IC.createItem('reminder', data);
        }

        UI.closeModal();
        UI.clearInputs();
        UI.appendToList(item);

        resetFormValidationState();
    }

    function update(e) {
        const selectors = UI.getSelectors();

        const type = document.getElementById(selectors.selectType).value,
              title = document.getElementById(selectors.inputTitle).value,
              body = document.getElementById(selectors.inputBody).value,
              id = parseInt(document.querySelector(selectors.inputHidden).value, 10);

        validateAll();
        
        if ((type === 'note' || type === 'task') && (!state.formValid.title || !state.formValid.body)) return;
        if (type === 'reminder' && (!state.formValid.title || !state.formValid.body || !state.formValid.date)) return;
        
        const data = {
            title: title,
            body: body
        }

        let item;

        if (type === 'note') {
            item = IC.updateItem('notes', id, data);
        } else if (type === 'task') {
            const isDone = document.querySelector(selectors.inputDone).value;
            data.isDone = isDone === 'done' ? true : false;

            item = IC.updateItem('tasks', id, data);
        } else if (type === 'reminder') {
            const expires = document.getElementById(selectors.inputDate).value;
            data.expires = expires;

            item = IC.updateItem('reminders', id, data);
        }

        UI.closeModal();
        UI.clearInputs();
        UI.updateItem(item);

        resetFormValidationState();
    }

    function validateAll() {
        const title = UI.validateInput('title'),
              body = UI.validateInput('body'),
              date = UI.validateInput('date');

        setFormValidationState('title', title);
        setFormValidationState('body', body);
        setFormValidationState('date', date);
    }

    function setFormValidationState(subject, newState) {
        state.formValid[subject] = newState;
    }

    function setFormState(s) {
        state.formState = s;
    }

    function resetFormValidationState() {
        state.formValid = {
            title: false,
            body: false,
            date: false
        }
    }

    function controlsHandler(e, type) {
        const el = e.target.closest('.item__controls-icon');
        const parent = e.target.closest('.items-list__item');
        const selectors = UI.getSelectors();

        if (el) {
            const actionType = el.classList[1];
            const id = parseInt(parent.dataset.id, 10);

            switch (actionType) {
                case 'item__controls-icon--remove':
                    IC.deleteItem(type, id);
                    UI.removeEl(parent);

                    break;
                case 'item__controls-icon--edit':
                    const item = IC.getItem(type, id);

                    if (item.type === 'note') {
                        UI.setGroupVisibility(selectors.groupDate, 'invisible');
                        UI.setGroupVisibility(selectors.groupDone, 'invisible');
                    } else if (item.type === 'task') {
                        UI.setGroupVisibility(selectors.groupDone, 'visible');
                        UI.setGroupVisibility(selectors.groupDate, 'invisible');
                    } else if (item.type === 'reminder') {
                        UI.setGroupVisibility(selectors.groupDone, 'invisible');
                        UI.setGroupVisibility(selectors.groupDate, 'visible');
                    }

                    setFormState('edit');
                    UI.openModal();
                    UI.fillForm(item);
                    break;
                default:
                    break;
            }
        }
    }

    return {
        init: function() {
            console.log('Initialized..');

            loadEventListeners();
        }
    }
})(UIController, ItemsController);


// Init our app
App.init();
