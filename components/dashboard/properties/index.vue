<template>
  <div class="propertiesContainer">
    <div class="header">
      <div class="title">
        <h1>all properties ({{ propertiesStore.properties.length }})</h1>
      </div>
      <div class="tools">
        <div class="search">
          <input
            type="text"
            placeholder="Search"
            @input="searchProperties"
            v-model="searchValue"
          />
        </div>
        <div class="add-button" @click="propertiesStore.upload = true">
          <Icon name="material-symbols:add-2-rounded" />
        </div>
      </div>
    </div>
    <MasonryContainer :cols="7" :gap="10" class="properties">
      <MasonryItem
        class="property"
        v-for="(property, i) in propertiesStore.filteredProperties"
        :key="i"
        :col-span="1"
      >
        <div class="bg">
          <img :src="property.images[0].url" alt="" />
        </div>
        <div class="content">
          <div class="options">
            <div class="delete">
              <DashboardPropertiesDeleteAction :property="property" />
            </div>
          </div>
          <div class="info" @click="setDetails(property)">
            <span class="name">{{ property.name }}</span>
          </div>
        </div>
      </MasonryItem>
    </MasonryContainer>
  </div>
</template>

<script setup>
const propertiesStore = useMyPropertiesStore();
const searchValue = ref("");

const searchProperties = () => {
  const lowerCaseSearchTerm = searchValue.value.toLowerCase();

  const filtered = propertiesStore.properties.filter((property) => {
    const nameMatches = property.name
      .toLowerCase()
      .includes(lowerCaseSearchTerm);

    return nameMatches;
  });

  propertiesStore.filteredProperties =
    filtered.length > 0 ? filtered : propertiesStore.properties;
};

const setDetails = (property) => {
  propertiesStore.details = true;
  const details = {
    name: property.name,
    translated_name: property.translated_name,
    images: property.images,
    createdAt: property.createdAt,
  };
  propertiesStore.propertyDetails = details;
};
</script>

<style scoped lang="scss">
.propertiesContainer {
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
  .properties {
    @media (max-width: 492px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .property {
      cursor: pointer;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      padding: 0 !important;
      .bg {
        pointer-events: none;
        width: calc(100%);
        img {
          border-radius: 10px;
          width: 100%;
        }
      }
      .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: space-between;
        padding: 20px;
        overflow: hidden;
        .info {
          font-size: 20px;
          color: white;
          flex: 1;
          display: flex;
          align-items: end;
          &::first-letter {
            text-transform: uppercase;
          }
        }
        .options {
          display: flex;
          align-items: center;
          justify-content: end;
          .delete {
            width: 30px;
            height: 30px;
            border-radius: 4px;
            background-color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: 0.2s;
            &:hover {
              background-color: rgb(238, 37, 37);
              color: white;
            }
          }
        }
      }
    }
  }
}
</style>
