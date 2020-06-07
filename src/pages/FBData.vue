<template>
  <main class="mx-auto max-w-6xl">
    <h1 class="text-3xl font-semibold">Firebase Data Render</h1>

     
    <p>{{orgData}}</p>
    <div v-for="(org, i) in storageOrg" :key="i" class="sm:mt-0 sm:w-80 sm:flex-shrink-0 mx-5 my-6">
            <p>hello {{org.name}} : {{org.id}}</p>
        </div>

    

   <LazyHydrate when-idle>
    </LazyHydrate>

  </main>
</template>

<script>
export default {
  data() {
    return {
     orgData: 'hello'
    }
  },
  metaInfo: {
    title: 'Firebase Data'
  },
  methods: {
    // getOrgData() {
    //   console.log("get org data function")
    // },
  },
  created() {
    console.log(this.$store)
  },
  computed: {
    storageOrg() {
      return this.$store.organizers
    }
  },
    components: {
  }
}
</script>
