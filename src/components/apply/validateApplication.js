export default function validateApplication(data) {
    const payload = {}
    Object.entries(data).forEach(([key, value]) => {
        // VALIDATE ALL FORM FIELDS ON FORM SUBMIT
        let field = "";
        if (!value) {
            switch (key) {
                case "state":
                    field = "state is required";
                    break;
                case "street":
                    field = "Street is required";
                    break;
                case "city":
                    field = "City is required";
                    break;
                case "image":
                    field = "Image is required";
                    break;
                default:
                    break;
            }

            payload[key] = field;
        }
        // REMOVE LOADING AS ERROR FIELD
        delete payload["loading"];
    });

    return Object.keys(payload).length ? payload : false;
}