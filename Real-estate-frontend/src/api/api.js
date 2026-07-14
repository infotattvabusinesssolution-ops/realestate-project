import axios from 'axios';

const COUNTRIES_NOW_BASE_URL = 'https://countriesnow.space/api/v0.1/countries';

/**
 * Fetches all countries from the CountriesNow API.
 * Uses POST https://countriesnow.space/api/v0.1/countries/positions
 */
export const fetchCountriesAPI = async () => {
  try {
    const response = await axios.post(`${COUNTRIES_NOW_BASE_URL}/positions`);
    if (response.data && !response.data.error) {
      return response.data.data;
    }
    throw new Error(response.data?.msg || 'Failed to fetch countries via POST');
  } catch (error) {
    console.warn('POST positions failed, falling back to GET...', error.message);
    try {
      const response = await axios.get(`${COUNTRIES_NOW_BASE_URL}/positions`);
      if (response.data && !response.data.error) {
        return response.data.data; // array of country objects: { name, iso2, iso3, lat, long }
      }
      throw new Error(response.data?.msg || 'Failed to fetch countries via GET');
    } catch (getErr) {
      console.error('GET positions failed:', getErr);
      throw getErr;
    }
  }
};

/**
 * Fetches states for a given country.
 * Uses POST https://countriesnow.space/api/v0.1/countries/states
 */
export const fetchStatesAPI = async (countryName) => {
  try {
    const response = await axios.post(`${COUNTRIES_NOW_BASE_URL}/states`, {
      country: countryName,
    });
    if (response.data && !response.data.error) {
      return response.data.data.states || []; // array of state objects: { name, state_code }
    }
    throw new Error(response.data?.msg || 'Failed to fetch states');
  } catch (error) {
    console.error(`Error fetching states for country ${countryName}:`, error);
    throw error;
  }
};

/**
 * Fetches cities for a given country and state.
 * Uses POST https://countriesnow.space/api/v0.1/countries/state/cities
 */
export const fetchCitiesAPI = async (countryName, stateName) => {
  try {
    const response = await axios.post(`${COUNTRIES_NOW_BASE_URL}/state/cities`, {
      country: countryName,
      state: stateName,
      // CountriesNow API expects country and state
    });
    if (response.data && !response.data.error) {
      return response.data.data || []; // array of city strings
    }
    throw new Error(response.data?.msg || 'Failed to fetch cities');
  } catch (error) {
    console.error(`Error fetching cities for ${countryName}, ${stateName}:`, error);
    throw error;
  }
};

// ==========================================
// CENTRALIZED API ENDPOINTS FOR ALL ROLES
// ==========================================
import axiosInstance from './axiosInstance';
export { axiosInstance };

// --- AUTH API ---
export const loginAPI = (email, password) => 
  axiosInstance.post('/auth/login', { email, password });

export const registerAPI = (data) => 
  axiosInstance.post('/auth/register', data);

export const getProfileAPI = () => 
  axiosInstance.get('/auth/profile');

export const updateProfileAPI = (data) => 
  axiosInstance.put('/auth/profile', data);

export const changePasswordAPI = (currentPassword, newPassword) => 
  axiosInstance.put('/auth/change-password', { currentPassword, newPassword });

export const forgotPasswordAPI = (email) =>
  axiosInstance.post('/auth/forgot-password', { email });

export const resetPasswordAPI = (token, password) =>
  axiosInstance.post(`/auth/reset-password/${token}`, { password });

// --- CUSTOMER API ---
export const getCustomerStatsAPI = () => 
  axiosInstance.get('/customer/stats');

export const getCustomerWishlistAPI = () => 
  axiosInstance.get('/customer/wishlist');

export const addToWishlistAPI = (id) => 
  axiosInstance.post(`/customer/wishlist/${id}`);

export const removeFromWishlistAPI = (id) => 
  axiosInstance.delete(`/customer/wishlist/${id}`);

export const getCustomerTicketsAPI = () => 
  axiosInstance.get('/customer/tickets');

export const createCustomerTicketAPI = (data) => 
  axiosInstance.post('/customer/tickets', data);

export const getCustomerTicketDetailAPI = (id) => 
  axiosInstance.get(`/customer/tickets/${id}`);

export const replyCustomerTicketAPI = (id, text) => 
  axiosInstance.post(`/customer/tickets/${id}/reply`, { text });

