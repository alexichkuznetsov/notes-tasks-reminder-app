// Controller that handles all
// operations that are connected
// with user interface
const UIController = (function() {
    const selectors = {
        // Buttons
        navOpen: 'nav-open',
        navClose: 'nav-close',

        // UI
        navList: 'nav-list'
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
        }
    }
})();

// Main app controller
const App = (function(UI) {
    
    function loadEventListeners() {
        const selectors = UI.getSelectors();

        // Event listener for opening sidenav
        document.getElementById(selectors.navOpen)
                .addEventListener('click', UI.openNav);
        // Event listener for closing sidenav
        document.getElementById(selectors.navClose)
                .addEventListener('click', UI.closeNav);
    }

    return {
        init: function() {
            console.log('Initialized..');

            loadEventListeners();
        }
    }
})(UIController);


// Init our app
App.init();
