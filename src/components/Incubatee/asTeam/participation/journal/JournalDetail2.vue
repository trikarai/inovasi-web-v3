<template>
  <v-container extend grid-list-xs>
    <mission-comp :tableLoad.sync="tableLoad" :dataList.sync="dataList" />
    <learning-comp :learningLoad.sync="learningLoad" :learningList.sync="learningList" />

    <v-row>
      <v-col cols="12" md="12" lg="12" xs="12">
        <v-card class="pa-5">
          <v-tabs v-model="tab" class="elevation-0" background-color="primary" dark>
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-1">New Journal</v-tab>
            <v-tab href="#tab-2">Selected Journal</v-tab>
            <v-tab href="#tab-3">Other Journals in this Mission</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <!-- new journal start-->
            <v-tab-item value="tab-1">
              <template v-if="!tableLoad">
                <new-journal
                  :dataListTemp.sync="dataListTemp"
                  :tableLoad2="tableLoad"
                  :loader.sync="loader"
                  :branchUri.sync="branchUri"
                />
              </template>
              <template v-else>
                <v-col>
                  <v-skeleton-loader type="card"></v-skeleton-loader>
                </v-col>
              </template>
            </v-tab-item>
            <!-- new journal end-->

            <v-tab-item value="tab-2">
              <v-row class="mt-5">
                <template v-show="!journalLoad">
                  <v-col md="2" v-if="!updateJ">
                    <v-btn
                      small
                      v-if="!editWS"
                      color="primary"
                      @click="editWorksheet"
                    >Edit worksheet</v-btn>
                    <v-btn color="warning" small @click="editWS = !editWS" v-else>
                      <v-icon small left>cancel</v-icon>Cancel Edit
                    </v-btn>
                  </v-col>
                  <v-col md="3" v-if="updateJ">
                    <v-btn
                      small
                      class="ma-2"
                      color="primary"
                      :text="mode"
                      @click="createNewWorksheet"
                    >
                      <v-icon left v-if="!mode" small>star</v-icon>Create New Worksheet
                    </v-btn>
                  </v-col>
                  <v-col md="4" v-if="updateJ">
                    <v-btn
                      small
                      class="ma-2"
                      color="primary"
                      :text="!mode"
                      @click="createReloadWorksheet"
                    >
                      <v-icon left v-if="mode" small>star</v-icon>Replace With Existing Worksheet
                    </v-btn>
                  </v-col>

                  <v-col md="3">
                    <template v-if="!editWS">
                      <v-btn
                        small
                        v-if="!updateJ"
                        color="primary"
                        @click="updateJournal"
                      >Change Journal</v-btn>
                      <v-btn class="ma-2" color="warning" small @click="updateJ = !updateJ" v-else>
                        <v-icon small left>cancel</v-icon>Cancel Change
                      </v-btn>
                    </template>
                  </v-col>
                  <v-col style="text-align:end;" md="7" v-if="!updateJ">
                    <v-btn small color="success" @click="openComment()">
                      <v-icon left small>forum</v-icon>Comment
                    </v-btn>
                  </v-col>
                </template>
              </v-row>
              <!--update jurnal start-->
              <template v-if="updateJ">
                <v-row>
                  <v-col md="6" v-if="selectWorksheet">
                    <v-radio-group v-model="exworksheetId">
                      <v-radio
                        v-for="data in worksheetList.list"
                        :key="data.id"
                        :label="data.name"
                        :value="data.id"
                        @change="getWorksheetData"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <!-- <v-col md="6" v-if="selectWorksheet">
                    <v-select
                      class="ml-0"
                      v-model="exworksheetId"
                      :items="worksheetList.list"
                      item-value="id"
                      item-text="name"
                      label="Existing Worksheet"
                      :loading="tableLoad"
                      no-data-text="No worksheet available"
                      @change="getWorksheetData"
                      solo
                    ></v-select>
                  </v-col>-->
                </v-row>
                <v-row v-if="is_newWorksheet">
                  <v-col>
                    <v-text-field class="ml-3" label="Worksheet Name" v-model="worksheetName" solo></v-text-field>
                  </v-col>
                  <v-col md="12">
                    <render-form
                      :modeReload="reloadFalse"
                      v-if="!tableLoad"
                      :formTemplate="dataListTemp.worksheetForm"
                      @submit-form="submitForm"
                    />
                  </v-col>
                </v-row>
                <v-row v-if="!is_newWorksheet">
                  <v-col v-if="is_reloadWorksheet">
                    <!-- <v-text-field class="ml-3" label="Worksheet Name" v-model="worksheetName" solo></v-text-field> -->
                  </v-col>
                  <v-col md="12" v-if="is_reloadWorksheet">
                    <render-form
                      :modeReload="reloadTrue"
                      v-if="!tableLoad"
                      :formTemplate="dataList.worksheetForm"
                      @submit-form="submitForm"
                    />
                  </v-col>
                  <v-col v-else>
                    <v-skeleton-loader type="card" :boilerplate="true"></v-skeleton-loader>
                  </v-col>
                </v-row>
              </template>
              <!--update journal end -->
              <v-row v-if="!editWS">
                <v-col>
                  <template v-if="!updateJ">
                    <v-card class="pa-5" v-if="!journalLoad">
                      <v-card-title primary-title>
                        <b>{{dataSingle.name}}</b>
                      </v-card-title>
                      <v-card-text class="subtitle-1">
                        <b>Worksheet Form</b>
                        <br />
                        {{dataListTemp.worksheetForm.name}}
                        <!-- | Canvas : {{desc.renderAs}} -->
                      </v-card-text>
                      <v-card-text>
                        <render-record :fields="fields" :canvasMode="desc.renderAs" />
                      </v-card-text>
                    </v-card>
                    <v-skeleton-loader type="article" v-else></v-skeleton-loader>
                  </template>
                </v-col>
              </v-row>
              <v-row v-else>
                <!--edit worksheet jurnal start-->
                <v-col>
                  <v-text-field label="Worksheet Name" outlined v-model="newWsName"></v-text-field>
                </v-col>
                <v-col md="12" lg="12" xs="12">
                  <render-form
                    v-if="!worksheetDataLoad"
                    :modeReload="reloadTrue"
                    :formTemplate="dataList.worksheetForm"
                    @submit-form="submitForm"
                  />
                  <template v-else>
                    <v-skeleton-loader type="article"></v-skeleton-loader>
                  </template>
                </v-col>
                <!--edit worksheet jurnal end-->
              </v-row>
            </v-tab-item>
            <v-tab-item value="tab-3">
              <other-comp />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="worksheetDataLoad">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-overlay :value="loader">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-layout row justify-center>
      <v-dialog
        v-model="dialogComment"
        persistent
        :fullscreen="isCommentFullscreen"
        scrollable
        max-width="600px"
      >
        <v-card>
          <v-card-text>
            <comment-module></comment-module>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="black"
              flat
              @click.native="isCommentFullscreen = !isCommentFullscreen"
            >
              <v-icon>fullscreen</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="red" flat @click.native="dialogComment = false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import { formDynamicMixins } from "@/mixins/formDynamicMixins";

