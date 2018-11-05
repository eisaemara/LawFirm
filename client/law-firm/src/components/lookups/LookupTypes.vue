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
            <el-button icon="el-icon-new" type="primary" @click="addNewType" style="float:left">
                   {{$t("lookuptypes.addlookupType")}}  </el-button>
           </div></el-col>
      </el-row>
  </div>
<div  class="table-content">
<el-table height="200"
      :data="lookuptypes" fullwidth highlight-current-row ref="LookupTypeTable"  @current-change="handleCurrentChange">
    <el-table-column :label="$t('lookuptypes.LookupTypeName')" prop="data.name"/>    
    <el-table-column :label="$t('lookuptypes.LookupTypeAddedBy')" prop="data.createdBy" />
     <el-table-column
      :label="$t('AmendedDate')">
      <template slot-scope="scope">
        <span >{{ formatDate(scope.row.data.lastAmendedDate) }}</span>
      </template>
    </el-table-column>
 <el-table-column :label="$t('lookuptypes.LookupTypeUsedScreen')" prop="data.usedScreen" />
 <!-- <el-table-column :label="$t('Notes')" prop="data.notes" /> -->
  
    <el-table-column  label=" ">
      <template slot-scope="scope">
        <el-button
          size="mini"  @click="onUpdateType(scope.row.type,scope.row.data)"  >{{$t("edit")}}    </el-button>
         <el-button slot="reference" size="mini" type="danger" @click="onRemoveType(scope.row.type)" > {{$t("delete")}} </el-button>   
      </template>
    </el-table-column>
  </el-table>    
  </div>


<el-dialog :title="openForCreate ? 'Create' : 'Update'" :visible.sync="dialogFormVisible">
  <el-form  :model="form" label-position='right' label-width=120px  ref="typeForm" :rules="lookupTypeRules">
    <el-form-item :label="$t('lookuptypes.LookupType')" prop="type" >
      <el-input v-model="form.type" autocomplete="off"  :disabled="!openForCreate" ></el-input>
    </el-form-item>
    <el-form-item :label="$t('lookuptypes.LookupTypeName')" prop="name">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item :label="$t('lookuptypes.LookupTypeUsedScreen')" prop="usedScreen">
      <el-input v-model="form.usedScreen" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item :label="$t('Notes')" >
      <el-input v-model="form.notes" autocomplete="off"></el-input>
</el-form-item>
    
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false" >{{ $t('Cancel') }}</el-button>
    <el-button type="primary" @click="onUpdateOrAddLookupType" >{{$t('Save')}}</el-button>
  </span>
</el-dialog>

</el-card>


</template>
<script>
import moment from "moment";

export default {
  created() {
    this.$log.info("Attemp to loading lookups from the store");
    this.initData();
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120",
      openForCreate: false,
      showDeleteConfirm: false,
      form: {
        type: "",
        name: "",
        lastAmendedDate: "",
        createBy: "",
        usedScreen: "",
        notes: ""
      },
      lookupTypeRules: {
        type: [
          {
            required: true,
            message: this.$t("RequiredMessage"),
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: this.$t("RequiredMessage"),
            trigger: "blur"
          }
        ],
        usedScreen: [
          {
            required: true,
            message: this.$t("RequiredMessage"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    lookuptypes: function() {
      return this.$store.getters["Lookups/getLookupTypes"];
    }
  },
  methods: {
    initData() {
      this.$store.dispatch("Lookups/read");
    },
    handleCurrentChange(val) {
        this.$log.info('change current row to') ;
        this.$log.info(val) ;
        this.$store.dispatch('Lookups/setCurrentRow',val);
    },
    formatDate(tm) {
     this.$log.info('attemp to get formatted date from ' + typeof tm );
     try{
       return moment(tm.toDate()).format("YYYY-MM-DD");
     } catch(err){
       return moment(tm).format("YYYY-MM-DD");    
     }
    },
    addNewType() {
      this.openForCreate = true;
      this.form = {
        type: "",
        name: "",
        lastAmendedDate: "",
        createBy: "",
        usedScreen: "",
        notes: ""
      };
      this.dialogFormVisible = true;
    },
    onUpdateType(type, data) {
      this.form = {
        type: type,
        name: data.name,
        lastAmendedDate: data.lastAmendedDate,
        createBy: data.createdBy,
        usedScreen: data.usedScreen,
        notes: data.notes
      };
      this.dialogFormVisible = true;
      this.openForCreate = false;
    },
    onRemoveType(type) {
      this.$confirm(this.$t("DeleteConfirm"), {
        confirmButtonText: this.$t("Confirm"),
        cancelButtonText: this.$t("Cancel")
      })
        .then(_ => {
          this.$store.dispatch("Lookups/delete", type).then(
            res => {
              console.log("Delete Done");
            },
            err => console.log("errorss " + err)
          );
        })
        .catch(_ => {});
    },
    onUpdateOrAddLookupType() {
      this.$refs["typeForm"].validate(valid => {
        if (valid) {
          this.saveChanges();
        }
      });
    },
    saveChanges() {
      let methodName = "Lookups/".concat((this.openForCreate ? "create" : "update"));
      let sendingValue = {
        type: this.form.type,
        data: {
          name: this.form.name,
          usedScreen: this.form.usedScreen,
          notes: this.form.notes
        }
      };
      this.$log.info(
        "Attemp to update or create lookup by calling methods " + methodName
      );
      this.$log.info(sendingValue);

      this.$store.dispatch(methodName, sendingValue).then(
        res => {
          console.log(res);
          this.dialogFormVisible = false;
        },
        error => {
          console.error(
            "Got nothing from server. Prompt user to check internet connection and try again" +
              error
          );
        }
      );
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
