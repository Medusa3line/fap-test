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

//Agent Dashboard URLs
export const dashboardUrl = `${authUrl}/dashboard`;
export const transactionHistoryUrl = `${authUrl}/transactions/history`;

//Account Opening URLs
export const accountOpening = `${authUrl}/account/open`;
export const validateBVN = `${authUrl}/account/validate`;

// Change Pin URL
export const changePinUrl = `${authUrl}/changepin`;