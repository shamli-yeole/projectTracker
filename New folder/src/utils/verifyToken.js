

const verifyToken = async () => {

    const tokenget = localStorage.getItem("token"); // Get token from local storage
    

    if (!tokenget) {
        console.log("token not found");
        
        return { valid: false, message: "Token not found" };
    }

    try {
        console.log("api hit ");
        const response = await fetch("http://127.0.0.1:8000/api/v1//users/verify-token/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenget}`,
            },  
        });
        console.log("api hit ");
        
        const data = await response.json();
        console.log('dataverify:', data);

        // Handle 401 Unauthorized error
        if (response.status === 401 || data.status_code === 401) {
            return { valid: false, message: data.detail || "Unauthorized: Invalid or expired token" };
        }
        if (!response.ok || data.status_code !== 200) {
            return { valid: false, message: data.message || "Token verification failed" };
        }
      
       // return data.message; // Expecting `{ valid: true }` if token is valid
         // Token is valid, return user data
        
         return { 
            valid: true, 
            message: data.message, 
            userData: data.data 
        };


       
    } catch (error) {
        console.error("Token verification failed:", error);
        return  { valid: false, status_code: 500, message: "Server error. Please try again." };
    }
};
export default verifyToken;