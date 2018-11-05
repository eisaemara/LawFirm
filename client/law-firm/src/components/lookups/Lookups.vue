<template>
  <div>
     <LookupTypes />

     <lookup-details style="margin-top:10px" />
  </div>
</template>

<script>
import LookupTypes from "./LookupTypes.vue";
import LookupDetails from './LookupsDetails.vue';
export default {
  components: {
    LookupTypes,
    LookupDetails
  },
  data() {
    return {

    };
  }
};
</script>


<style>
</style>
