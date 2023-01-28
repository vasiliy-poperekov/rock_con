import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/Content'
import GroupProfile from '@/profiles_views/GroupProfile'
import PlaceProfile from '@/profiles_views/PlaceProfile'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Content
        },
        {
            path: '/g/:id/:token',
            component: Content,
            props: true
        },
        {
            path: '/p/:id/:token',
            component: Content,
            props: true
        },
        {
            path: '/group/:id',
            component: GroupProfile,
            props: true
        },
        {
            path: '/place_group/:id',
            component: GroupProfile,
            props: true
        },
        {
            path: '/group/:id/:token',
            component: GroupProfile,
            props: true
        },
        {
            path: '/place/:id',
            component: PlaceProfile,
            props: true
        },
        {
            path: '/group_place/:id',
            component: PlaceProfile,
            props: true
        },
        {
            path: '/place/:id/:token',
            component: PlaceProfile,
            props: true
        },
    ]
})