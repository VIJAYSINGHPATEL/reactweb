// const API_BASE_ADDRESS = "http://localhost:8000/";
const API_BASE_ADDRESS = process.env.REACT_APP_API_URL;

export default class Api {
  //Darabase Connection API
  static getDataBaseConnections(authName, authKey) {
    const uri = API_BASE_ADDRESS + "/database_connections/";
    return fetch(uri, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }
  static getListView(authName, authKey) {
    const uri = API_BASE_ADDRESS + "/database_connections/";
    return fetch(uri, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }
  static getSingleListRecord(id, authName, authKey) {
    const uri =
      API_BASE_ADDRESS + "/database_connections/" + id + "/?format=json";
    return fetch(uri, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }
  static getDeleteDbConnection(record, authName, authKey) {
    const uri =
      API_BASE_ADDRESS + "/database_connections/" + record + "/?format=json";
    return fetch(uri, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }
  static deleteRecordById(id, authName, authKey) {
    const uri = API_BASE_ADDRESS + "/database_connections/" + id;
    return fetch(uri, {
      method: "DEL",
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }
  static updateRecordById(record, id, authName, authKey) {
    const uri = API_BASE_ADDRESS + "/database_connections/" + id + "/";
    return fetch(uri, {
      method: "PUT",
      body: record,
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }
  static getCreateDbConnection(record, authName, authKey) {
    const uri = API_BASE_ADDRESS + "/database_connections/";
    return fetch(uri, {
      method: "POST",
      body: record,
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }

  //Data Modal API
  static getDMCreateData(record, authName, authKey) {
    const uri = API_BASE_ADDRESS + "/data_models/";
    return fetch(uri, {
      method: "POST",
      body: record,
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }
  static getDataModalListView(authName, authKey) {
    const uri = API_BASE_ADDRESS + "/data_models/";
    return fetch(uri, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }
  static getDMDeleteDbConnection(record, authName, authKey) {
    const uri =
      API_BASE_ADDRESS + "/data_models/" + record + "/?format=json";
    return fetch(uri, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }
  static getDMSingleListRecord(id, authName, authKey) {
    const uri = API_BASE_ADDRESS + "/data_models/" + id + "/?format=json";
    return fetch(uri, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }
  static updateDMRecordById(record, id, authName, authKey) {
    const uri = API_BASE_ADDRESS + "/data_models/" + id + "/";
    return fetch(uri, {
      method: "PUT",
      body: record,
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }

  //Data Source API
  static getDSCreateData(record, authName, authKey) {
    const uri = API_BASE_ADDRESS + "/data_source/";
    return fetch(uri, {
      method: "POST",
      body: record,
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }

  static getDataSourceListView(authName, authKey) {
    const uri = API_BASE_ADDRESS + "/data_source/";
    return fetch(uri, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }

  static getDSDeleteDbConnection(record, authName, authKey) {
    const uri =
      API_BASE_ADDRESS + "/data_source/" + record + "/?format=json";
    return fetch(uri, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }

  static getDSSingleListRecord(id, authName, authKey) {
    const uri = API_BASE_ADDRESS + "/data_source/" + id + "/?format=json";
    return fetch(uri, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }

  static updateDSRecordById(record, id, authName, authKey) {
    const uri = API_BASE_ADDRESS + "/data_source/" + id + "/";
    return fetch(uri, {
      method: "PUT",
      body: record,
      headers: {
        Authorization: "Basic " + btoa(authName + ":" + authKey),
      },
    });
  }

  //Login_Register API
  static addUserData(record) {
    const uri = API_BASE_ADDRESS + "/register/";
    return fetch(uri, {
      method: "POST",
      body: record,
    });
  }
  static getUserLogin(record) {
    const uri = API_BASE_ADDRESS + "/login/";
    return fetch(uri, {
      method: "POST",
      body: record,
    });
  }
  static getUserForgotPassword(record) {
    const uri = API_BASE_ADDRESS + "/send-reset-password-email/";
    return fetch(uri, {
      method: "POST",
      body: record,
    });
  }
  static getUserResetPassword(record, uid, token) {
    const uri =
      API_BASE_ADDRESS + "/reset-password/" + uid + "/" + token + "/";
    return fetch(uri, {
      method: "POST",
      body: record,
    });
  }
  static getSingleUserData(id) {
    const uri = API_BASE_ADDRESS + "/register/" + id + "/?format=json";
    return fetch(uri, {
      method: "GET",
    });
  }
}
