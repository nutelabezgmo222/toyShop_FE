<template>
  <header :class="['bg-white fixed inset-x-0 top-0 drop-shadow-sm', headerHeight]">
    <div class="wrapper flex justify-between items-center h-full">
      <div class="flex">
        <img
          :src="logo"
          class="h-7 w-7"
          alt="logo">
        <span class="logo_title">{{ projectTitle }}</span>
      </div>
      <nav class="flex-grow flex justify-center">
        <router-link
          v-for="link in links"
          :key="link.title"
          :to="link.to"
          class="ml-2 uppercase p-5 navigation_link"
          :class="{ 'relative': link.marker }">
          {{ link.title }}
          <span 
            v-if="link.marker"
            class="absolute w-5 h-5 rounded-full bg-red-500 bottom-0.5 right-0.5 text-sm flex justify-center items-center">
            <span class="text-white font-bold">
              {{ link.marker }}
            </span>
          </span>
        </router-link>
      </nav>
      <div>
        <router-link
          v-if="!isUserLogged"
          to="/login">
          <Button
            type="save"
            button-text="Log in" />
        </router-link>
        <div 
          v-else
          class="flex items-center">
          <p class="mr-3 text-sm text-indigo-500">
            Hello {{ user.name }}
          </p>

          <Button 
            button-text="Log out"
            @click="logOut" />
        </div>
      </div>
    </div>

    <sub-header 
      v-if="!isLoading && subHeaderByRoute"
      :class="['bg-red-300', subHeaderHeight]"
      :navigation-items="subHeaderByRoute" />
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { getCategories } from '@/api/categories';
import Logo from '@/assets/images/logo.png';
import Button from '@/components/Atoms/Button';
import SubHeader from '@/components/Molecules/SubHeader/SubHeader';

import { createCategoryMenu } from '@/utils/createSubmenu';

export default {
    components: {
        Button,
        SubHeader
    },
    props: {
        links: {
            type: Array,
            required: true
        },
        headerHeight: {
            type: String,
            default: 'h-16',
            required: false,
        },
        subHeaderHeight: {
            type: String,
            default: 'h-8',
            required: false,
        },
    },
    data() {
        return {
            logo: Logo,
            projectTitle: 'Arolee',
            isLoading: false,
            categories: [],
        }
    },
    computed: {
        ...mapGetters(['isUserLogged', 'user']),
        subHeaderByRoute() {
            let route = this.$route.fullPath;

            if(route.startsWith('/catalog')) {
                return createCategoryMenu(this.categories);
            }

            return null;
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        ...mapActions(['logOut']),
        loadData() {
            this.isLoading = true;

            return this.getCategories().then(() => {
                this.isLoading = false;
            });
        },
        getCategories() {
            return getCategories().then((responce) => {
                this.categories = responce.list;
            });
        },
    },
}
</script>

<style scoped>
  .router-link-active {
      background-color: #ECECFF;
  }

  .navigation_link:hover {
      background-color: #ECECFF;
  }
</style>