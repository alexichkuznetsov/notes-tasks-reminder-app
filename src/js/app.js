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

        // Input groups
        groupDone: 'group-done',
        groupDate: 'group-date',

        // Sections
        sectionNotes: 'section-notes',
        sectionTasks: 'section-tasks',
        sectionReminders: 'section-reminders'
    };

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
        },

        closeModal: function() {
            document.getElementById(selectors.modal).classList.remove('modal--open');
            document.getElementById(selectors.modalWindow).classList.remove('modal__window--open');
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

        validateTitle: function() {
            const el = document.getElementById(selectors.inputTitle);
            const val = el.value;
            let res;

            if (!val.length) {
                el.classList.add('form__invalid');
                res = false;
            } else {
                el.classList.remove('form__invalid');
                res = true;
            }

            return res;
        },

        validateBody: function() {
            const el = document.getElementById(selectors.inputBody);
            const val = el.value;
            let res;

            if (!val.length) {
                el.classList.add('form__invalid');
                res = false;
            } else {
                el.classList.remove('form__invalid');
                res = true;
            }

            return res;
        },

        validateDate: function() {
            const el = document.getElementById(selectors.inputDate);
            
            // TODO:
            // Сделать валидацию даты mm/dd/yyyy и/или mm/dd/yy
        },

        validateAll: function() {

        },

        appendToList: function(item) {
            let list, listItem;

            if (item.type === 'note') {
                list = document.getElementById(selectors.notesList);

                listItem = document.createElement('li');
                listItem.className = 'items-list__item';

                listItem.innerHTML = `
                    <div class="item">
                        <h3 class="item__category">note</h3>

                        <div class="item__icon-box">
                            <svg class="item__icon">
                                <use xlink:href="assets/img/icon-more.svg#icon"></use>
                            </svg>

                            <div class="item__controls item__controls--note">
                                <svg class="item__controls-icon item__controls-icon--like">
                                    <use xlink:href="assets/img/icon-heart.svg#icon"></use>
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

                listItem = document.createElement('li');
                listItem.className = 'items-list__item';

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
                        
                                <svg class="item__controls-icon item__controls-icon--like">
                                    <use xlink:href="assets/img/icon-heart.svg#icon"></use>
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
                let displayDate = `${ item.expires.getMonth() + 1 } / ${ item.expires.getDate() } / ${ item.expires.getFullYear() }`;

                const itemDate = item.expires.getTime();
                const currentDate = new Date().getTime();

                listItem = document.createElement('li');
                listItem.className = 'items-list__item';

                listItem.innerHTML = `
                    <div class="item item-reminder">
                        <h3 class="item__category item-reminder__category">reminder</h3>
                        <p class="item-reminder__date ${ itemDate > currentDate ? 'item-reminder__date--in' : 'item-reminder__date--off' }">${ displayDate }</p>

                        <div class="item__icon-box">
                            <svg class="item__icon">
                                <use xlink:href="assets/img/icon-more.svg#icon"></use>
                            </svg>

                            <div class="item__controls item__controls--reminder">
                                <svg class="item__controls-icon item__controls-icon--like">
                                    <use xlink:href="assets/img/icon-heart.svg#icon"></use>
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
        }
    }
})();

const ItemsController = (function() {
    // All currents items
    const items = {
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
        }
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
                });
        document.getElementById(selectors.newTask)
                .addEventListener('click', function() {
                    UI.closeNav();
                    UI.setGroupVisibility(selectors.groupDone, 'visible');
                    UI.setGroupVisibility(selectors.groupDate, 'invisible');
                    UI.setOptionSelected(selectors.optionTask);
                    UI.openModal();
                });
        document.getElementById(selectors.newReminder)
                .addEventListener('click', function() {
                    UI.closeNav();
                    UI.setGroupVisibility(selectors.groupDone, 'invisible');
                    UI.setGroupVisibility(selectors.groupDate, 'visible');
                    UI.setOptionSelected(selectors.optionReminder);
                    UI.openModal();
                });
        // Event listener for closing modal
        document.getElementById(selectors.modalClose)
                .addEventListener('click', UI.closeModal);
        
        // Event listeners for input validation
        document.getElementById(selectors.inputTitle)
                .addEventListener('blur', function() {
                    const state = UI.validateTitle();
                    setFormState('title', state);
                });
        document.getElementById(selectors.inputBody)
                .addEventListener('blur', function() {
                    const state = UI.validateBody();
                    setFormState('body', state);
                });
        
        // Event listener for creating new item
        document.getElementById(selectors.form)
                .addEventListener('submit', function(e) {
                    e.preventDefault();
                    const type = document.getElementById(selectors.selectType).value,
                          title = document.getElementById(selectors.inputTitle).value,
                          body = document.getElementById(selectors.inputBody).value;
                    
                    if (type === 'note' && (!state.formValid.title || !state.formValid.body)) return;
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

                    resetFormState();
                });
    }

    function setFormState(subject, newState) {
        state.formValid[subject] = newState;
    }

    function resetFormState() {
        state.formValid = {
            title: false,
            body: false,
            date: false
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