import MissionComp from "./subMissionCard";
import LearningComp from "./subLearning";
import OtherComp from "./subOtherJournal";
import NewJournal from "./component/newJournal";

import RenderForm from "@/components/buildform/incubatee/renderForm";
import RenderRecord from "@/components/buildform/incubatee/renderRecord";
import CommentModule from "@/components/buildform/comment/CommentModule";

export default {
  mixins: [formDynamicMixins],
  data() {
    return {
      loader: false,
      mode: false,
      tab: "tab-2",
      tableLoad: false,
      reloadFalse: false,
      reloadTrue: true,
      dataListTemp: {
        worksheetForm: {
          name: "",
          description: ""
        }
      },
      desc: {
        renderAs: false,
        description: ""
      },
      dataList: {
        id: "",
        worksheetForm: {
          name: "",
          description: ""
        },
        name: "Mission Name",
        description: "Mission Description",
        nextMission: { id: "" }
      },
      dataLoad: false,
      dataSingle: {},
      journalLoad: false,
      updateJ: false,
      newWsName: "",
      worksheetData: "",
      worksheetDataLoad: false,
      worksheetDataLoad2: false,
      editWS: false,
      fields: [],
      otherJournals: { total: 0, list: [] },
      otherLoad: false,
      learningList: { total: 0, list: [] },
      learningLoad: false,
      worksheetList: { total: 0, list: [] },
      worksheetListLoad: false,
      worksheetName: "",
      is_newWorksheet: true,
      is_reloadWorksheet: false,
      is_updateAtom: false,
      selectWorksheet: false,
      exworksheetId: "",
      branchUri: "",
      root: true,
      dialogComment: false,
      isCommentFullscreen: false
    };
  },
  components: {
    RenderRecord,
    RenderForm,
    CommentModule,
    MissionComp,
    LearningComp,
    OtherComp,
    NewJournal
  },
  watch: {
    $route: "refreshData"
  },
  created() {
    window.sessionStorage.setItem("uploadMode", "team");
    if (this.$route.params.parentJournalId) {
      this.root = false;
      this.branchUri = "/" + this.$route.params.parentJournalId;
    } else {
      this.root = true;
      this.branchUri = "";
    }
    this.getMissionDetail();
  },
  mounted() {
    this.getJournalDetail();
    this.getLearningMaterialList();
  },
  methods: {
    openDetail(missionId, journalId, worksheetId) {
      this.$router.replace({
        path:
          "/incubatee/team/" +
          this.$route.params.teamId +
          "/participation/" +
          this.$route.params.cohortId +
          "/mission/" +
          missionId +
          "/journal/" +
          journalId +
          "/worksheet/" +
          worksheetId +
          "/new" +
          this.branchUri
      });
    },
    getMissionDetail() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/missions/" +
            this.$route.params.missionId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataList = res.data.data;
          this.dataListTemp = JSON.parse(JSON.stringify(res.data.data));

          let tempObj = JSON.parse(this.dataListTemp.worksheetForm.description);
          if (tempObj.hasOwnProperty("renderAs")) {
            this.desc.renderAs = JSON.parse(
              this.dataListTemp.worksheetForm.description
            ).renderAs;
            this.desc.description = JSON.parse(
              this.dataListTemp.worksheetForm.description
            ).description;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    editWorksheet() {
      this.editWS = true;
      this.updateJ = false;
      this.getWorksheetData();
    },
    updateJournal() {
      this.updateJ = true;
      this.editWS = false;
    },
    createNewWorksheet() {
      this.worksheetData = {};
      this.mode = false;
      this.is_newWorksheet = true;
      this.is_updateAtom = true;
      this.is_reloadWorksheet = false;
      this.selectWorksheet = false;
      this.getMissionDetail();
    },
    createReloadWorksheet() {
      this.mode = true;
      this.exworksheetId = "";
      this.is_newWorksheet = false;
      this.is_updateAtom = false;
      this.is_reloadWorksheet = false;
      this.selectWorksheet = true;
      this.getWorksheetList();
    },
    getWorksheetList() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets?worksheetFormIds[]=" +
            this.dataList.worksheetForm.id +
            // "&programParticipationId=" +
            // this.$route.params.cohortId +
            "&missionIds[]=" +
            this.dataList.id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.worksheetList = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getJournalDetail() {
      this.journalLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            this.$route.params.worksheetId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.dataSingle = res.data.data;
          this.refactorRecordJSON(res.data.data);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.journalLoad = false;
        });
    },
    getWorksheetData() {
      this.dataList = JSON.parse(JSON.stringify(this.dataListTemp));
      this.worksheetData = {};
      this.worksheetOK = false;
      this.is_reloadWorksheet = false;
      var worksheetId;
      if (this.editWS) {
        this.worksheetDataLoad = true;
        worksheetId = this.$route.params.worksheetId;
      } else {
        this.worksheetDataLoad2 = true;
        worksheetId = this.exworksheetId;
      }
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            worksheetId,
          // this.exworksheetId,
          // this.$route.params.worksheetId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.worksheetData = res.data.data;
          this.newWsName = this.worksheetData.name;
          this.pairFieldValue(res.data.data);
        })
        .catch(() => {})
        .finally(() => {
          this.worksheetDataLoad = false;
          this.worksheetDataLoad2 = false;
          if (this.updateJ) {
            this.is_reloadWorksheet = true;
          } else {
            this.is_reloadWorksheet = false;
          }
        });
    },
    getWorksheetDataReload() {
      this.dataList = JSON.parse(JSON.stringify(this.dataListTemp));
      this.worksheetData = {};
      this.worksheetOK = false;
      this.is_reloadWorksheet = false;
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            this.exworksheetId,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.worksheetData = res.data.data;
          this.pairFieldValue(res.data.data);
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoad = false;
          this.is_reloadWorksheet = true;
        });
    },
    submitForm(params) {
      if (this.editWS) {
        params["name"] = this.newWsName;
        this.submitEdit(params);
      } else {
        if (this.is_updateAtom == false) {
          params["worksheetId"] = this.exworksheetId;
          params["missionId"] = this.dataList.id;
          this.submitUpdate(params);
        } else {
          params["worksheetFormId"] = this.dataList.worksheetForm.id;
          params["name"] = this.worksheetName;
          this.submitUpdateAtom(params);
        }
      }
    },
    submitEdit(params) {
      this.params = params;
      this.worksheetDataLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            this.$route.params.worksheetId,
          params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.refreshData();
        })
        .catch(() => {})
        .finally(() => {
          this.worksheetDataLoad = false;
        });
    },
    submitUpdate(params) {
      this.params = params;
      this.worksheetDataLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals/" +
            this.$route.params.journalId,
          params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          // this.refreshData();
          this.$router.go(-1);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.worksheetDataLoad = false;
        });
    },
    submitUpdateAtom(params) {
      this.params = params;
      this.worksheetDataLoad = true;
      this.axios
        .patch(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals_atomic-worksheet/" +
            this.$route.params.journalId,
          params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          // this.refreshData();
          this.$router.go(-1);
        })
        .catch(() => {})
        .finally(() => {
          this.worksheetDataLoad = false;
        });
    },
    refreshData() {
      this.tab = "tab-2";
      this.fields = [];
      this.editWS = false;
      this.updateJ = false;
      this.getMissionDetail();
      this.getJournalDetail();
    },
    openComment() {
      this.dialogComment = true;
    },
    getLearningMaterialList() {
      this.learningLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/missions/" +
            this.$route.params.missionId +
            "/learning-materials",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.learningList = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.learningLoad = false;
        });
    }
  }
};
</script>

<style scoped>
a.v-tab.v-tab--active {
  background: #fff;
  color: #249c90 !important;
  -webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.39);
  -moz-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.39);
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.39);
  border-top: solid 5px;
}
</style>

<style>
.v-slide-group__content.v-tabs-bar__content {
  padding-left: 5px !important;
}
</style>