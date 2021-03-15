/* eslint-disable no-useless-escape */


export default function validateApplication(data) {
    console.log(data);
    const payload = {}
    Object.entries(data).forEach(([key, value]) => {
        // VALIDATE ALL FORM FIELDS ON FORM SUBMIT
        let field = "";
        if (!value) {
            switch (key) {
                case "firstName":
                    field = "First name is required";
                    break;
                case "lastName":
                    field = "Last name is required";
                    break;
                case "gender":
                    field = "Gender is required";
                    break;
                case "dob":
                    field = "Date of birth is required";
                    break;
                case "phoneNumber":
                    field = "Phone number is required";
                    break;
                default:
                    break;
            }

        }
        return payload[key] = field;
    })
}