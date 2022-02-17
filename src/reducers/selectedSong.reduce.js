const defaultState = {
   composerBank: [{
       id: "THISISANID",
       fullName: "Joyion Timmons",
       firstName: "Joyion",
       middleName: "Cne",
       lastName: "Timmons",
       cae: "123",
       pro: "BMI"
   }],
   publisherBank: [] 
};

export default (state = defaultState, action) => {
   switch(action.type){
     
       default:
           return state;
   }
}