// TODO:
// 2. Local storage
// 

// Controller that handles all
// operations with local storage
const StorageController = (function() {
    return {
        get: function() {
            let items = localStorage.getItem('items');

            if (items) {
                items = JSON.parse(items);
            } else {
                items = {
                    notes: [],
                    tasks: [],
                    reminders: []
                }
            }

            return items;
        },

        store: function(data) {
            data = JSON.stringify(data);

            localStorage.setItem('items', data);

            console.log('Saved to LS');
        }
    }
})();

// Controller that handles all
// operations with user interface
const UIController = (function() {
    const selectors = {
        // Buttons
        navOpen: 'nav-open',
        navClose: 'nav-close',
        newNote: 'new-note',
        newTask: 'new-task',
        newReminder: 'new-reminder',
        createBtn: 'create-btn',
        filterBox: '.filter__icon-box',

        // UI
        navList: 'nav-list',
        notesList: 'notes-list',
        tasksList: 'tasks-list',
        remindersList: 'reminders-list',
        searchList: 'search-list',

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
        searchInput: 'search-input',

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
                    // let outputDate = `${ item.expires.getMonth() + 1 }/${ item.expires.getDate() }/${ item.expires.getFullYear() }`;
                    document.getElementById(selectors.inputDate).value = item.expires;
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

        appendToList: function(listType, item) {
            let list, listItem;

            if (listType === 'search') {
                list = document.getElementById(selectors.searchList);
            }

            listItem = document.createElement('li');
            listItem.className = 'items-list__item';
            listItem.dataset.id = item.id;

            if (item.type === 'note') {
                list = list || document.getElementById(selectors.notesList);

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
                list = list || document.getElementById(selectors.tasksList);

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
                list = list || document.getElementById(selectors.remindersList);
                listItem.dataset.type = 'reminder';

                // let displayDate = `${ item.expires.getMonth() + 1 } / ${ item.expires.getDate() } / ${ item.expires.getFullYear() }`;


                // const itemDate = item.expires.getTime();
                const itemDate = new Date(item.expires).getTime();
                const currentDate = new Date().getTime();

                listItem.innerHTML = `
                    <div class="item item-reminder">
                        <h3 class="item__category item-reminder__category">reminder</h3>
                        <p class="item-reminder__date ${ itemDate > currentDate ? 'item-reminder__date--in' : 'item-reminder__date--off' }">${ item.expires }</p>

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
                let displayDate = item.expires;
                const date = el.querySelector('.item-reminder__date');

                date.classList.remove('item-reminder__date--in');
                date.classList.remove('item-reminder__date--off');
                date.textContent = displayDate;

                const itemDate = new Date(item.expires).getTime();
                const currentDate = new Date().getTime();

                if (itemDate > currentDate) {
                    date.classList.add('item-reminder__date--in');
                } else {
                    date.classList.add('item-reminder__date--off');
                }
            }
        },

        filterTasks: function(filterType, tasks) {
            if (filterType === 'done') {
                document.querySelector('.filter__icon--not-done').classList.remove('filter__icon--not-done-active');
                document.querySelector('.filter__icon--done').classList.add('filter__icon--done-active');
            } else if (filterType === 'not-done') {
                document.querySelector('.filter__icon--done').classList.remove('filter__icon--done-active');
                document.querySelector('.filter__icon--not-done').classList.add('filter__icon--not-done-active');
            } else if (filterType === 'refresh') {
                document.querySelector('.filter__icon--done').classList.remove('filter__icon--done-active');
                document.querySelector('.filter__icon--not-done').classList.remove('filter__icon--not-done-active');
            }

            const list = document.getElementById(selectors.tasksList);
            list.innerHTML = '';

            tasks.forEach(function(item) {
                const listItem = document.createElement('li');
                listItem.className = 'items-list__item';
                listItem.dataset.id = item.id;
                listItem.dataset.type = 'task';

                let output = `
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

                listItem.innerHTML = output;
                list.appendChild(listItem);
            });
        },

        removeEl: function(el) {
            el.remove();
        },

        hideSearchSection: function() {
            document.querySelector('.section--search').classList.add('section--invisible');
        },

        showSearchSection: function() {
            document.querySelector('.section--search').classList.remove('section--invisible');
        },

        populateSearchList: function(items) {
            const self = this;

            const list = document.getElementById(selectors.searchList);
            list.innerHTML = '';

            const p = document.querySelector('.search-feedback');

            if (!items.length) {
                if (!p) {
                    const p = document.createElement('p');
                    p.className = 'search-feedback';

                    p.appendChild(document.createTextNode('Nothing found'));

                    list.parentElement.insertBefore(p, list);
                }
            } else {
                if (p) p.remove();
            }

            items.forEach(function(item) {
                self.appendToList('search', item);
            });
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
        this.expires = expires;
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
                item.expires = data.expires;
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
        },

        searchItems: function(text) {
            text = text.toLowerCase();
            let data = [...items.notes, ...items.tasks, ...items.reminders];

            return data.filter(function(item) {
                return item.title.toLowerCase().indexOf(text) !== -1;
            })
        },

        setItems: function(data) {
            items = data;
        }
    }
})();

