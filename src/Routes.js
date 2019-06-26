import Vue from "vue";
import Router from "vue-router";
import { store } from '@/store';

import Home from './components/main/home';
import Login from './components/main/Login';
import Register from './components/main/Register';
import ResetPassword from './components/main/ResetPassword';
import Profile from './components/main/profile/';
import Members from './components/main/members/';
import Settings from './components/main/settings/';
import Films from './components/main/films'
import PageNotFound from './components/PageNotFound';

Vue.use(Router);

const routes = [

    // Main Routes
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home — First Cinema'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Login — First Cinema'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: 'Register — First Cinema'
        }
    },
    {
        path: '/resetPassword',
        name: 'ResetPassword',
        component: ResetPassword,
        meta: {
            title: 'Forgot Your Password? — First Cinema'
        }
    },
    {
        path: '/members/',
        redirect: '/members/1'
    },
    {
        path: '/members/:pageNumber',
        name: 'Members',
        component: Members,
        meta: {
            title: 'Members — First Cinema'
        }
    },
    {
        path: '/profile/:user',
        name: 'Profile',
        component: Profile,
        meta: {
            title: '%user% — First Cinema'
        }
    },
    {
        path: '/account',
        name: 'Settings',
        component: Settings,
        beforeEnter: checkAuth,
        meta: {
            title: 'Account Settings — First Cinema'
        }
    },
    {
        path: '/films',
        name: 'Films',
        component: Films,
        meta: {
            title: 'Films — First Cinema'
        }
    },
    {
        path: '*',
        name: '404',
        component: PageNotFound,
        meta: {
            title: '404 — First Cinema'
        }
    }
];

const Routers = new Router({
    mode: 'history',
    routes: routes
});

// This callback runs before every route change, including on page load.
Routers.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) {
        let content = to.params,
            str = nearestWithTitle.meta.title,
            replaced = "";
        let parts = str.split(/(\%\w+?\%)/g).map(function(v) {
            replaced = v.replace(/\%/g, "");
            return content[replaced] || replaced;
        });
        document.title = parts.join("");
    }


    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
            const tag = document.createElement('meta');

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key]);
            });

            // We use this to track which meta tags we create, so we don't interfere with other ones.
            tag.setAttribute('data-vue-router-controlled', '');

            return tag;
        })
        // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));

    next();
});

function checkAuth(to, from, next) {
    let authenticated = store.state.userModule.user;
    if (authenticated) {
        next();
    } else {
        next('/login');
    }
};

export default Routers