export const createInquiryAPI = (propertyId, text) => 
  axiosInstance.post('/customer/inquire', { propertyId, text });

// --- VENDOR API ---
export const getVendorStatsAPI = () => 
  axiosInstance.get('/vendor/stats');

export const getVendorChartDataAPI = () => 
  axiosInstance.get('/vendor/chart-data');

export const getVendorPropertiesAPI = () => 
  axiosInstance.get('/vendor/properties');

export const createVendorPropertyAPI = (data) => 
  axiosInstance.post('/vendor/properties', data);

export const updateVendorPropertyAPI = (id, data) => 
  axiosInstance.put(`/vendor/properties/${id}`, data);

export const deleteVendorPropertyAPI = (id) => 
  axiosInstance.delete(`/vendor/properties/${id}`);

export const getVendorProjectsAPI = () => 
  axiosInstance.get('/vendor/projects');

export const createVendorProjectAPI = (data) => 
  axiosInstance.post('/vendor/projects', data);

export const updateVendorProjectAPI = (id, data) => 
  axiosInstance.put(`/vendor/projects/${id}`, data);

export const deleteVendorProjectAPI = (id) => 
  axiosInstance.delete(`/vendor/projects/${id}`);

export const getVendorAgentsAPI = () => 
  axiosInstance.get('/vendor/agents');

export const createVendorAgentAPI = (data) => 
  axiosInstance.post('/vendor/agents', data);

export const updateVendorAgentAPI = (id, data) => 
  axiosInstance.put(`/vendor/agents/${id}`, data);

export const deleteVendorAgentAPI = (id) => 
  axiosInstance.delete(`/vendor/agents/${id}`);

export const getVendorSupportTicketsAPI = () => 
  axiosInstance.get('/vendor/tickets');

export const createVendorTicketAPI = (data) => 
  axiosInstance.post('/vendor/tickets', data);

export const getVendorTicketDetailAPI = (id) => 
  axiosInstance.get(`/vendor/tickets/${id}`);

export const replyVendorTicketAPI = (id, text) => 
  axiosInstance.post(`/vendor/tickets/${id}/reply`, { text });

export const getVendorLeadsAPI = () => 
  axiosInstance.get('/vendor/leads');

export const deleteVendorLeadAPI = (id) => 
  axiosInstance.delete(`/vendor/leads/${id}`);

export const replyVendorLeadAPI = (id, text) => 
  axiosInstance.post(`/vendor/leads/${id}/reply`, { text });

export const getVendorPaymentLogsAPI = () => 
  axiosInstance.get('/vendor/payment-logs');

export const verifyVendorCheckoutSessionAPI = (data) => 
  axiosInstance.post('/vendor/verify-checkout-session', data);

// --- AGENT API ---
export const getAgentStatsAPI = () => 
  axiosInstance.get('/agent/stats');

export const getAgentChartDataAPI = () => 
  axiosInstance.get('/agent/chart-data');

export const getAgentPropertiesAPI = () => 
  axiosInstance.get('/agent/properties');

export const createAgentPropertyAPI = (data) => 
  axiosInstance.post('/agent/properties', data);

export const updateAgentPropertyAPI = (id, data) => 
  axiosInstance.put(`/agent/properties/${id}`, data);

export const deleteAgentPropertyAPI = (id) => 
  axiosInstance.delete(`/agent/properties/${id}`);

export const getAgentProjectsAPI = () => 
  axiosInstance.get('/agent/projects');

export const createAgentProjectAPI = (data) => 
  axiosInstance.post('/agent/projects', data);

export const updateAgentProjectAPI = (id, data) => 
  axiosInstance.put(`/agent/projects/${id}`, data);

export const deleteAgentProjectAPI = (id) => 
  axiosInstance.delete(`/agent/projects/${id}`);

export const getAgentLeadsAPI = () => 
  axiosInstance.get('/agent/leads');

export const deleteAgentLeadAPI = (id) => 
  axiosInstance.delete(`/agent/leads/${id}`);

export const replyAgentLeadAPI = (id, text) => 
  axiosInstance.post(`/agent/leads/${id}/reply`, { text });