// Main app controller
const App = (function(UI, IC, LS) {

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

        // Event listener for getting items from LS
        document.addEventListener('DOMContentLoaded', function() {
            // Get items from LS
            const items = LS.get();

            // Set items to items controller
            IC.setItems(items);

            // Check if there are any items
            if (items.notes.length || items.tasks.length || items.reminders.length) {
                for (let key in items) {
                    items[key].forEach(function(item) {
                        UI.appendToList(null, item);
                    });
                }
            }
        });

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

                    const items = IC.getData();
                    LS.store(items);
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
        
        // Event listener for filter
        document.querySelector(selectors.filterBox)
                .addEventListener('click', function(e) {
                    const el = e.target.closest('.filter__icon');

                    if (el && el.classList.contains('filter__icon--done')) {
                        let tasks = IC.getData().tasks;
                        tasks = tasks.filter(function(task) {
                            return task.done;
                        });

                        UI.filterTasks('done', tasks);
                    } else if (el && el.classList.contains('filter__icon--not-done')) {
                        let tasks = IC.getData().tasks;
                        tasks = tasks.filter(function(task) {
                            return !task.done;
                        });

                        UI.filterTasks('not-done', tasks);
                    } else if (el && el.classList.contains('filter__icon--refresh')) {
                        let tasks = IC.getData().tasks;
                        UI.filterTasks('refresh', tasks);
                    }
                });

        // Event listener for search input field
        document.getElementById(selectors.searchInput)
                .addEventListener('input', function(e) {
                    if (!e.target.value) {
                        UI.hideSearchSection();
                    } else {
                        UI.showSearchSection();
                        const items = IC.searchItems(e.target.value);
                        
                        UI.populateSearchList(items);
                    }
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
        UI.appendToList(null, item);

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
            let item;

            switch (actionType) {
                case 'item__controls-icon--remove':
                    IC.deleteItem(type, id);
                    UI.removeEl(parent);

                    const items = IC.getData();
                    LS.store(items);

                    break;
                case 'item__controls-icon--edit':
                    item = IC.getItem(type, id);

                    if (item.type === 'note') {
                        UI.setGroupVisibility(selectors.groupDate, 'invisible');
                        UI.setGroupVisibility(selectors.groupDone, 'invisible');
                        UI.setOptionSelected(selectors.optionNote);
                    } else if (item.type === 'task') {
                        UI.setGroupVisibility(selectors.groupDone, 'visible');
                        UI.setGroupVisibility(selectors.groupDate, 'invisible');
                        UI.setOptionSelected(selectors.optionTask);
                    } else if (item.type === 'reminder') {
                        UI.setGroupVisibility(selectors.groupDone, 'invisible');
                        UI.setGroupVisibility(selectors.groupDate, 'visible');
                        UI.setOptionSelected(selectors.optionReminder);
                    }

                    setFormState('edit');
                    UI.openModal();
                    UI.fillForm(item);
                    break;
                case 'item__controls-icon--done':
                    item = IC.getItem(type, id);
                    item.done = true;

                    UI.updateItem(item);
                    break;
                case 'item__controls-icon--not-done':
                    item = IC.getItem(type, id);
                    item.done = false;

                    UI.updateItem(item);
                    break;
                default:
                    break;
            }

            const items = IC.getData();
            LS.store(items);
        }
    }

    return {
        init: function() {
            console.log('Initialized..');

            loadEventListeners();
        }
    }
})(UIController, ItemsController, StorageController);


// Init our app
App.init();
