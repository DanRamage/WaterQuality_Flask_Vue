import axios from "axios";

//let BASE_API_URL = 'http://howsthebeach.org/api/v1/';
//let BASE_API_URL = 'http://127.0.0.1:5000/api/v1/';
let BASE_API_URL = 'https://devapi.howsthebeach.org/api/v1/';
let CAMERA_URL = "https://www.floridaapdata.org/beach/response_beach.php";
export default {
    GetSiteData(site_name, site, startdate, enddate) {
        console.log("GetSiteData started for site " + site_name + ' station '  +  site);
        let url = BASE_API_URL + site_name + '/' + site + '/bacteria' +
             '?startdate=' + startdate +
             '&enddate=' + enddate;
        console.log("GetSiteData POST url:" + url);
        return(axios.get(url, {headers: {'Content-Type': 'application/json'}}));

    },
    GetSitesPromise(site_name) {
        console.log("GetSites started for site " + site_name);
        let url = BASE_API_URL + site_name + "/sites";
        console.log("GetSites started POST url: " + url);
        return axios.get(url, {headers: {'Content-Type': 'application/json'}});
            //.then(res => res.data)
            //.catch(error => console.error(error));
    },
    GetCameraData(site_name, parameter, startdate, enddate) {
        console.log("GetCameraData started for camera: " + site_name + "Start: " + startdate + " To: " + enddate);
        //station=follypiersouthcam&start_date=2020-5-24&end_date=2020-6-24&param=person&action=get
        let url = CAMERA_URL +
            "?station=" + site_name +
            "&start_date=" + startdate +
            "&end_date=" + enddate +
            '&param=' + parameter +
            '&action=get';
        console.log("GetCameraData POST url: " + url);
        return(axios.get(url, {headers: {'Content-Type': 'application/json'}}));

    },

}
