<template>
<el-card class="low-padding" shadow="never" fullwidth>
  <div slot="header" class="clearfix" >
      <span    style="padding-top: 10px;display: inline-block;">
            {{$t("lookuptypes.LookupTypeDetailsTitle").concat(" ( ").concat(getPageTitle).concat(" ) ") }} 
      </span> 
  <el-button  style="float:left" icon="el-icon-new" type="primary"
   @click="onAddItem" :disabled="!getLookupDetails" >
       {{$t("lookuptypes.LookupTypeDetailsAddNew")}}  </el-button>

  </div>
<div  class="table-content">
<el-table height="400" :data="getLookupDetails" fullwidth :empty-text="$t('NoDataToDisplay')">
    <el-table-column :label="$t('lookuptypes.LookupTypeDetailsItemId')" prop="itemId" />    
    <el-table-column :label="$t('lookuptypes.LookupTypeName')" prop="data.name"/>    
    <el-table-column :label="$t('lookuptypes.LookupTypeAddedBy')" prop="data.createdBy"  />
     <el-table-column 
      :label="$t('AmendedDate')">
      <template slot-scope="scope">
        <span >{{ formatDate(scope.row.data.lastAmendedDate) }}</span>
      </template>
    </el-table-column>
    <el-table-column  label=" " style="float:left">
      <template slot-scope="scope">
        <div style="float:left;">
<el-button
          size="mini"  @click="onUpdateItem(scope.row.itemId,scope.row.data)"  >{{$t("edit")}}    </el-button>
         <el-button slot="reference" size="mini" type="danger" @click="onRemoveItem(scope.row.itemId)" > {{$t("delete")}} </el-button>   
        </div>
        
      </template>
    </el-table-column>
  </el-table>    
  </div>


<el-dialog :title="openForCreate ? 'Create' : 'Update'" :visible.sync="dialogFormVisible">
  <el-form  :model="form" label-position='right' label-width=120px  ref="itemForm" :rules="lookupTypeRules">
      <el-form-item :label="$t('lookuptypes.LookupTypeDetailsItemId')" prop="itemId">
      <el-input v-model="form.itemId" autocomplete="off" :disabled="!openForCreate"></el-input>
    </el-form-item>
    <el-form-item :label="$t('lookuptypes.LookupTypeName')" prop="name">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item :label="$t('Notes')" >
      <el-input v-model="form.notes" autocomplete="off"></el-input>
</el-form-item>
    
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false" >{{ $t('Cancel') }}</el-button>
    <el-button type="primary" @click="onSaveItem" >{{$t('Save')}}</el-button>
  </span>
</el-dialog>

</el-card>


</template>
<script>
import moment from "moment";

export default {
  data() {
    return {
      dialogFormVisible: false,
      openForCreate: false,
      showDeleteConfirm: false,
      form: {
        itemId: "",
        name: "",
        lastAmendedDate: "",
        createBy: "",
        notes: ""
      },
      lookupTypeRules: {
        itemId: [
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
        ]
      }
    };
  },
  computed: {
    getLookupDetails: function() {
      return this.$store.getters["Lookups/getItems"];
    },
    getPageTitle: function() {
      let currentRow = this.$store.getters["Lookups/getSelectLookupType"];
      if (currentRow) return currentRow.data.name;
      else return "";
    }
  },
  methods: {
    formatDate(tm) {
      this.$log.info("attemp to get formatted date from " + typeof tm);
      try {
        return moment(tm.toDate()).format("YYYY-MM-DD");
      } catch (err) {
        return moment(tm).format("YYYY-MM-DD");
      }
    },
    onAddItem() {
      this.openForCreate = true;
      this.initFormItems(undefined, undefined);
      this.dialogFormVisible = true;
    },
    onUpdateItem(itemId, data) {
      this.initFormItems(itemId, data);
      this.dialogFormVisible = true;
      this.openForCreate = false;
    },
    initFormItems(itemId, data) {
      this.form = {
        itemId: itemId ? itemId : "",
        name: data ? data.name : "",
        lastAmendedDate: data ? data.lastAmendedDate : "",
        createBy: data ? data.createdBy : "",
        notes: data ? data.notes : ""
      };
    },
    onRemoveItem(itemId) {
      this.$confirm(this.$t("DeleteConfirm"), {
        confirmButtonText: this.$t("Confirm"),
        cancelButtonText: this.$t("Cancel")
      })
        .then(_ => {
          this.$store.dispatch("Lookups/deleteItem", itemId).then(
            res => {
              this.showDeleteSuccessMsg();
            },
            err => console.log("errorss " + err)
          );
        })
        .catch(_ => {});
    },
    onSaveItem() {
      this.$refs["itemForm"].validate(valid => {
        if (valid) {
          this.saveChanges();
        }
      });
    },
    saveChanges() {
      let methodName = "Lookups/".concat(
        this.openForCreate ? "createItem" : "updateItem"
      );
      let sendingValue = {
        itemId: this.form.itemId,
        data: {
          name: this.form.name,
          notes: this.form.notes
        }
      };
      this.$log.info(
        "Attemp to update or create lookup by calling methods " + methodName
      );
      this.$log.info(sendingValue);

      this.$store.dispatch(methodName, sendingValue).then(
        res => {
          this.showSaveSuccessMsg();
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
