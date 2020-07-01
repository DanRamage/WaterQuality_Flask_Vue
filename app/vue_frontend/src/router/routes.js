import SplashPage from '@/components/splash_page'
import OLMapPage from '@/components/ol_map_page'
import StationGraph from '@/components/station_graph'
import CameraGraph from '@/components/camera_graph'

const routes = [
        {
            path: '/',
            name: 'SplashPage',
            component: SplashPage
        },
        {
            path: '/:location/map',
            name: 'OLMapPage',
            component: OLMapPage,
            children: [
                {
                    path: 'bacteriagraph/:site_id',
                    component: StationGraph,
                    name: 'StationGraph',
                    props: true
                },
                {
                    path: 'cameragraph/:camera_name',
                    component: CameraGraph,
                    name: 'CameraGraph',
                    props: true
                }

            ]

        }
        /*{
            path: '/myrtlebeach/map',
            name: 'OLMapPage',
            component: OLMapPage
        }*/

    ];

export default routes
