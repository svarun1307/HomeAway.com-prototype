// LOGIN USER

export const loginSuccess = (userDetails) => {
    
    console.log("IN ACTION",userDetails);
    return {
        'type': 'USER_LOGGED_IN',
        'payload': {
            'email': userDetails['email'],
            'trcker': userDetails['user_random'],
            'firstname': userDetails['name'],
            'lastname': userDetails['ex1'],
            'login-type': userDetails['acctype']
        },
        'responseCode' : userDetails['responseCode']
    }; 
}

//GET DETAILS POST LOGIN

export const getLoginDetails = (userDetails  = {}) => {
    
    return {
        type: 'GET_LOGGED_IN_DETAILS',
        userDetails
    }; 
}

//SAVE PROPERTY RESULTS TO REDUX


export const savePropertyDetails = (propertyDetails  = {  passedData : {} , dateData : {}  }) => {
    console.log("action payload",propertyDetails);
    return {
        type: 'PROPERTY_LIST',
        'payload': propertyDetails
    }; 
}


export const getPropertyList = () => {
    console.log("action payload22");
    return {
        type: 'GET_PROPERTY_LIST'
    }; 
}


//SET WEBSITE FILTER DATA

export const setFilterData = (filterData  = {}) => {
    console.log("action filters",filterData);
    return {
        type: 'FILTER_DATA',
        'payload': filterData
    }; 
}



//SET WEBSITE FILTER DATA

export const setMyBookings = (myBookings  = []) => {
    console.log("my bookings filters",myBookings);
    return {
        type: 'SET_MY_BOOKINGS',
        'payload': myBookings
    }; 
}


//GET WEBSITE FILTER DATA

export const getMyBookings = (myBookings  = []) => {
    return {
        type: 'GET_MY_BOOKINGS',
        'payload': []
    }; 
}



//SET WEBSITE FILTER DATA

export const setDashBoardFilters = (dashBoardFilters  = {}) => {
    console.log("dasdhboard filters",dashBoardFilters)
    return {
        type: 'SET_DASHBOARD_FILTERS',
        'payload': dashBoardFilters
    }; 
}





//SET WEBSITE FILTER DATA

export const getDashBoardFilters = (dashBoardFilters  = {}) => {
    console.log("dasdhboard filters",dashBoardFilters)
    return {
        type: 'GET_DASHBOARD_FILTERS',
        'payload': {}
    }
}




