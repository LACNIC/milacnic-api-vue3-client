import { API_URL, RDAP_URL } from "../utils/constants";

export async function registerApi(formData) {
  try {
    const url = `${API_URL}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}



export async function loginApi2(formData) {
  try {

    const urlRdap = `${RDAP_URL}/entity/` + formData.identifier;
    const paramsRdap = {
      method: "GET",
    };
    const responseRdap = await fetch(urlRdap, paramsRdap);
    const resultRdap = await responseRdap.json();
    console.log(responseRdap);
    console.log(resultRdap);

    
    return resultRdap;
  } catch (error) {
    console.log(error);
    return null;
  }
}

