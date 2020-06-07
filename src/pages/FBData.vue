<template>

  <main class="mx-auto max-w-6xl">
    <h1 class="text-3xl font-semibold">Firebase Data Render</h1>
    <div v-for="(org, i) in storageOrg" :key="i" class="sm:mt-0 sm:w-80 sm:flex-shrink-0 mx-5 my-6">
      <p>hello {{org.name}} : {{org.id}}</p>
    </div>
    <div v-for="(v, j) in allVendors" :key="j" class="sm:mt-0 sm:w-80 sm:flex-shrink-0 mx-5 my-6">
      <p>hello {{v.name}} : {{v.id}}</p>
    </div>
    <div v-for="(d, k) in allDrivers" :key="k" class="sm:mt-0 sm:w-80 sm:flex-shrink-0 mx-5 my-6">
      <p>hello {{d.name}} : {{d.id}}</p>
    </div>
    <div v-for="(c, l) in allClients" :key="l" class="sm:mt-0 sm:w-80 sm:flex-shrink-0 mx-5 my-6">
      <p>hello {{c.name}} : {{c.id}}</p>
    </div>

    <div class="container">
      <div class="d-flex flex-row bd-highlight my-3 justify-content-center" v-for="row in uniqueVendors">
        <div class="p-1 bd-highlight">{{row}}</div>
        <div class="p-2 bd-highlight w-50">
          <div class="progress ml-3">
            <div
              class="progress-bar bg-success"
              v-on:click="filterBothStatusAndVendor(row,'delivered')"
              role="progressbar"
              v-bind:style="{width: calculatePercentageSuccess(row) + '%'}"
              aria-valuenow="70"
              aria-valuemin="0"
              aria-valuemax="100"
            >{{calculatePercentageSuccess(row)}}</div>
            <div
              class="progress-bar bg-danger"
              v-on:click="filterBothStatusAndVendor(row,'undelivered')"
              role="progressbar"
              v-bind:style="{width: calculatePercentageFailure(row) + '%'}"
              aria-valuenow="20"
              aria-valuemin="0"
              aria-valuemax="100"
            >{{calculatePercentageFailure(row)}}</div>
          </div>
        </div>
        <div class="p-2 bd-highlight">Flex item 3</div>
      </div>

      <div class="row d-flex mb-3 align-items-center" v-for="data in products">
    <div class="col-sm-4">
    <img class="img-fluid d-block" :src="item.image" :alt="name">
    </div>
    <div v-if="data.name=='Jackson'">Now you see me</div>
    <div class="col" v-if="data.status=='undelivered'" >
    <h3 class="text-info">{{data.name}}</h3>
    <p class="h5 mb-0">{{data.vendor}}</p>
    <div class="h5 float-left">{{data.status}}</div>
    </div>
      </div>

      <div class="container my-5">
        <button class="btn btn-info" v-on:click="countVendor()">delivered: {{vendor}}</button>
            <div class="form-inline mr-auto my-3">
                <label class="font-weight-bold mr-2" for="formStatus">Status</label>
                <input type="text" id="formStatus" class="form-control w-25" v-model="filterStatus">
        </div>
        <div>
          <strong>{{filterVendor}}</strong>
          <table class="table" id="firstTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Postal Code</th>
                <th>Driver</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in products"
                v-if="row.status==filterStatus && row.vendor==filterVendor"
              >
                <td>{{row.name}}</td>
                <td>{{row.contact}}</td>
                <td>{{row.address}}</td>
                <td>{{row.postalCode}}</td>
                <td>{{row.driver}}</td>
                <td class="text-danger" v-if="row.status=='undelivered'">{{row.status}}</td>
                <td class="text-success" v-else="row.status=='delivered'">{{row.status}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <LazyHydrate when-idle></LazyHydrate>
  </main>
</template>

<script>
export default {
  data() {
    return {
      orgData: "hello",
      filterStatus: "delivered",
      filterVendor: "Vendor 1",
      products: null,
      vendor: null,
      uniqueVendors: [],
      vendorsCountDelivered: [],
      vendorsCountUndelivered: []
    };
  },
  metaInfo: {
    title: "Firebase Data"
  },
  methods: {
    // getOrgData() {
    //   console.log("get org data function")
    // },
    countStatus: function () {
            var count = 0;
            console.log(this.products[1].name);
            for (index = 0; index < this.products.length; index++) {
                if (this.products[index].status == 'delivered') {
                    count++
                    console.log(this.products[index].status);
                }
            }
            this.vendor = count
            console.log(count)
            return count;
        },
        uniqueVendor: function () {
            console.log(this.products[1].vendor);
            for (index = 0; index < this.products.length; index++) {
                if (!this.uniqueVendors.includes(this.products[index].vendor)) {
                    this.uniqueVendors.push(this.products[index].vendor)
                }
            }
            console.log(this.uniqueVendors)
        },
        countVendor: function () {
            console.log(this.products[1].vendor);
            for (i = 0; i < this.uniqueVendors.length; i++) {
                totalCount = 0
                deliveredCount = 0
                undeliveredCount = 0
                for (index = 0; index < this.products.length; index++) {
                    if (this.products[index].vendor == this.uniqueVendors[i]) {
                        if (this.products[index].status == 'delivered') {
                            deliveredCount++
                        }
                        if (this.products[index].status == 'undelivered') {
                            undeliveredCount++
                        }
                    }
                }
                this.vendorsCountDelivered[i] = deliveredCount;
                this.vendorsCountUndelivered[i] = undeliveredCount;
            }
            console.log(this.vendorsCountDelivered)
            console.log(this.vendorsCountUndelivered)
        },
        getValueOfCountDelivered: function (index) {
            position = this.uniqueVendors.indexOf(index)
            return this.vendorsCountDelivered[position]
        },
        getValueOfCountUnDelivered: function (index) {
            position = this.uniqueVendors.indexOf(index)
            return this.vendorsCountUndelivered[position]
        },
        calculatePercentageSuccess(index){
            total=this.getValueOfCountDelivered(index)+this.getValueOfCountUnDelivered(index)
        return (this.getValueOfCountDelivered(index)/total*100).toFixed(1);
        },
        calculatePercentageFailure(index){
            total=this.getValueOfCountDelivered(index)+this.getValueOfCountUnDelivered(index)
        return (this.getValueOfCountUnDelivered(index)/total*100).toFixed(1);
        },
        filterBothStatusAndVendor(row,status){
            this.filterStatus=status;
            this.filterVendor=row;
        }
  },
  mounted: function () {
     fetch("../src/assets/json/myList.json")
            .then(response => response.json())
            .then(data => {
                this.products = data;
                this.uniqueVendor();
                this.countVendor();
            })
  },
  computed: {
    storageOrg() {
      return this.$store.organizers;
    },
    allVendors() {
      return this.$store.vendor;
    },
    allClients() {
      return this.$store.clients;
    },
    allDrivers() {
      return this.$store.drivers;
    }
  },
  components: {}
};
</script>
