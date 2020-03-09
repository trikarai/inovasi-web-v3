import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NotFoundComponent from "../views/404.vue";

import IncubateeSignup from "../views/signup/IncubateeSignup";
import IncubateeLogin from "../views/login/Incubatee";
import ActivateAccount from "../views/account/Activate";
import ResetPassword from "../views/account/ResetPassword";

import IncubateeNav from "../views/main/Incubatee";
import IncubateeAccount from "../components/Incubatee/account/IncubateeAccount";
import IncubateeDashboard from "../components/Incubatee/dashboard/Dashboard";
import IncubateeMembership from "../components/Incubatee/membership/Membership";
import IncubateeCandidateships from "../components/Incubatee/candidate/Candidate";
//Founder Profile
import IncubateeProfiles from "../components/Incubatee/profile/ProfileDataList";
import IncubateeProfilesData from "../components/Incubatee/profile/ProfileData";
import IncubateeProfilesForm from "../components/Incubatee/profile/ProfileForm";
import IncubateeProfilesAdd from "../components/Incubatee/profile/addProfile";
//Team Profile
import IncubateeTeamProfiles from "../components/Incubatee/asTeam/teamprofile/ProfileDataList";
import IncubateeTeamProfilesData from "../components/Incubatee/asTeam/teamprofile/ProfileData";
import IncubateeTeamProfilesForm from "../components/Incubatee/asTeam/teamprofile/ProfileForm";
import IncubateeTeamProfilesAdd from "../components/Incubatee/asTeam/teamprofile/addProfile";

import TeamMember from "../components/Incubatee/asTeam/member/Member";
import TeamMemberCandidate from "../components/Incubatee/asTeam/candidate/Candidate";
import TeamMemberInvite from "../components/Incubatee/asTeam/member/searchMember";
import TeamMemberApplication from "../components/Incubatee/asTeam/application/Application";
import TeamMemberParticipation from "../components/Incubatee/asTeam/participation/Participation";
import TeamMemberWorksheet from "../components/Incubatee/asTeam/worksheet/Worksheet";
import TeamMemberWorksheetDetail from "../components/Incubatee/asTeam/worksheet/WorksheetDetail";

//sub participation
import TeamMemberMission from "../components/Incubatee/asTeam/participation/mission/Mission";
import TeamMemberMissionDetail from "../components/Incubatee/asTeam/participation/mission/MissionDetail";
import TeamMemberSchedules from "../components/Incubatee/asTeam/participation/schedule/Schedule";
import TeamMemberSchedulesDetail from "../components/Incubatee/asTeam/participation/schedule/ScheduleDetail";
import TeamMemberSchedulesReport from "../components/Incubatee/asTeam/participation/schedule/Report";
import TeamMemberMentoring from "../components/Incubatee/asTeam/participation/schedule/MentoringList";
import TeamMemberMentor from "../components/Incubatee/asTeam/participation/schedule/MentorList";
//Journal
import TeamMemberJournal from "../components/Incubatee/asTeam/participation/journal/Journal";
import TeamMemberJournalDetail from "../components/Incubatee/asTeam/participation/journal/JournalDetail";
import TeamMemberJournalDetail2 from "../components/Incubatee/asTeam/participation/journal/JournalDetail2";
import AddAtomicJournal from "../components/Incubatee/asTeam/participation/atomic/AddAtomicJournal";


import AccountMain from "../views/account/AccountMain"
import ForgotPassword from "../views/account/ForgotPassword";
import RequestActivation from "../views/account/RequestActivation";

import SysAdminLogin from '../views/login/SysAdmin';
import SysAdminNav from '../views/main/SysAdmin';
import SysAdminAdmins from '../components/sysadmin/admin/Admin';
import SysAdminProfile from '../components/sysadmin/profile/SysAdminProfile';
import SysAdminIncubator from '../components/sysadmin/incubator/Incubator';

