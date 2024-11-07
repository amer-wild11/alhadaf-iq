<template>
  <div class="partners-container">
    <div class="header">
      <div class="title">
        <h1>Partners ({{ partnersStore.partners.length }})</h1>
      </div>
      <div class="tools">
        <div class="search">
          <input
            type="text"
            placeholder="Search"
            v-model="searchValue"
            @input="searchPartners"
          />
        </div>
        <div class="add-button" @click="partnersStore.upload = true">
          <Icon name="material-symbols:add-2-rounded" />
        </div>
      </div>
    </div>
    <div class="partners">
      <div
        class="partner"
        v-for="partner in partnersStore.filteredPartners"
        :key="partner.id"
      >
        <div class="image">
          <img :src="partner.logo.url" alt="" />
        </div>
        <div class="info">
          <span class="name">{{ partner.name }}</span>
          <div class="tools">
            <div class="delete tool">
              <DashboardPartnersDeleteAction :partner="partner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const searchValue = ref("");
const partnersStore = useMyPartnersStore();

const searchPartners = () => {
  const lowerCaseSearchTerm = searchValue.value.toLowerCase();

  const filtered = partnersStore.partners.filter((partner) => {
    const nameMatches = partner.name
      .toLowerCase()
      .includes(lowerCaseSearchTerm);

    return nameMatches;
  });

  partnersStore.filteredPartners =
    filtered.length > 0 ? filtered : partnersStore.partners;
};
</script>

<style scoped lang="scss">
.partners-container {
  padding: 20px;
  .header {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 767px) {
      flex-direction: column;
      justify-content: start;
      align-items: start;
    }
    .title {
      color: $dash-text-color;
      font-weight: bold;
      h1 {
        font-size: 30px;
        text-transform: capitalize;
        @media (max-width: 767px) {
          font-size: 25px;
        }
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
  .partners {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    .partner {
      padding: 10px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      box-shadow: 1px 1px 10px 0 lightgray, -1px -1px lightgray;

      .image {
        width: 140px;
      }
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tools {
          .delete {
            width: 30px;
            height: 30px;
            border-radius: 3px;
            border: 1px solid lightgray;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 20px;
            transition: 0.2s;
            &:hover {
              background-color: rgb(175, 16, 16);
              color: white;
            }
          }
        }
        .name {
          font-size: 13px;
          font-weight: 500;
          padding: 5px 10px;
          border-radius: 5px;
          background-color: black;
          color: white;
        }
      }
    }
  }
}
</style>
