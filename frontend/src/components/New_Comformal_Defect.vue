<template>
  <div>
    <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Module</span>
        <input type="text" v-model="this.Defect[0]" class="form-control" b-form-input readonly>
    </div>
    <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Target</span>
        <input type="text" v-model="this.Defect[1]" class="form-control" b-form-input readonly>
    </div>
    <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Probe</span>
        <input type="text" v-model="this.Defect[2]" class="form-control" b-form-input readonly>
    </div>
    <div class="input-group-prepend" v-if="this.Defect[7]">
        <span class="input-group-text" id="inputGroup-sizing-default">DefectName</span>
        <input type="text" v-model="this.Defect[3]" class="form-control" b-form-input readonly>
    </div>
    <div class="input-group-prepend" v-if="this.Defect[7]">
        <span class="input-group-text" id="inputGroup-sizing-default">Position</span>
        <input type="text" v-model="this.Defect[4]" class="form-control" b-form-input readonly>
    </div>
    <div class="input-group-prepend" v-if="this.Defect[7]">
        <span class="input-group-text" id="inputGroup-sizing-default">Size</span>
        <input type="text" v-model="this.Defect[5]" class="form-control" b-form-input readonly>
    </div>
    <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Review</span>
        <input type="text" v-model="this.Defect[6]" class="form-control" b-form-input readonly>
    </div>
  </div>
</template>

<script>
export default {
 props:{
   Defect:[]
 }
};
</script>