import PersonnelLogin from '../views/login/Personnel';
import PersonnelNav from '../views/main/Personnel';
import PersonnelAccount from '../components/personnel/account/PersonnelAccount';
import PersonnelPersonnels from '../components/personnel/personnel/Personnel';
import PersonnelFounders from '../components/personnel/founder/Founder';
import PersonnelWorksheet from '../components/personnel/worksheet/Worksheet';
import PersonnelWorksheetBuild from '../components/personnel/worksheet/buildWorksheet';
import PersonnelProfileForm from '../components/personnel/profileform/ProfileForm';
import PersonnelTeamProfileForm from '../components/personnel/teamprofileform/TeamProfileForm';
import PersonnelProfileFormBuild from '../components/personnel/profileform/buildProfileform';
import PersonnelTeamProfileFormBuild from '../components/personnel/teamprofileform/buildProfileform';
import PersonnelMentoringForm from '../components/personnel/mentoringform/MentoringForm';
import PersonnelMentoringFormBuild from '../components/personnel/mentoringform/buildMentoringform';

import PersonnelFormDetail from '../components/buildform/detailForm';

import PersonnelProgramCohort from '../components/personnel/program/cohort/Cohort';
import CohortCoordinator from '../components/personnel/program/cohort/assign/Coordinator';
import CohortMentor from '../components/personnel/program/cohort/assign/Mentor';
import CohortMission from '../components/personnel/program/cohort/mission/Mission';
//Learning Material
import CohortMissionLearning from '../components/personnel/program/cohort/mission/learningmaterial/LearningMaterial';
import CohortMissionLearningPreview from '../components/personnel/program/cohort/mission/learningmaterial/LearningPreview';
import CohortMissionLearningForm from '../components/personnel/program/cohort/mission/learningmaterial/LearningForm';

import CohortMentoring from '../components/personnel/program/cohort/mentoring/Mentoring';
import PersonnelList from '../components/personnel/program/cohort/assign/PersonnelList';

import CoordinatorDashboard from '../components/personnel/asCoordinator/dashboard';
import CoordinatorPhase from '../components/personnel/asCoordinator/phase/Phase';
import CoordinatorParticipant from '../components/personnel/asCoordinator/participant/Participant';
import CoordinatorApplicant from '../components/personnel/asCoordinator/applicant/Applicant';
import CoordinatorMentoring from '../components/personnel/asCoordinator/mentoring/Mentoring';
import CoordinatorMentoringDetail from '../components/personnel/asCoordinator/mentoring/MentoringDetail';

