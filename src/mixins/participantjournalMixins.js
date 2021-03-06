import Vue from "vue";
import lodash from "lodash";
Vue.prototype._ = lodash;

import bus from "@/config/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";

export const participantjournalMixins = {
  data() {
    return {
      participantJournalList: { total: 0, list: [] },
    };
  },
  methods: {
    getParticipantJournal() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/personnel/as-mentor/" +
            this.$store.getters.getMentorship.program.id +
            "/participants/include-journals",
          {
            params: {
              page: this.options.page,
              pageSize: this.options.itemsPerPage,
            },
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.participantJournalList = res.data.data;
          this.groupByMission(res.data.data);
        })
        .catch((res) => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    gotoJournalDetail(participantId, journalId) {
      this.$router.push({
        path:
          "/personnel/mentor/" +
          this.$store.getters.getMentorship.id +
          "/" +
          this.$store.getters.getMentorship.program.id +
          "/participant/" +
          participantId +
          "/journal/" +
          journalId,
      });
    },
    // eslint-disable-next-line no-unused-vars
    groupByMission(participantJournalList) {
      for (let index = 0; index < participantJournalList.list.length; index++) {
        // eslint-disable-next-line no-unused-vars
        let grouped = this._.groupBy(
          participantJournalList.list[index].journals,
          (currrent) => currrent.mission.name
        );
        participantJournalList.list[index].grouped = Object.entries(grouped);
      }
    },
  },
};
