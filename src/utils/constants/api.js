export const api = {
  authentication: {
    register: "register",
    login: "login",
    fetchUser: "users/:userId",
    passwordReset: "password_reset/",
    passwordResetConfirm: "password_reset/confirm/",
  },
  PDF: {
    TotalStatements: "statements/get_total_statements",
    capabilityStatement:"statements/capability_statement",
    capabilityStatementCreate:"statements/capability_statement_create",
    DeleteStatement:"statements/delete_statement"
  },
  proposals: {
    saveProposal: "proposals",
    getAllProposal: "proposals",
    getProposal: "proposals/:proposalId",
    deleteProposal: "proposals/:proposalId",
    updateProposal: "proposals/:proposalId",
    createSubscription: "proposals/subscription",
  },
  projectTypes: {
    getAllProjectTypes: "project-types",
    getProjectTypes: "project-types/:projectTypeId",
  },
  users: {
    updateUser: "users/:userId",
    editUser: "users/profile",
    freeMode: "users/free_mode_action",
    manageUserBilling: "users/create-customer-portal-session",
  },
  projects: {
    all: "projects",
    list: "projects/list",
    byLocations: "projects?coordinates=:locations",
    singleProject: "projects/:projectId",
    archiveProject: "projects/:projectId/archive",
    unArchiveProject: "projects/:projectId/unarchive",
    likeProject: "projects/:projectId/favorite",
    unLikeProject: "projects/:projectId/unfavorite",
    saveSearchProject: "project-search",
    saveComment: "project/:projectId/comments",
    getComment: "project/:projectId/comments",
    deleteComment: "project/:projectId/comments/:commentId",
    editComment: "project/:projectId/comments/:commentId",
    saveStatus: "user-projects-status",
  },
  callLogs: {
    saveCallLog: "project/:projectId/call-logs",
    allCallLogs: "project/:projectId/call-logs",
  },
  contact: {
    getEmailTemplate: "email-templates/:templateId",
    sendEmailToContactAPI: "project/:projectId/emails",
    getEmailLogs: "project/:projectId/emails",
    getContactRoles: "project/:projectId/contact-roles",
  },
  replies: {
    saveReply: "comments/:commentId/replies",
    editReply: "comments/:commentId/replies/:replyId",
    deleteReply: "comments/:commentId/replies/:replyId",
  },
  notification: {
    getNotifications: "project-notifications",
  },
  hotScopes: {
    getHotScopes: "projects/hotscopes",
  },
  regions: {
    getRegions: "gc_qualify/regions",
  },

  mortgageCalculator: {
    getBidAmountPricing:
      "mortgage_calculator/bidamount_pricing/:projectType?phase=:phase",
    getStateLaborPricing: "mortgage_calculator/state_labor_pricing/:state",
    getStateLaborPricingList: "mortgage_calculator/state_labor_pricing",
    getProjectTypePricingList: "mortgage_calculator/bidamount_pricing",
    saveEstimates: "mortgage_calculator/cleanup_estimates",
    getAllEstimates: "mortgage_calculator/cleanup_estimates",
    getEstimates: "mortgage_calculator/cleanup_estimates/:id",
    deleteEstimates: "mortgage_calculator/cleanup_estimates/:id",
    updateEstimates: "mortgage_calculator/cleanup_estimates/:id",
    calculationInfo: "mortgage_calculator/calculation_info"
  },
  gcQualify: {
    regions: "gc_qualify/regions",
    companies: "projects/companies?region=:region",
    updatePlanRoom: "gc_qualify/plan_rooms",
    updatePreQualify: "gc_qualify/pre_qualify_create",
  },
};

export const TOTAL_FREE_MODE_COUNT = 10;
