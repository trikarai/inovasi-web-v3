<template>
  <v-container extend grid-list-xs>
    <v-row>
      <!-- {{authData.data.id}} -->
      <v-col md="8" xs="12">
        <v-btn color="primary" @click="openAdd">
          <v-icon left>add</v-icon>Add Mission
        </v-btn>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col md="4" xs="12">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          clearable
        ></v-text-field>
      </v-col>
    </v-row>-->
    <v-row>
      <v-col>
        <!-- <pre>  {{dataList.list}}</pre> -->
        <v-data-table
          :search="search"
          :loading="tableLoad"
          :headers="tableHeaders"
          :items="dataList.list"
          sort-by="position"
          class="elevation-1"
        >
          <template v-slot:item.name="{item}">
            <v-btn
              class="elevation-0 mr-2"
              fab
              x-small
              color="primary"
              @click="openDetail(item.id)"
            >
              <v-icon>zoom_in</v-icon>
            </v-btn>
            {{item.name}}
          </template>
          <template v-slot:item.published="{item}">
            <v-icon large v-if="item.published" color="green darken-1">check</v-icon>
            <v-icon large v-else color="red darken-1">remove</v-icon>
          </template>
          <template v-slot:item.parent="{item}">
            <v-icon v-if="item.previousMission === null">stars</v-icon>
            <template v-else>{{item.previousMission.name}}</template>
          </template>
          <template v-slot:item.action="{item}">
            <v-row>
              <v-row>
                <v-col>
                  <v-btn
                    v-if="!item.published"
                    class="mr-2"
                    small
                    color="primary"
                    @click="leftAct(item, 'publish')"
                  >
                    <v-icon left>check</v-icon>Publish
                  </v-btn>
                </v-col>
              </v-row>
              <v-col>
                <v-row>
                  <v-btn
                    small
                    class="mr-2"
                    color="primary"
                    @click="openAddBranch(item.id,item.name)"
                  >
                    <v-icon small left>account_tree</v-icon>Add Branch
                  </v-btn>
                </v-row>
                <v-row>
                  <v-btn class="mt-2" small color="primary" @click="openLearningMaterial(item.id)">
                    <v-icon small>books</v-icon>Learning Material
                  </v-btn>
                </v-row>
                <!-- <v-row>
                  <v-btn
                    v-if="!item.published"
                    class="mt-2"
                    small
                    color="primary"
                    @click="openEdit(item.id)"
                  >
                    <v-icon small>edit</v-icon>Edit
                  </v-btn>
                </v-row> -->
                <v-row>
                  <v-btn class="mt-2" small color="primary" @click="openEdit(item.id)">
                    <v-icon small left>edit</v-icon>Edit
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
      <!-- <v-col md="12">{{dataList}}</v-col> -->
    </v-row>

    <add-form
      v-if="dialogForm"
      :rootid="rootId"
      :rootname="rootName"
      :isbranch="branch"
      :edit="edit"
      @close="dialogForm = false"
      @refresh="refresh"
    />

    <v-dialog v-model="dialogDelete" width="300" :persistent="true">
      <v-card :loading="tableLoad">
        <v-card-title>
          <p class="text-capitalize">{{leftAction}}</p>
        </v-card-title>
        <v-card-text>{{leftName}}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text color="red" @click="deleteAccount(leftId)">Yes</v-btn>
          <v-btn text color="grey" @click="dialogDelete = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogDetail"
      scrollable
      :overlay="false"
      max-width="300px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <p class="text-capitalize">Mission Detail</p>
        </v-card-title>
        <v-card-text v-if="loader">
          <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
        </v-card-text>
        <v-card-text v-if="dataSingle.previousMission != null">
          <b>Mission Parent</b>
          <br />
          {{dataSingle.previousMission.name}}
        </v-card-text>
        <v-card-text>
          <b>Name</b>
          <br />
          {{dataSingle.name}}
        </v-card-text>
        <v-card-text>
          <b>Description</b>
          <br />
          {{dataSingle.description}}
        </v-card-text>
        <v-card-text>
          <b>Worksheet Name</b>
          <br />
          {{dataSingle.worksheetForm.name}}
        </v-card-text>
        <!-- <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn icon color="red" @click="dialogDetail = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>-->
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

import AddForm from "./addmission";

export default {
  data() {
    return {
      authData: "",
      search: "",
      dataList: { total: 0, list: [] },
      dataSingle: { name: "", description: "", worksheetForm: { name: "" } },
      tableLoad: false,
      loader: false,
      tableHeaders: [
        { text: "Name", value: "name", sortable: false },
        {
          text: "Postition",
          value: "position",
          sortable: false,
          align: "right"
        },
        {
          text: "Published",
          value: "published",
          sortable: false,
          align: "right"
        },
        {
          text: "Parent Mission",
          value: "parent",
          sortable: false,
          align: "right"
        },
        { text: "", value: "sub", sortable: false, align: "right" },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      dialogForm: false,
      dialogDelete: false,
      dialogDetail: false,
      edit: false,
      leftId: "",
      leftName: "",
      leftAction: "",
      rootId: "",
      rootName: "",
      branch: false,
      missionId: ""
    };
  },
  components: {
    AddForm
  },
  created: function() {
    this.authData = JSON.parse(auth.getAuthData());
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-admin/programs/" +
            this.$route.params.programId +
            "/missions",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList = res.data.data;
          } else {
            this.dataList = { total: 0, list: [] };
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getDataSingle(id) {
      this.dataSingle = "";
      this.loader = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-admin/programs/" +
            this.$route.params.programId +
            "/missions/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataSingle = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.loader = false;
        });
    },
    openAdd() {
      this.rootId = "";
      this.branch = false;
      this.edit = false;
      this.dialogForm = true;
    },
    openEdit(missionId) {
      this.rootId = missionId;
      this.branch = false;
      this.edit = true;
      this.dialogForm = true;
    },
    openAddBranch(id, name) {
      this.rootId = id;
      this.rootName = name;
      this.branch = true;
      this.edit = false;
      this.dialogForm = true;
    },
    openLearningMaterial(id) {
      this.$router.push({
        path:
          "/personnel/program/" +
          this.$route.params.programId +
          "/mission/" +
          id +
          "/learning-material"
      });
    },
    openDetail(id) {
      this.dialogDetail = true;
      this.getDataSingle(id);
    },
    leftAct(item, action) {
      this.dialogDelete = true;
      this.leftId = item.id;
      this.leftName = item.name;
      this.leftAction = action;
    },
    deleteAccount(id) {
      this.tableLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/personnel/as-admin/programs/" +
            this.$route.params.programId +
            "/missions/" +
            id +
            "/publish",
          {},
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.refresh();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },

    refresh() {
      this.dialogForm = false;
      this.dialogDelete = false;
      this.getDataList();
    }
  }
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  /* transform: translateX(10px); */
  opacity: 0;
}
</style>