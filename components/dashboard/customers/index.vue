<template>
  <div class="customers-container">
    <div class="header">
      <div class="title">
        <h1>Customers</h1>
      </div>
      <div class="tools">
        <div class="search">
          <input
            type="text"
            placeholder="Search by email"
            v-model="searchQuery"
            @input="filterCustomers"
          />
        </div>
      </div>
    </div>
    <div class="customers">
      <DashboardCustomersTableData :customers="filterdCustomers" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const customersStore = useMyCustomersStore();
const filterdCustomers = ref([]);
const searchQuery = ref("");

const filterCustomers = () => {
  const query = searchQuery.value.toLowerCase();
  filterdCustomers.value = customersStore.customers.filter((customer) =>
    customer.email.toLowerCase().includes(query)
  );
};

onMounted(() => {
  filterdCustomers.value = customersStore.customers;
});
</script>

<style scoped lang="scss">
.customers-container {
  padding: 20px;
  .header {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      color: $dash-text-color;
      font-weight: bold;
      h1 {
        font-size: 30px;
        text-transform: capitalize;
      }
    }
    .tools {
      display: flex;
      align-items: center;
      gap: 10px;
      .add-button {
        padding: 5px;
        border-radius: 5px;
        background-color: $dash-main-color;
        color: rgb(255, 255, 255);
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
}
</style>
