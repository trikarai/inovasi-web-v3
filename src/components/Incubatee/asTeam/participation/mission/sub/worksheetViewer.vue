<template>
  <v-row>
    <v-col cols="12" lg="4">
      <v-select
        background-color="#fff"
        dense
        :loading="loadingJournals"
        :items="journals.list"
        item-text="worksheet.name"
        v-model="journal"
        label="Worksheet"
        outlined
        return-object
      ></v-select>
      <!-- {{ journal }} -->
    </v-col>
    <v-col cols="12" lg="2">
      <v-btn
        style="margin-top:6px;"
        small
        color="primary"
        @click="addNewWorksheet"
        >Add New</v-btn
      >
    </v-col>
    <v-col cols="12" lg="12" md="12">
      <v-card-text class="pa-0" v-if="loadingSelectedWorksheet">
        <v-skeleton-loader type="card" />
      </v-card-text>
      <template v-if="!loadingSelectedWorksheet">
        <v-card-actions class="pa-0" v-if="worksheetId !== ''">
          <v-btn small color="accent" v-if="!editWS" @click="editWorksheet">
            <v-icon small left>edit</v-icon>Edit Records
          </v-btn>
          <v-btn color="warning" small @click="editWS = !editWS" v-else>
            <v-icon small left>close</v-icon>Cancel Edit
          </v-btn>
        </v-card-actions>
      </template>
      <v-card-text class="pa-0 pt-5" v-if="!loadingSelectedWorksheet">
        <template v-if="!editWS">
          <span class="title">{{ worksheet.name }}</span>
          <render-record
            class="mt-2"
            :fields="fields"
            :canvasMode="desc.renderAs"
          />
        </template>
        <template v-else>
          <!-- <pre>{{ worksheet }}</pre> -->
          <!-- <pre>{{ dataList }}</pre> -->
          <edit-journal
            v-if="editWS"
            :worksheetId="worksheetId"
            :name="worksheet.name"
            :worksheetForm.sync="dataList.worksheetForm"
          />
        </template>
      </v-card-text>
    </v-col>
    <v-col cols="12" xl="12" lg="12" md="12" sm="12" v-if="worksheetId !== ''">
      <comment-module :journalId="journal.id"></comment-module>
    </v-col>
  </v-row>
</template>

<script>
import auth from "@/config/auth";
import * as config from "@/config/config";

import RenderRecord from "@/components/buildform/incubatee/renderRecord";
import EditJournal from "../../journal/component/editJournal";
import CommentModule from "@/components/buildform/comment/CommentModule";

import { formDynamicMixins } from "@/mixins/formDynamicMixins";

export default {
  mixins: [formDynamicMixins],
  components: {
    RenderRecord,
    EditJournal,
    CommentModule,
  },
  props: {
    dataMission: {
      type: Object,
    },
    isNewWorksheet: {
      type: Boolean,
      default: false,
    },
    missionId: { type: String, required: true },
    // loader: {
    //   type: Boolean,
    // },
  },
  data() {
    return {
      loadingJournals: false,
      loadingSelectedWorksheet: false,
      journals: { total: 0, list: [] },
      journal: {},
      worksheet: "",
      worksheetId: "",
      editWS: false,
      fields: [],
      desc: {
        renderAs: false,
        description: "",
      },
      dataList: {},
      dataListTemp: {},
      viewAble: false,
      user: {},
    };
  },
  watch: {
    journal: "getSelectedWorksheet",
    missionId: "getJournals",
  },
  created() {
    this.user = JSON.parse(auth.getAuthData());
    this.dataList = JSON.parse(JSON.stringify(this.dataMission));
    this.dataListTemp = JSON.parse(JSON.stringify(this.dataMission));
    // this.checkRenderMode();
  },
  mounted() {
    this.getJournals();
  },
  methods: {
    checkRenderMode() {
      let tempObj = JSON.parse(this.dataMission.worksheetForm.description);
      if (tempObj.hasOwnProperty("renderAs")) {
        this.desc = JSON.parse(this.dataMission.worksheetForm.description);
      } else {
        this.desc.renderAs = false;
      }
    },
    getJournals() {
      this.checkRenderMode();
      this.editWS = false;
      this.fields = [];
      this.worksheetId = "";
      this.worksheet = "";
      this.journals = { total: 0, list: [] };
      this.loadingJournals = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/program-participations/" +
            this.$route.params.cohortId +
            "/journals",
          {
            params: { missionId: this.missionId },
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.journals = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.loadingJournals = false;
        });
    },
    addNewWorksheet() {
      this.$emit("update:isNewWorksheet", true);
    },
    getSelectedWorksheet() {
      this.dataList = JSON.parse(JSON.stringify(this.dataMission));
      this.editWS = false;
      this.worksheetId = this.journal.worksheet.id;
      this.fields = [];
      this.loadingSelectedWorksheet = true;
      this.axios
        .get(
          config.baseUri +
            "/founder/as-team-member/" +
            this.$route.params.teamId +
            "/worksheets/" +
            this.journal.worksheet.id,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.$mixpanel.track("view_worksheet", {
            founder_id: this.user.data.id,
            team_id: this.$route.params.teamId,
            worksheet_id: this.worksheetId,
            form_type: this.dataList.worksheetForm.name,
            page: "mission",
          });
          this.$analytics.logEvent("view_worksheet", {
            founder_id: this.user.data.id,
            team_id: this.$route.params.teamId,
            worksheet_id: this.worksheetId,
            form_type: this.dataList.worksheetForm.name,
            page: "mission",
          });
          this.worksheet = res.data.data;
          this.pairFieldValue(this.worksheet);
          this.refactorRecordJSON(res.data.data);
          this.viewAble = true;
        })
        .catch(() => {})
        .finally(() => {
          this.loadingSelectedWorksheet = false;
        });
    },
    refresh() {
      this.getJournals();
    },
    editWorksheet() {
      this.editWS = true;
    },
  },
};
</script>

<style></style>
