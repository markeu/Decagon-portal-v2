export default function validateApplication(data) {
  const payload = {};

  Object.entries(data).forEach(([key, value]) => {
    // VALIDATE ALL FORM FIELDS ON FORM SUBMIT
    let field = "";
    if (!value) {
      switch (key) {
        case "hear_about_us":
          field = "Hear about us is required";
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
