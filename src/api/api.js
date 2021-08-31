import { API_URL, ORGID, RDAP_URL } from "../utils/constants";
import { getOrgId, getTokenApi } from "./token";

export async function getResources(limit = 1000) {
  try {
    const orgId = getOrgId();
    const response = await fetch(
      `${RDAP_URL}/entity/` + orgId
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getDelegations(bloque) {
  try {
    const url = `${API_URL}` + "ips/" + bloque  ;
    console.log("aca la url" + url);
    const params = {
      method: "GET",
      
      headers: {
        "Access-Control-Request-Method" : "GET",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
        "Origin": "localhost:8081",
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + getTokenApi(),
     },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result.ipnetwork_reverses_dns;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getInfoIP(bloque) {
  try {
    const url = `${API_URL}` + "ips/" + bloque  ;
    console.log("aca la url" + url);
    const params = {
      method: "GET",
      headers: {
        "Access-Control-Request-Method" : "GET",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
        "Origin": "localhost:8081",
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + getTokenApi(),
     },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function getInfoAsn(asn) {
  try {
    const url = `${API_URL}` + "asns/" + asn  ;
    const params = {
      method: "GET",
      headers: {
        "Access-Control-Request-Method" : "GET",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
        "Origin": "localhost:8081",
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + getTokenApi(),
     },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getOrgData(orgId) {
  try {
    const url = `${API_URL}` + "entity/organizations/" + orgId  ;
    const params = {
      method: "GET",
      
      headers: {
        "Access-Control-Request-Method" : "GET",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
        //"Host": "https://registro-demo.api.lacnic.net",
        "Origin": "localhost:8081",
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + getTokenApi(),
     },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCertificado(org) {
  try {
    const url = `${API_URL}` + "rpki/certs?orgId=" + org  ;
    const params = {
      method: "GET",
      
      headers: {
        "Access-Control-Request-Method" : "GET",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
        "Origin": "localhost:8081",
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + getTokenApi(),
     },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getROAs(org) {
  try {
    const url = `${API_URL}` + "rpki/roas?orgId=" + org;
    const params = {
      method: "GET",
      headers: {
        "Access-Control-Request-Method" : "GET",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
        "Origin": "localhost:8081",
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + getTokenApi(),
     },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function eliminarDelegacion(bloque) {
  try {
    const url = `${API_URL}` + "domains/" + bloque.ipnetwork_range.start_address + "/" + bloque.ipnetwork_range.prefixLength ;
    const params = {
      method: "DELETE",
      
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + getTokenApi(),
        "Access-Control-Request-Method" : "DELETE",
        "Origin": "localhost:8081",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
     },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function revocarRoa(serialNumber) {
  try {
    const url = `${API_URL}` + "rpki/roas/" + serialNumber ;
    const params = {
      method: "DELETE",
      
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + getTokenApi(),
        "Access-Control-Request-Method" : "DELETE",
        "Origin": "localhost:8081",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
     },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}



export async function delegar(formData) {
  try {
    const url = `${API_URL}` + "domains" ;

    const params = {
      method: "POST",
      body: JSON.stringify({"cidrs": formData.cidrs.split(","), "hostnames": formData.hostnames.split(",")}),
      headers: {
        "Authorization": "Bearer " + getTokenApi(),
        "Content-Type": "application/json",
        "Access-Control-Request-Method" : "POST",
        "Origin": "localhost:8081",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function crearCertificado(org) {
  try {
    const url = `${API_URL}` + "rpki/certs" ;

    const params = {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + getTokenApi(),
        "Content-Type": "application/json",
        "Access-Control-Request-Method" : "POST",
        "Origin": "localhost:8081",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    console.log(response.json());
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}





export async function editarOrg(formData) {
  try {
    const url = `${API_URL}` + "entity/organizations" ;
    const params = {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Authorization": "Bearer " + getTokenApi(),
        "Content-Type": "application/json",
        "Access-Control-Request-Method" : "PUT",
        "Origin": "localhost:8081",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function editarIp(formData, ip, prefix) {
  const data = JSON.stringify({ "abuseContact" : formData.abuseContact, "asn" : formData.asn, "techContact" : formData.techContact });
  try {
    const url = `${API_URL}` + "ips/" + ip + "/" + prefix ;

    const params = {
      method: "PUT",
      body: data,
      headers: {
        "Authorization": "Bearer " + getTokenApi(),
        "Content-Type": "application/json",
        "Access-Control-Request-Method" : "PUT",
        "Origin": "localhost:8081",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function editarAsn(formData, asn) {
  const data = JSON.stringify({ "abuse_contact" : formData.abuseContact, "tech_contact" : formData.techContact });
  try {
    const url = `${API_URL}` + "asns/" + asn ;
    const params = {
      method: "PUT",
      body: data,
      headers: {
        "Authorization": "Bearer " + getTokenApi(),
        "Content-Type": "application/json",
        "Access-Control-Request-Method" : "PUT",
        "Origin": "localhost:8081",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

