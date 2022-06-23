<template>
  <div class="hello">
      <h1>Toys</h1>
      <div class="toys-wrapper">
        <div 
          v-for="toy in toys"
          :key="toy.id"
          class="toy">
          <h3>{{ toy.title }}</h3>
          <p>description: {{ toy.description }}</p>
        </div>
      </div>
      <div>
        <label>
          <p>Title</p>
          <input 
            v-model="newToyTitle"
            type="text">
        </label>
        <button @click="createNewToy">Create new toy</button>
      </div>
  </div>
</template>

<script>
import { getToys, createToy } from '/api/Toys/toysApi';

export default {
    name: 'HelloWorld',
    data() {  
        return {
            toys: [],
            newToyTitle: ''
        };
    },
    mounted() {
        this.getToys();
    },
    methods: {
        getToys() {
            return getToys()
                .then(({list}) => {
                    this.toys = list;
                });
        },
        createNewToy() {
            if(!this.newToyTitle.trim()) return;

            return createToy({ title: this.newToyTitle })
                .then(this.getToys);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.toys-wrapper {
    display: flex;
    flex-wrap: wrap;
}
.toy {
    padding: 10px;
    border: 1px solid #ccc;
    width: 100px;
    margin-right: 10px;
}
</style>
