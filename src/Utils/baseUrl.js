const baseUrl = () => {
    if(process.env.NODE_ENV === 'development'){
        return "http://10.2.2.47:9090/api"; // FCMB test Parameter for test server
    } else if(process.env.NODE_ENV === 'production') {
        return "http://10.2.2.47:9090/api"; // FCMB live parameter (Change to the live url)
    }
}
    
const authUrl = `${baseUrl()}/v1/auth/agent/web`;

export default baseUrl;

//Login URL
export const loginUrl = `${baseUrl()}/v1/agent/web/login`;

//Agent URLs
export const dashboardUrl = `${authUrl}/dashboard`; // Agent's Dashboard (Not Currently being used)
export const transactionHistoryUrl = `${authUrl}/transactions/history`; //Agent's Transaction History
export const accountOpening = `${authUrl}/account/open`; //Agent Account Opening 
export const validateBVN = `${authUrl}/account/validate`; // Agent BVN Validation during Account Opening
export const changePinUrl = `${authUrl}/changepin`; // Chage Agent's PIN


//Master Agent URLs
export const agentsList = `${authUrl}/master/agents`; // List of Agents and their performances
export const dashboardDetails = `${authUrl}/master/dashboard`; // Dashboard Information
export const agentDashboard = `${authUrl}/master/agentdashboard`;   //View Every Agent under master agent
export const agentTransactions = `${authUrl}/master/transactions`;   //View Every Agent under master agent