import MentorDashboard from '../components/personnel/asMentor/dashboard';
import MentorParticipant from '../components/personnel/asMentor/participant/participant';
import MentorParticipantJournal from '../components/personnel/asMentor/participant/journal/journal';
import MentorParticipantJournalDetail from '../components/personnel/asMentor/participant/journal/journalDetail';
import MentorSchedule from '../components/personnel/asMentor/schedule/Schedule';
import MentorScheduleDetail from '../components/personnel/asMentor/schedule/ScheduleDetail';
import MentorScheduleReport from '../components/personnel/asMentor/schedule/Report';
import MentorScheduleNegotiate from '../components/personnel/asMentor/schedule/NegotiateSchedule';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup/:incubatorIdentifier?',
    name: 'incubateesignup',
    component: IncubateeSignup
  },
  {
    path: '/incubator-identifier/:incubatorIdentifier/activate-founder-account/:email/:token',
    name: 'activateaccount',
    component: ActivateAccount
  },
  {
    path: '/incubator-identifier/:incubatorIdentifier/reset-founder-password/:email/:token',
    name: 'resetpassword',
    component: ResetPassword
  },
  {
    path: '/account',
    name: 'incubateeaccount',
    component: AccountMain,
    children: [
      {
        path: '/forgot-password/:incubatorIdentifier?/:email?',
        component: ForgotPassword
      },
      {
        path: '/request-activation/:incubatorIdentifier?/:email?',
        component: RequestActivation
      }
    ]
  },
  {
    path: '/sysadmin',
    name: 'syaadminlogin',
    component: SysAdminLogin
  },
  {
    path: '/personnel',
    name: 'personnellogin',
    component: PersonnelLogin
  },
  {
    path: '/:identifier?/login',
    name: 'incubateelogin2',
    component: IncubateeLogin
  },
  {
    path: '/login/:identifier?',
    name: 'incubateelogin',
    component: IncubateeLogin
  },
  {
    path: '/sysadmin/main',
    name: 'sysadminmain',
    component: SysAdminNav,
    meta: {
      level: 0,
      requiredAuth: true, personnelAuth: false, sysadminAuth: true
    },
    children: [
      {
        path: '/sysadmin/admin',
        name: 'sysadminadmin',
        component: SysAdminAdmins,
        meta: {
          level: 0,
          requiredAuth: true, personnelAuth: false, sysadminAuth: true
        },
      },
      {
        path: '/sysadmin/incubator',
        name: 'sysadminincubator',
        component: SysAdminIncubator,
        meta: {
          level: 0,
          requiredAuth: true, personnelAuth: false, sysadminAuth: true
        },
      },
      {
        path: '/sysadmin/profile',
        name: 'sysadminprofile',
        component: SysAdminProfile,
        meta: {
          level: 0,
          requiredAuth: true, personnelAuth: false, sysadminAuth: true
        },
      },
    ]
  },
  {
    path: '/personnel/main',
    name: 'personnelmain',
    component: PersonnelNav,
    meta: {
      level: 0,
      requiredAuth: true, personnelAuth: true, sysadminAuth: false
    },
    children: [
      {
        path: "/personnel/account",
        component: PersonnelAccount,
        name: " My Account Personnel",
        meta: {
          text: " My Account",
          level: 0,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/personnel",
        component: PersonnelPersonnels,
        name: "Personnel",
        meta: {
          level: 0,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/founder",
        component: PersonnelFounders,
        name: "Registrant",
        meta: {
          level: 0,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/program",
        component: PersonnelProgramCohort,
        name: "Program",
        meta: {
          level: 0,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/worksheet-forms",
        component: PersonnelWorksheet,
        name: "Worksheet Form",
        meta: {
          level: 0,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/preview/:formType/:formId",
        component: PersonnelFormDetail,
        name: "Form Preview",
        meta: {
          level: 1,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/worksheet-forms/build",
        component: PersonnelWorksheetBuild,
        name: "Create Worksheet Form",
        meta: {
          level: 1,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/worksheet-forms/:formId/edit",
        component: PersonnelWorksheetBuild,
        name: "Edit Worksheet Form",
        meta: {
          level: 1,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/profile-forms",
        component: PersonnelProfileForm,
        name: "Profile Forms",
        meta: {
          level: 0,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/profile-forms/build",
        component: PersonnelProfileFormBuild,
        name: "Create Profile Form",
        meta: {
          level: 1,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/profile-forms/:formId/edit",
        component: PersonnelProfileFormBuild,
        name: "Edit Profile Form",
        meta: {
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/team-profile-forms",
        component: PersonnelTeamProfileForm,
        name: "Team Profile Forms",
        meta: {
          level: 0,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/team-profile-forms/build",
        component: PersonnelTeamProfileFormBuild,
        name: "Create Team Profile Forms",
        meta: {
          level: 1,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/team-profile-forms/:formId/edit",
        component: PersonnelTeamProfileFormBuild,
        name: "Edit Team Profile Forms",
        meta: {
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/mentoring-feedback-forms",
        component: PersonnelMentoringForm,
        name: "Mentoring Form",
        meta: {
          level: 0,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/mentoring-feedback-forms/build",
        component: PersonnelMentoringFormBuild,
        name: "Create Mentoring Feedback Form",
        meta: {
          level: 1,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/mentoring-feedback-forms/:formId/edit",
        component: PersonnelMentoringFormBuild,
        name: "Edit Mentoring Feedback Form",
        meta: {
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/program/:programId/coordinator",
        component: CohortCoordinator,
        name: "Coordinator",
        meta: {
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/program/:programId/mentor",
        component: CohortMentor,
        name: "Mentors",
        meta: {
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/program/:programId/assign",
        component: PersonnelList,
        name: "Personnel List",
        meta: {
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/program/:programId/mission",
        component: CohortMission,
        name: "Mission",
        meta: {
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/program/:programId/mission/:missionId/learning-material",
        component: CohortMissionLearning,
        name: "Learning Material",
        meta: {
          level: 3,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/program/:programId/mission/:missionId/learning-material/:learningId",
        component: CohortMissionLearningPreview,
        name: "Learning Material Preview",
        meta: {
          level: 4,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/program/:programId/mission/:missionId/learning-material-add",
        component: CohortMissionLearningForm,
        name: "Add Learning Material",
        meta: {
          level: 3,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/program/:programId/mission/:missionId/learning-material/:learningId/edit",
        component: CohortMissionLearningForm,
        name: "Edit Learning Material",
        meta: {
          level: 3,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/program/:programId/mentoring",
        component: CohortMentoring,
        name: "Mentoring",
        meta: {
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      //Coordinator
      {
        path: "/personnel/coordinator/dashboard",
        component: CoordinatorDashboard,
        name: "Coordinator Dashboard",
        meta: {
          level: 1,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/coordinator/program/:programId/participant",
        component: CoordinatorParticipant,
        name: "Team List",
        meta: {
          text: "Team Participant List",
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/coordinator/program/:programId/phase",
        component: CoordinatorPhase,
        name: "Registration Phase",
        meta: {
          text: "Registration Phase",
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/coordinator/program/:programId/applicant",
        component: CoordinatorApplicant,
        name: "Applicant",
        meta: {
          text: "Applicant",
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/coordinator/program/:programId/mentoring",
        component: CoordinatorMentoring,
        name: "Mentoring",
        meta: {
          text: "Mentoring Report",
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/coordinator/program/:programId/mentoring/:mentoringId",
        component: CoordinatorMentoringDetail,
        name: "Mentoring Report",
        meta: {
          text: "Mentoring Report Detail",
          level: 3,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      //Mentor
      {
        path: "/personnel/mentor/dashboard",
        component: MentorDashboard,
        name: "Mentor Dashboard",
        meta: {
          level: 1,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/mentor/:mentorshipId/:programId/schedule",
        component: MentorSchedule,
        name: "Mentor Schedule",
        meta: {
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/mentor/:mentorId/:programId/participant",
        component: MentorParticipant,
        name: "Program's Participant",
        meta: {
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/mentor/:mentorId/:programId/participant/:participantId/journal",
        component: MentorParticipantJournal,
        name: "Program's Participant Journal",
        meta: {
          level: 3,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/mentor/:mentorId/:programId/participant/:cohortId/journal/:journalId",
        component: MentorParticipantJournalDetail,
        name: "Program's Participant Journal Detail",
        meta: {
          text: "Program's Participant Journal Detail",
          level: 4,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/mentor/:mentorshipId/schedule/:scheduleId",
        component: MentorScheduleDetail,
        name: "Mentor Schedule Detail",
        meta: {
          level: 3,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/mentor/:mentorshipId/schedule/:scheduleId/report",
        component: MentorScheduleReport,
        meta: {
          level: 3,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
      {
        path: "/personnel/mentor/:mentorshipId/negotiate-schedule",
        component: MentorScheduleNegotiate,
        name: "Negotiate Schedule",
        meta: {
          level: 2,
          requiredAuth: true, personnelAuth: true, sysadminAuth: false
        }
      },
    ]
  },
  {
    path: '/incubatee/main',
    name: 'incubateemain',
    component: IncubateeNav,
    meta: {
      text: 'Founder Main Layout',
      level: 0,
      requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
    },
    children: [
      {
        path: "/incubatee/dashboard",
        component: IncubateeDashboard,
        name: "founder-dashboard",
        meta: {
          text: "Dashboard",
          level: 0,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/account",
        component: IncubateeAccount,
        name: "fouder-account",
        meta: {
          text: "My Account",
          level: 1,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/membership",
        component: IncubateeMembership,
        name: "Membership",
        meta: {
          text: "Membership",
          level: 1,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/candidateship",
        component: IncubateeCandidateships,
        name: "Candidateship",
        meta: {
          text: "Candidateship",
          level: 1,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/profile",
        component: IncubateeProfiles,
        name: "Profiles",
        meta: {
          text: "Profiles",
          level: 1,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/profile",
        component: IncubateeTeamProfiles,
        name: "team-profiles",
        meta: {
          text: "Team Profiles",

          level: 2,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/profile/:profileId",
        component: IncubateeProfilesData,
        name: "profile-detail",
        meta: {
          text: "Profile Detail",
          level: 2,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/profile/:profileId",
        component: IncubateeTeamProfilesData,
        name: "team-profile",
        meta: {
          text: "Team Profile",
          level: 3,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/profile-form",
        component: IncubateeProfilesForm,
        name: "profile-form",
        meta: {
          text: "Profile Form",
          level: 3,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/team-profile-form",
        component: IncubateeTeamProfilesForm,
        name: "team-profile-form",
        meta: {
          text: "Team Profile Form",
          level: 4,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/profile-form/:formId/add",
        component: IncubateeProfilesAdd,
        name: "profile-form-add",
        meta: {
          text: "Add/Edit Profile Form",
          level: 4,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/team-profile-form/:formId/add",
        component: IncubateeTeamProfilesAdd,
        name: "team-profile-form-add",
        meta: {
          text: "Add Team Profile Form",
          level: 4,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/member",
        component: TeamMember,
        name: "team-members",
        meta: {
          text: "Members",
          level: 1,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/candidate",
        component: TeamMemberCandidate,
        name: "team-candidate",
        meta: {
          text: "Candidate",
          level: 2,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/invite",
        component: TeamMemberInvite,
        name: "team-invite",
        meta: {
          text: "Invite New Member",
          level: 2,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/application",
        component: TeamMemberApplication,
        name: "team-program-application",
        meta: {
          text: "Program Application",
          level: 2,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/worksheet",
        component: TeamMemberWorksheet,
        name: "team-qorksheet",
        meta: {
          text: "Worksheet",
          level: 2,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/worksheet/:worksheetId",
        component: TeamMemberWorksheetDetail,
        name: "team-worksheet-detail",
        meta: {
          text: "Worksheet Detail",
          level: 3,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation",
        component: TeamMemberParticipation,
        name: "tean-participation",
        meta: {
          text: "Participation",
          level: 2,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/mission",
        component: TeamMemberMission,
        name: "team-mission",
        meta: {
          text: "Mission",
          level: 3,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/mission/:missionId",
        component: TeamMemberMissionDetail,
        name: "team-misssion-detail",
        meta: {
          text: "Mission",
          level: 4,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/mission/:rootId/next/:missionId",
        component: TeamMemberMissionDetail,
        name: "team-misssion-detail2",
        meta: {
          text: "Mission",
          level: 5,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/mission/:missionId/atom/:journalId?",
        component: AddAtomicJournal,
        name: "add-journal-atom",
        meta: {
          text: "New Journal",
          level: 5,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/journal",
        component: TeamMemberJournal,
        name: "team-journal",
        meta: {
          text: "Journal",
          level: 3,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/mission/:missionId/journal/:journalId/worksheet/:worksheetId",
        component: TeamMemberJournalDetail,
        name: "journal-detail-1",
        meta: {
          text: "Journal Detail",
          level: 4,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/mission/:missionId/journal/:journalId/worksheet/:worksheetId/new/:parentJournalId?",
        component: TeamMemberJournalDetail2,
        name: "journal-detail-tab",
        meta: {
          text: "Journal Detail",
          level: 4,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/schedule",
        component: TeamMemberSchedules,
        name: "team-mentoring-schedule",
        meta: {
          text: "Mentoring Schedule",
          level: 3,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/schedule/:scheduleId",
        component: TeamMemberSchedulesDetail,
        name: "team-mentoring-report",
        meta: {
          text: "Mentoring Report",
          level: 4,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/schedule/:scheduleId/report",
        component: TeamMemberSchedulesReport,
        name: "team-mentoring-report2",
        meta: {
          text: "Mentoring Report",
          level: 4,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/mentoring",
        component: TeamMemberMentoring,
        name: "team-mentoring",
        meta: {
          text: "Mentoring",
          level: 4,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/mentoring/:mentoringId/mentor",
        component: TeamMemberMentor,
        name: "team-mentor",
        meta: {
          text: "Mentor",
          level: 5,
          requiredAuth: true, incubateeAuth: true, personnelAuth: false, sysadminAuth: false
        }
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '*', component: NotFoundComponent }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('lbUser'));
    if (authUser.valid_until < Math.round(new Date().getTime() / 1000)) {
      localStorage.clear();
      next('/');
    }
    if (!authUser || !authUser.token) {
      next({ path: '/login' });
    } else if (to.meta.sysadminAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'));
      if (authUser.role === 'SYSADMIN') {
        next();
      } else {
        next('/sysadmin/main');
      }
    } else if (to.meta.personnelAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'));
      if (authUser.role === 'PERSONNEL') {
        next();
      } else {
        next('/personnel/main');
      }
    } else if (to.meta.incubateeAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'));
      if (authUser.role === 'INCUBATEE') {
        next();
      } else {
        next('/incubatee/main');
      }
    }
  } else {
    next()
  }
});

export default router