// --- ADMIN API ---
export const getAdminStatsAPI = () => axiosInstance.get('/admin/stats');
export const getAdminPropertiesAPI = () => axiosInstance.get('/admin/properties');
export const approveAdminPropertyAPI = (id) => axiosInstance.put(`/admin/properties/${id}/approve`);
export const rejectAdminPropertyAPI = (id) => axiosInstance.put(`/admin/properties/${id}/reject`);
export const toggleAdminPropertyStatusAPI = (id, data) => axiosInstance.put(`/admin/properties/${id}/toggle-status`, data);
export const toggleAdminPropertyFeaturedAPI = (id, data) => axiosInstance.put(`/admin/properties/${id}/toggle-featured`, data);
export const deleteAdminPropertyAPI = (id) => axiosInstance.delete(`/admin/properties/${id}`);
export const createAdminPropertyAPI = (data) => axiosInstance.post('/admin/properties', data);

export const getAdminProjectsAPI = () => axiosInstance.get('/admin/projects');
export const approveAdminProjectAPI = (id, data) => axiosInstance.put(`/admin/projects/${id}/approval`, data);
export const toggleAdminProjectFeaturedAPI = (id, data) => axiosInstance.put(`/admin/projects/${id}/toggle-featured`, data);
export const toggleAdminProjectStatusAPI = (id, data) => axiosInstance.put(`/admin/projects/${id}/toggle-status`, data);
export const deleteAdminProjectAPI = (id) => axiosInstance.delete(`/admin/projects/${id}`);
export const createAdminProjectAPI = (data, config) => axiosInstance.post('/admin/projects', data, config);
export const getAdminProjectTypesAPI = () => axiosInstance.get('/admin/projects/types');
export const createAdminProjectTypeAPI = (data) => axiosInstance.post('/admin/projects/types', data);
export const updateAdminProjectTypeAPI = (id, data) => axiosInstance.put(`/admin/projects/types/${id}`, data);
export const deleteAdminProjectTypeAPI = (id) => axiosInstance.delete(`/admin/projects/types/${id}`);
export const getAdminProjectSettingsAPI = () => axiosInstance.get('/admin/projects/settings');
export const updateAdminProjectSettingsAPI = (data) => axiosInstance.put('/admin/projects/settings', data);

export const getAdminUsersAPI = (params) => axiosInstance.get('/admin/users', { params });
export const createAdminUserAPI = (data) => axiosInstance.post('/admin/users', data);
export const deleteAdminUserAPI = (id) => axiosInstance.delete(`/admin/users/${id}`);
export const updateAdminUserStatusAPI = (id, data) => axiosInstance.put(`/admin/users/${id}/status`, data);
export const updateAdminUserAPI = (id, data) => axiosInstance.put(`/admin/users/${id}`, data);

export const getAdminPackagesAPI = () => axiosInstance.get('/admin/packages');
export const createAdminPackageAPI = (data) => axiosInstance.post('/admin/packages', data);
export const updateAdminPackageAPI = (id, data) => axiosInstance.put(`/admin/packages/${id}`, data);
export const deleteAdminPackageAPI = (id) => axiosInstance.delete(`/admin/packages/${id}`);
export const getAdminPackageSettingsAPI = () => axiosInstance.get('/admin/packages/settings');
export const updateAdminPackageSettingsAPI = (data) => axiosInstance.put('/admin/packages/settings', data);

export const getAdminPaymentsAPI = () => axiosInstance.get('/admin/payments');
export const updateAdminPaymentAPI = (id, data) => axiosInstance.put(`/admin/payments/${id}`, data);

export const getAdminTicketsAPI = () => axiosInstance.get('/admin/tickets');
export const updateAdminTicketStatusAPI = (id, data) => axiosInstance.put(`/admin/tickets/${id}/status`, data);
export const getAdminTicketDetailAPI = (id) => axiosInstance.get(`/admin/tickets/${id}`);
export const replyAdminTicketAPI = (id, data) => axiosInstance.post(`/admin/tickets/${id}/reply`, data);
export const getAdminTicketSettingsAPI = () => axiosInstance.get('/admin/settings');
export const updateAdminSettingsAPI = (data) => axiosInstance.put('/admin/settings', data);

export const getAdminMessagesAPI = () => axiosInstance.get('/admin/messages');
export const deleteAdminMessageAPI = (id) => axiosInstance.delete(`/admin/messages/${id}`);

