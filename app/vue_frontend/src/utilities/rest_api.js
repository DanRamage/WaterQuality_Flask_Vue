import axios from "axios";

//let BASE_API_URL = 'http://howsthebeach.org/api/';
let BASE_API_URL = 'http://127.0.0.1:5000/api/';

export default {
    GetSiteData(site_name, startdate) {
        console.log("GetSiteData started for site" + site_name);

        let site_data = [];
        let url = BASE_API_URL + site_name +
             '?startdate=' + startdate;
        axios.get(url)
            .then(function (response) {
                console.log(response.data);
                if (response.status == 200) {
                    response;
                }
                else {
                    console.log("GetSiteData error response, status code: " + response.status);
                }
            })
            .catch(function (error) {
                console.log("GetSiteData error response, error: " + error);
            });

        console.log("GetSiteData finished for site" + site_name + " startdate: " + startdate);
        return site_data;
    },
    GetSitesPromise(site_name) {
        console.log("GetSites started for site " + site_name);
        let url = BASE_API_URL + site_name + "/sites";
        return axios.get(url);
            //.then(res => res.data)
            //.catch(error => console.error(error));
    },
    GetSites(site_name) {
        console.log("GetSites started for site " + site_name);
        let url = BASE_API_URL + site_name + "/sites";
        let site_data = undefined;
        axios.get(url)
            .then(function (response) {
                console.log(response.data);
                site_data = response.data;
            })
            .catch(function (error) {
                console.log("GetSites error response, error: " + error);
            });
        console.log("GetSites finished for site" + site_name);
        return site_data;
    },
    GetStationData(station_name, startdate) {
        console.log("GetStationData started for station" + station_name + " startdate: " + startdate);
        let station_data = undefined;
        let url = BASE_API_URL + '/station_data' +
            '?station=' + station_name +
            '&startdate=' + startdate;
        axios.get(url)
            .then(function (response) {
                console.log(response.data);
                if (response.status == 200) {
                    response;
                }
                else {
                    console.log("GetStationData response error, status code: " + response.status );

                    response;
                }
            })
            .catch(function (error) {
                console.log("GetStationData error response, error: " + error);
            });
        console.log("GetStationData finished for station" + station_name + " startdate: " + startdate);

        return station_data;
    },
}
