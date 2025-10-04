// import { BasicLayout } from '~/component/Layout/BasicLayout';

import Home from '~/pages/Home';
import Note from '~/pages/Note';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/note', component: Note },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