export const getAdminSubscribersAPI = () => axiosInstance.get('/admin/subscribers');
export const deleteAdminSubscriberAPI = (id) => axiosInstance.delete(`/admin/subscribers/${id}`);

export const getAdminMenusAPI = () => axiosInstance.get('/admin/menus');
export const syncAdminMenusAPI = (data) => axiosInstance.post('/admin/menus/sync', data);

export const getAdminLanguagesAPI = () => axiosInstance.get('/admin/languages');
export const createAdminLanguageAPI = (data) => axiosInstance.post('/admin/languages', data);
export const updateAdminLanguageAPI = (id, data) => axiosInstance.put(`/admin/languages/${id}`, data);
export const deleteAdminLanguageAPI = (id) => axiosInstance.delete(`/admin/languages/${id}`);
export const setDefaultAdminLanguageAPI = (id) => axiosInstance.put(`/admin/languages/${id}/default`);
export const addAdminLanguageKeywordsAPI = (data) => axiosInstance.post('/admin/languages/keywords', data);
export const getAdminLanguageKeywordsAPI = (id) => axiosInstance.get(`/admin/languages/${id}/keywords`);
export const updateAdminLanguageKeywordsAPI = (id, data) => axiosInstance.put(`/admin/languages/${id}/keywords`, data);

export const getAdminOnlineGatewaysAPI = () => axiosInstance.get('/admin/gateways/online');
export const updateAdminOnlineGatewaysAPI = (data) => axiosInstance.put('/admin/gateways/online', data);
export const getAdminOfflineGatewaysAPI = () => axiosInstance.get('/admin/gateways/offline');
export const createAdminOfflineGatewayAPI = (data) => axiosInstance.post('/admin/gateways/offline', data);
export const deleteAdminOfflineGatewayAPI = (id) => axiosInstance.delete(`/admin/gateways/offline/${id}`);

export const getAdminFeaturedRequestsAPI = (params) => axiosInstance.get('/admin/featured/requests', { params });
export const updateAdminFeaturedRequestAPI = (id, data) => axiosInstance.put(`/admin/featured/requests/${id}`, data);
export const deleteAdminFeaturedRequestAPI = (id) => axiosInstance.delete(`/admin/featured/requests/${id}`);
export const getAdminFeaturedPricingAPI = () => axiosInstance.get('/admin/featured/pricing');
export const createAdminFeaturedPricingAPI = (data) => axiosInstance.post('/admin/featured/pricing', data);
export const updateAdminFeaturedPricingAPI = (id, data) => axiosInstance.put(`/admin/featured/pricing/${id}`, data);
export const deleteAdminFeaturedPricingAPI = (id) => axiosInstance.delete(`/admin/featured/pricing/${id}`);

export const getAdminBlogPostsAPI = (params) => axiosInstance.get('/admin/blog/posts', { params });
export const createAdminBlogPostAPI = (data) => axiosInstance.post('/admin/blog/posts', data);
export const updateAdminBlogPostAPI = (id, data) => axiosInstance.put(`/admin/blog/posts/${id}`, data);
export const deleteAdminBlogPostAPI = (id) => axiosInstance.delete(`/admin/blog/posts/${id}`);
export const getAdminBlogCategoriesAPI = (params) => axiosInstance.get('/admin/blog/categories', { params });
export const createAdminBlogCategoryAPI = (data) => axiosInstance.post('/admin/blog/categories', data);
export const updateAdminBlogCategoryAPI = (id, data) => axiosInstance.put(`/admin/blog/categories/${id}`, data);
export const deleteAdminBlogCategoryAPI = (id) => axiosInstance.delete(`/admin/blog/categories/${id}`);

export const getAdminFAQsAPI = (params) => axiosInstance.get('/admin/faqs', { params });
export const createAdminFAQAPI = (data) => axiosInstance.post('/admin/faqs', data);
export const updateAdminFAQAPI = (id, data) => axiosInstance.put(`/admin/faqs/${id}`, data);
export const deleteAdminFAQAPI = (id) => axiosInstance.delete(`/admin/faqs/${id}`);

