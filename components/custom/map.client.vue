<template>
  <div
    class="map-container"
    ref="mapContainer"
    @mousemove="turnOffScroll"
    @mouseleave="turnOnScroll"
  ></div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { Map, Marker } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const mapContainer = ref(null);
const globalStore = useMyGlobalStore();

const turnOffScroll = () => {
  globalStore.scroll = false;
};

const turnOnScroll = () => {
  globalStore.scroll = true;
};

onMounted(async () => {
  await nextTick(); // تأكد من أن DOM جاهز

  const map = new Map({
    container: mapContainer.value,
    style:
      "https://api.maptiler.com/maps/basic-v2/style.json?key=WRNIEfjw6BryVMWHT3m8",
    center: [28.626405887219754, 41.00537297135086], // مركز الخريطة
    zoom: 14, // ضبط مستوى الزوم ليكون أقرب إلى الموقع
  });

  // إضافة دبوس على الخريطة لموقع Adnan Kahveci Cd. 4
  new Marker()
    .setLngLat([28.626405887219754, 41.00537297135086]) // (longitude, latitude)
    .addTo(map);

  // إضافة دبوس على الخريطة لموقع بغداد
  new Marker()
    .setLngLat([44.388197, 33.315241]) // (longitude, latitude) لبغداد
    .addTo(map);
});
</script>

<style scoped lang="scss">
.map-container {
  width: 100%;
  height: 100%; /* يمكنك تغيير الارتفاع حسب الحاجة */
}
</style>
