import HomePage from '@/components/Pages/HomePage';
import CatalogPage from '@/components/Pages/CatalogPage';
import BasketPage from '@/components/Pages/BasketPage';

import AdminPage from '@/components/Pages/Admin/AdminPage';
import AdminCreate from '@/components/Pages/Admin/AdminCreate';
import AdminDelete from '@/components/Pages/Admin/AdminDelete';

import LogInPage from '@/components/Pages/LogInPage';

const routes = [
    { path: '/', component: HomePage },
    { 
        path: '/basket',
        component: BasketPage
    },
    { path: '/catalog', component: CatalogPage },
    { 
        path: '/admin',
        component: AdminPage,
        children: [
           {
              path: 'create',
              component: AdminCreate,
              name: 'AdminCreate'
           },
           {
              path: 'delete',
              component: AdminDelete,
              name: 'AdminDelete'
          }
        ]
    },
]

export default routes;