export const getAdminAdvertisementsAPI = () => axiosInstance.get('/admin/advertisements');
export const createAdminAdvertisementAPI = (data) => axiosInstance.post('/admin/advertisements', data);
export const updateAdminAdvertisementAPI = (id, data) => axiosInstance.put(`/admin/advertisements/${id}`, data);
export const deleteAdminAdvertisementAPI = (id) => axiosInstance.delete(`/admin/advertisements/${id}`);
export const getAdminAdvertisementSettingsAPI = () => axiosInstance.get('/admin/advertisements/settings');
export const updateAdminAdvertisementSettingsAPI = (data) => axiosInstance.put('/admin/advertisements/settings', data);

export const getAdminAnnouncementsAPI = (params) => axiosInstance.get('/admin/announcement-popups', { params });
export const createAdminAnnouncementAPI = (data) => axiosInstance.post('/admin/announcement-popups', data);
export const updateAdminAnnouncementAPI = (id, data) => axiosInstance.put(`/admin/announcement-popups/${id}`, data);
export const deleteAdminAnnouncementAPI = (id) => axiosInstance.delete(`/admin/announcement-popups/${id}`);

export const getAdminCustomPagesAPI = () => axiosInstance.get('/admin/pages');
export const createAdminCustomPageAPI = (data) => axiosInstance.post('/admin/pages', data);
export const updateAdminCustomPageAPI = (id, data) => axiosInstance.put(`/admin/pages/${id}`, data);
export const deleteAdminCustomPageAPI = (id) => axiosInstance.delete(`/admin/pages/${id}`);

export const getAdminRolesAPI = () => axiosInstance.get('/admin/roles');
export const createAdminRoleAPI = (data) => axiosInstance.post('/admin/roles', data);
export const updateAdminRoleAPI = (id, data) => axiosInstance.put(`/admin/roles/${id}`, data);
export const deleteAdminRoleAPI = (id) => axiosInstance.delete(`/admin/roles/${id}`);

export const getAdminListAPI = () => axiosInstance.get('/admin/admins');
export const createAdminAPI = (data) => axiosInstance.post('/admin/admins', data);
export const deleteAdminAPI = (id) => axiosInstance.delete(`/admin/admins/${id}`);

export const getAdminAgentsAPI = () => axiosInstance.get('/admin/agents');
export const updateAdminAgentStatusAPI = (id, data) => axiosInstance.put(`/admin/agents/${id}/status`, data);
export const deleteAdminAgentAPI = (id) => axiosInstance.delete(`/admin/agents/${id}`);

export const getAdminHomeSettingsAPI = () => axiosInstance.get('/admin/home-settings');
export const updateAdminHomeSettingsAPI = (section, data) => axiosInstance.put(`/admin/home-settings/${section}`, data);

export const getAdminFooterSettingsAPI = () => axiosInstance.get('/admin/footer-settings');
export const updateAdminFooterSettingsAPI = (section, data) => axiosInstance.put(`/admin/footer-settings/${section}`, data);

// --- SPECS & PUBLIC DATA API ---
export const getCategoriesAPI = () => axiosInstance.get('/specs/categories');
export const getAmenitiesAPI = () => axiosInstance.get('/specs/amenities');
export const getSpecsCountriesAPI = () => axiosInstance.get('/specs/countries');
export const createSpecsCountryAPI = (data) => axiosInstance.post('/specs/countries', data);
export const getSpecsStatesAPI = () => axiosInstance.get('/specs/states');
export const createSpecsStateAPI = (data) => axiosInstance.post('/specs/states', data);
export const getSpecsCitiesAPI = () => axiosInstance.get('/specs/cities');
export const createSpecsCityAPI = (data) => axiosInstance.post('/specs/cities', data);
export const updateSpecsCityStatusAPI = (id, data) => axiosInstance.put(`/specs/cities/${id}/status`, data);
export const createSpecsCategoryAPI = (data) => axiosInstance.post('/specs/categories', data);
export const updateSpecsCategoryStatusAPI = (id, data) => axiosInstance.put(`/specs/categories/${id}/status`, data);
export const createSpecsAmenityAPI = (data) => axiosInstance.post('/specs/amenities', data);
export const updateSpecsAmenityStatusAPI = (id, data) => axiosInstance.put(`/specs/amenities/${id}/status`, data);

export const uploadFileAPI = (formData) =>
  axiosInstance.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getPackagesAPI = () => axiosInstance.get('/packages');
export const createVendorCheckoutSessionAPI = (data) => axiosInstance.post('/vendor/create-checkout-session', data);
