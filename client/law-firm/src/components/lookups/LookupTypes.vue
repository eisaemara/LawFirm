<template>
<el-card class="low-padding" shadow="never" fullwidth>
  <div slot="header" class="clearfix" >
      <el-row :gutter="10" type="flex">
          <el-col :xs="8" :sm="6" :md="3" :lg="3" :xl="1" class="center"><div class="grid-content">
    <span>
          {{$t("lookuptypes.lookupTypeTitle")}} 
    </span>       
          </div></el-col>
          <el-col :xs="4" :sm="6" :md="16" :lg="16" :xl="11"><div class="grid-content">
           <el-input :placeholder="$t('searchPlaceHolder')"  class="input-with-select">
           <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
          </div></el-col>
          <el-col :xs="4" :sm="6" :md="5" :lg="5" :xl="11"><div class="grid-content">
              <el-button icon="el-icon-new" type="primary" >
                   {{$t("lookuptypes.addlookupType")}}  </el-button>
           </div></el-col>
      </el-row>
  </div>
<div  class="table-content">
<el-table height="200"
      :data="lookuptypes" fullwidth>

    <el-table-column :label="$t('lookuptypes.LookupTypeName')" prop="name"/>    
    <el-table-column :label="$t('lookuptypes.LookupTypeAddedBy')" prop="createdBy" />
     <el-table-column
      :label="$t('AmendedDate')">
      <template slot-scope="scope">
        <span >{{ formatDate(scope.row.lastAmendedDate) }}</span>
      </template>
    </el-table-column>
 <el-table-column :label="$t('Notes')" prop="Notes" />
    <el-table-column  label="op">
      <template slot-scope="scope">
        <el-button
          size="mini"  @click="dialogFormVisible = true"  >{{$t("edit")}}    </el-button>
   <el-button
          size="mini"
          type="danger"> {{$t("delete")}} </el-button>     
          <!-- @click="handleEdit(scope.$index, scope.row)" -->
          <!-- @click="handleDelete(scope.$index, scope.row)" -->
      </template>
    </el-table-column>
  </el-table>    
  </div>


<el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
  <el-form >
    <el-form-item label="Promotion name" :label-width="formLabelWidth">
      <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
    </el-form-item>
    <el-form-item label="Zones" :label-width="formLabelWidth">
      <!-- <el-select v-model="form.region" placeholder="Please select a zone"> -->
        <!-- <el-option label="Zone No.1" value="shanghai"></el-option> -->
        <!-- <el-option label="Zone No.2" value="beijing"></el-option> -->
      <!-- </el-select> -->
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogFormVisible = false">Cancel</el-button> -->
    <!-- <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button> -->
  </span>
</el-dialog>

</el-card>


</template>
<script>
import moment from "moment";

export default {
  created() {
    this.initData();
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: 120
    };
  },
  computed: {
    lookuptypes: function() {
      return this.$store.getters["Lookups/getLookupTypes"];
    }
  },
  methods: {
    initData() {
      this.$store.dispatch("Lookups/initLookupsList");
    },
    formatDate(tm) {
      console.log(tm);
      if (tm) return moment(tm.toDate()).format("YYYY-MM-DD");
      else return "";
    }
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.low-padding .el-card__header {
  padding-top: 5px;
  padding-bottom: 5px;
}
.low-padding .el-card__body {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>



